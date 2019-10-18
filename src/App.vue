<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import sync from "@/utils/sync";
  export default {
    name: 'App',
    data() {
      return {};
    },
    created() {
      sync.connect();
    },
    mounted() {
      
    },
    methods: {
    }
  }
</script>

<style></style>
