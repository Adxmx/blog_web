<template>
  <a-menu mode="inline" @select="methods.selectMenuItem" v-model:openKeys="data.openKeys" v-model:selectedKeys="data.selectedKeys">
    <!-- 导航栏生成逻辑(注意此处传参来自routes，而非data.routes，使用data.routes会造成重复递归，原因不明) -->
    <template v-for="menu in methods.filterRouter(adminRoutes[1]['children'])">
      <!-- 二级导航栏，多用于业务路由 -->
      <template v-if="menu.children">
        <a-sub-menu :key="menu.name">
          <template #icon><component :is="menu.meta.icon" /></template>
          <template #title>{{ menu.meta.title }}</template>
          <!-- 导航栏有分组属性 -->
          <template v-if="menu.meta.groups">
            <a-menu-item-group v-for="group in menu.meta.groups" :key="group.key" :title="group.title">
              <!-- 根据分组聚合 -->
              <template v-for="item in menu.children" :key="item.name">
                <a-menu-item v-if="item.meta.group === group.key" :key="item.name"><template #icon><component :is="item.meta.icon" /></template>{{ item.meta.title }}</a-menu-item>
              </template>
            </a-menu-item-group>
          </template>
          <!-- 导航栏带无分组属性 -->
          <template v-else>
            <a-menu-item v-for="item in menu.children" :key="item.name"><template #icon><component :is="item.meta.icon" /></template>{{ item.meta.title }}</a-menu-item>
          </template>
        </a-sub-menu>
      </template>
      <!-- 一级导航栏，多用于异常路由 -->
      <template v-else>
        <a-menu-item :key="menu.name"><template #icon><component :is="menu.meta.icon" /></template>{{ menu.meta.title }}</a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import adminRoutes from '@/router/admin-route-config.js'

const router = useRouter()

const data = reactive({
  // 一级导航展开的节点
  openKeys: [],
  // 二级导航选中的节点
  selectedKeys: [],
  // 路由列表
  routes: adminRoutes[1]['children']
})

const methods = reactive({
  selectMenuItem: ({key}) => {
    router.push({ name: key })
  },
  filterRouter(routes) {
    const res = routes.filter(menu => {
      if (menu.children) {
        const wi = menu.children.filter(item => {
          return !item.hidden ? true : false
        })
        menu.children = wi
        return true
      } else {
        return !menu.hidden ? true : false
      }
    })
    return res
  }
})

watch(router.currentRoute, () => {
  const matched = router.currentRoute.value.matched
  // 一级导航栏跳转
  if (matched.length === 1) {
    data.selectedKeys = [matched[0]['name']]
  } else if (matched.length === 2) {
    // 二级导航栏跳转
    if (data.openKeys.indexOf(!matched[0]['name']) === -1) {
      data.openKeys = [matched[0]['name']]
    }
    data.selectedKeys = [matched[0]['name'], matched[1]['name']]
  }
}, {
  immediate: true
})

</script>