<template>
  <a-card>
    <a-button type="primary" size="small" @click="methods.add()">
      <template #icon><plus-outlined /></template>新 增
    </a-button>
    <a-input-search class="search" placeholder="模糊搜索" />
  </a-card>

  <a-card class="interval">
    <a-tabs>
      <a-tab-pane key="1">
        <template #tab>
          <span><partition-outlined />分 类</span>
        </template>
        <type-table ref="typeTableRef" />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span><tags-outlined />标 签</span>
        </template>
        待开发
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import TypeTable from '@/view/admin/archive/modules/type-table.vue'

import { ref } from 'vue'

const typeTableRef = ref()

const methods = {
  add: () => {
    typeTableRef.value.methods.addType()
  }
}

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
