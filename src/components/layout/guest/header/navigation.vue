<template>
  <a-menu class="nav" theme="light" mode="horizontal" @select="methods.selectMenuItem" v-model:selectedKeys="data.selectedKeys">
    <a-menu-item v-for="menu in guestRoutes[0]['children']" :key="menu.name">
      <template v-if="!menu.hidden">{{ menu.meta.title }}</template>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router'

import guestRoutes from '@/router/guest-route-config.js'

const router = useRouter()

const data = reactive({
  // 选中的导航节点
  selectedKeys: [],
  routes: guestRoutes[0]['children']
})

const methods = reactive({
  selectMenuItem: ({key}) => {
    router.push({ name: key })
  },
})

watch(router.currentRoute, () => {
  const matched = router.currentRoute.value.matched
  data.selectedKeys = [matched[1]['name']]
}, {
  immediate: true
})

</script>

<style scoped>
  .nav {
    height: 65px;
  }
</style>