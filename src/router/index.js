import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    role: 'common',
    children: [
      {
        path: 'home',
        name: 'home',
        role: 'common',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: { title: '商品', icon: 'product' },
    role: 'admin',
    children: [
      {
        path: 'product',
        name: 'product',
        role: 'admin',
        component: () => import('@/views/pms/product/index'),
        meta: { title: '商品列表', icon: 'product-list' }
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        role: 'admin',
        component: () => import('@/views/pms/product/add'),
        meta: { title: '添加商品', icon: 'product-add' }
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        role: 'admin',
        component: () => import('@/views/pms/product/update'),
        meta: { title: '修改商品', icon: 'product-add' },
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        role: 'admin',
        component: () => import('@/views/pms/product/index'),
        meta: { title: '商品回收站', icon: 'product-recycle' },
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        role: 'admin',
        component: () => import('@/views/pms/product/index'),
        meta: { title: '商品评价', icon: 'product-comment' },
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        role: 'admin',
        component: () => import('@/views/pms/productCate/index'),
        meta: { title: '商品类目', icon: 'product-cate' }
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        role: 'admin',
        component: () => import('@/views/pms/productCate/add'),
        meta: { title: '添加商品类目' },
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        role: 'admin',
        component: () => import('@/views/pms/productCate/update'),
        meta: { title: '修改商品类目' },
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        role: 'admin',
        component: () => import('@/views/pms/productAttr/index'),
        meta: { title: '规格类型', icon: 'product-attr' }
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        role: 'admin',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: { title: '商品属性列表' },
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        role: 'admin',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: { title: '添加商品属性' },
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        role: 'admin',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: { title: '修改商品属性' },
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        role: 'admin',
        component: () => import('@/views/pms/brand/index'),
        meta: { title: '品牌管理', icon: 'product-brand' }
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        role: 'admin',
        component: () => import('@/views/pms/brand/add'),
        meta: { title: '添加品牌' },
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        role: 'admin',
        component: () => import('@/views/pms/brand/update'),
        meta: { title: '编辑品牌' },
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: { title: '订单', icon: 'order' },
    role: 'common',
    children: [
      {
        path: 'order',
        name: 'order',
        role: 'common',
        component: () => import('@/views/oms/order/index'),
        meta: { title: '订单列表', icon: 'product-list' }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        role: 'common',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: { title: '订单详情' },
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        role: 'common',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: { title: '发货列表' },
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        role: 'admin',
        component: () => import('@/views/oms/order/setting'),
        meta: { title: '订单设置', icon: 'order-setting' }
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        role: 'common',
        component: () => import('@/views/oms/apply/index'),
        meta: { title: '退货申请处理', icon: 'order-return' }
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        role: 'admin',
        component: () => import('@/views/oms/apply/reason'),
        meta: { title: '退货原因设置', icon: 'order-return-reason' }
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        role: 'admin',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: { title: '退货原因详情' },
        hidden: true
      },
      {
        path: 'companyAddress',
        name: 'companyAddress',
        role: 'sup',
        component: () => import('@/views/oms/companyAddress/address'),
        meta: { title: '仓库地址管理', icon: 'address' }
      },
      {
        path: 'addCompanyAddress',
        name: 'addCompanyAddress',
        role: 'sup',
        component: () => import('@/views/oms/companyAddress/add'),
        meta: {title: '新增仓库地址'},
        hidden:true
      },
      {
        path: 'updateAddress',
        name: 'updateAddress',
        role: 'sup',
        component: () => import('@/views/oms/companyAddress/update'),
        meta: {title: '修改仓库地址'},
        hidden:true
      }
    ]
  },
  {
    path: '/ams',
    name: 'ams',
    component: Layout,
    meta: { title: '分销', icon: 'tree' },
    role: 'admin',
    children: [
      {
        path: 'level',
        name: 'level',
        role: 'admin',
        component: () => import('@/views/ams/level/index'),
        meta: { title: '等级管理', icon: 'level' }
      },
      {
        path: 'addLevel',
        name: 'addLevel',
        role: 'admin',
        component: () => import('@/views/ams/level/add'),
        meta: { title: '添加等级', icon: 'level' },
        hidden: true
      },
      {
        path: 'updateLevel',
        name: 'updateLevel',
        role: 'admin',
        component: () => import('@/views/ams/level/update'),
        meta: { title: '编辑等级', icon: 'level' },
        hidden: true
      },
      {
        path: 'commission',
        name: 'commission',
        role: 'admin',
        component: () => import('@/views/ams/commission/index'),
        meta: { title: '佣金管理', icon: 'price' }
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: { title: '营销', icon: 'sms' },
    role: 'admin',
    children: [
      /* {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      }, */
      {
        path: 'advertise',
        name: 'homeAdvertise',
        role: 'admin',
        component: () => import('@/views/sms/advertise/index'),
        meta: { title: '广告列表', icon: 'sms-ad' }
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        role: 'admin',
        component: () => import('@/views/sms/advertise/add'),
        meta: { title: '添加广告' },
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        role: 'admin',
        component: () => import('@/views/sms/advertise/update'),
        meta: { title: '编辑广告' },
        hidden: true
      }
    ]
  },
  {
    path: '/sup',
    component: Layout,
    redirect: '/sup/sups',
    name: 'sup',
    meta: { title: '供应商', icon: 'courier' },
    role: 'admin',
    children: [
      {
        path: 'sups',
        name: 'sups',
        role: 'admin',
        component: () => import('@/views/sup/sups'),
        meta: { title: '供应商列表', icon: 'teamwork' }
      },
      {
        path: 'addSup',
        name: 'addSup',
        role: 'admin',
        component: () => import('@/views/sup/add'),
        meta: { title: '添加供应商', icon: 'add-user' }
      }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/user',
    name: 'users',
    meta: { title: '会员管理', icon: 'user' },
    role: 'admin',
    children: [
      {
        path: 'user',
        name: 'user',
        role: 'admin',
        component: () => import('@/views/ums/user'),
        meta: { title: '会员列表', icon: 'user' }
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        role: 'admin',
        component: () => import('@/views/ums/info'),
        meta: { title: '会员详情' },
        hidden: true
      },
      {
        path: 'userBill',
        name: 'userBill',
        role: 'admin',
        component: () => import('@/views/ums/userBill'),
        meta: { title: '用户账单' },
        hidden: true
      },
      {
        path: 'edit',
        name: 'edit',
        role: 'admin',
        component: () => import('@/views/ums/edit'),
        meta: { title: '用户编辑' },
        hidden: true
      },
      {
        path: 'addUser',
        name: 'addUser',
        role: 'admin',
        component: () => import('@/views/ums/addUser'),
        meta: { title: '添加会员', icon: 'add-user' }
      },
      {
        path: 'message',
        name: 'message',
        role: 'admin',
        component: () => import('@/views/ums/message'),
        meta: { title: '系统消息', icon: 'product' }
      }
    ]
  },
  {
    path: '/fms',
    component: Layout,
    redirect: '/fms/withdraw',
    name: 'withdraw',
    meta: { title: '财务管理', icon: 'user' },
    role: 'admin',
    children: [
      {
        path: 'withdraw',
        name: 'withdraw',
        role: 'admin',
        component: () => import('@/views/fms/withdraw'),
        meta: { title: '提现列表', icon: 'withdraw' }
      },
      {
        path: 'withdrawInfo',
        name: 'withdrawInfo',
        role: 'admin',
        component: () => import('@/views/fms/info/info'),
        meta: { title: '提现详情', icon: 'user' },
        hidden: true
      }
    ]
  },
  {
    path: '/scm',
    component: Layout,
    redirect: '/scm/config',
    name: 'config',
    meta: { title: '系统配置管理', icon: 'management' },
    role: 'admin',
    children: [
      {
        path: 'config',
        name: 'config',
        role: 'admin',
        component: () => import('@/views/scm/config'),
        meta: { title: '系统配置管理', icon: 'order-setting' }
      },
      {
        path: 'payChannel',
        name: 'payChannel',
        role: 'admin',
        component: () => import('@/views/oms/pay/channel'),
        meta: { title: '支付渠道列表', icon: 'money-bag' }
      },
      {
        path: 'addChannel',
        name: 'addChannel',
        role: 'admin',
        component: () => import('@/views/oms/pay/add'),
        meta: { title: '添加支付渠道'},
        hidden: true
      },
      {
        path: 'updateChannel',
        name: 'updateChannel',
        role: 'admin',
        component: () => import('@/views/oms/pay/update'),
        meta: { title: '修改支付渠道'},
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
