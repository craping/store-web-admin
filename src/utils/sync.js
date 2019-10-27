import axios from 'axios'
import store from '@/store'
import request from '@/utils/request'
import { Notification } from 'element-ui';
import { getToken } from '@/utils/auth'
import Push from 'push.js'


const Sync = {
    source: null,
    isDisconnect:true,
    connect(){
        this.isDisconnect = false;
        this.sync();
        Push.Permission.request();
    },
    sync() {
        if(this.isDisconnect)
            return;
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        if (getToken() == "" || getToken() == undefined)
            return;

        request.post("api/sync", {}, {
            cancelToken: this.source.token,
            timeout: 350000,
            params: {
                format: "sync"
            }
        }).then(events => {
            events.forEach(msg => {
                console.log(msg);
                const data = msg.data;
                try {
                    this.invokes[msg.biz][msg.action](data);
                } catch (e) {
                    console.error(e);
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            this.sync();
        });
    },
    disconnect(){
        this.isDisconnect = true;
        this.cancel();
    },
    cancel(){
        if(this.source)
            this.source.cancel();
    },
    invokes:{
        ORDER:{
            NEW(data){
                // const msg = '新订单['+ data +']';
                // Notification.info({
                //     title: '新订单',
                //     message: msg
                // });
                Push.create("Hello world!", {
                    // body 选项是通知的内容
                    body: "How's it hangin'?",
                    // icon 选项是通知的图片
                    icon: './icon.png',
                    // timeout 选项是通知停留时间
                    timeout: 4000
                });
            }, 
            PAY(data){
                const msg = '订单['+ data +']已支付';
                Notification.info({
                    title: '订单支付',
                    message: msg
                });
            }, 
            SHIP(data){
                const msg = '订单['+ data +']已发货';
                Notification.info({
                    title: '订单发货',
                    message: msg
                });
            }, 
            RECEIVE(data){
                const msg = '订单['+ data +']已确认收货';
                Notification.info({
                    title: '订单收货',
                    message: msg
                });
            }, 
            CLOSE(data){
                const msg = '订单['+ data +']已关闭';
                Notification.info({
                    title: '订单关闭',
                    message: msg
                });
            }, 
            FINISH(data){
                const msg = '订单['+ data +']已完成';
                Notification.info({
                    title: '订单完成',
                    message: msg
                });
            },
        },
        RETURNAPPLY:{
            NEW(data){
                const msg = '订单['+ data +']已发起售后';
                Notification.info({
                    title: '新售后订单',
                    message: msg
                });
            }, 
            SHIP(data){
                const msg = '售后订单['+ data +']用户已发货';
                Notification.info({
                    title: '售后订单发货',
                    message: msg
                });
            }, 
            REFUSE(data){
                const msg = '售后订单['+ data +']已拒绝';
                Notification.info({
                    title: '售后订单拒绝',
                    message: msg
                });
            }, 
            CANCEL(data){
                const msg = '售后订单['+ data +']已拒绝';
                Notification.info({
                    title: '售后订单拒绝',
                    message: msg
                });
            }, 
            FINISH(data){
                const msg = '售后订单['+ data +']已完成';
                Notification.info({
                    title: '售后订单完成',
                    message: msg
                });
            },
        },
        USER:{
            SAFE(data){
                console.log("SAFE:"+data)
                store.commit("user/SET_SAFE", data);
            },
            NOTICE(data){
                console.log("NOTICE:"+data);
            }
        }
    }
}

export default Sync