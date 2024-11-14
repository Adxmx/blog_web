<template>
  <a-row :gutter="64">
    <a-col :span="8">
      <div class="top" :style="`background-image: url(${props.topFirst?.cover})`"><h3>{{ props.topFirst.title }}</h3></div>
      <div class="top interval" :style="`background-image: url(${props.topSecond?.cover})`"><h3>{{ props.topSecond.title }}</h3></div>
    </a-col>
    <a-col :span="16">
      <item-desc :blogItems="props.blogItems" />
    </a-col>
  </a-row>  
</template>

<script setup>
import ItemDesc from '@/components/modules/item-desc.vue'

import { defineProps } from 'vue'

const props = defineProps({
  topFirst: Object,
  topSecond: Object,
  blogItems: Object
})

</script>

<style scoped>
.top {
  height: 120px;
  width: 280px;
  text-align: center;
  line-height: 120px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.top h3 {
  color: #FFF;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 2px;
}

.interval {
  margin-top: 20px;
}

</style>