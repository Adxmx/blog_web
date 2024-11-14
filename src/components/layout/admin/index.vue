<template>
  <a-layout>
    <a-layout-header class="header">
      <!-- logo组件 -->
      <logo />
      <!-- 用户组件 -->
      <func />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <!-- 导航栏组件 -->
        <navigation />
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <!-- 面包屑组件 -->
        <breadcrumb />
        <!-- 内容组件 -->
        <app-main />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Logo from '@/components/layout/admin/header/logo.vue'
import Func from '@/components/layout/admin/header/func.vue'
import Navigation from '@/components/layout/admin/sider/navigation.vue'
import Breadcrumb from '@/components/layout/admin/content/breadcrumb.vue'
import AppMain from '@/components/layout/admin/content/app-main.vue'
</script>

<style scoped>
.header {
  background: #fff;
  z-index: 1;
  box-shadow: 5px 0 5px #0000001a;
}
</style>