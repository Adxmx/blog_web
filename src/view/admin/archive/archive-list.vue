<template>
  <a-card>
    <a-button type="primary" size="small">
      <template #icon><plus-outlined /></template>新 增
    </a-button>
    <a-input-search class="search" placeholder="模糊搜索" style="width: " />
  </a-card>

  <a-card class="interval">
    <a-tabs>
      <a-tab-pane key="1">
        <template #tab>
          <span><partition-outlined />分 类</span>
        </template>
        <type-table />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span><tags-outlined />标 签</span>
        </template>
        Tab 2
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import TypeTable from '@/view/admin/archive/modules/type-table.vue'
</script>

<style scoped>
.search {
  width: 240px;
  float: right;
}

.interval {
  margin-top: 10px;
}
</style>
