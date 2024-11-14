<template>
  <a-card>
    <a-tabs active-key="3" tab-position="left" size="small">
      <a-tab-pane key="1" tab="公 众 号">待开发</a-tab-pane>
      <a-tab-pane key="2" tab="导航设置">待开发</a-tab-pane>
      <a-tab-pane key="3" tab="通用设置"><SystemTable /></a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import SystemTable from '@/view/admin/setting/modules/system-table.vue'
</script>