<template>
  <a-row :gutter="64">
    <a-col :span="8">
      <dom-background :cover="props.topFirst?.cover" :title="props.topFirst.title" :id="props.topFirst.id" height="120px" width="280px" size="14px" spacing="2px" />
      <div class="interval"></div>
      <dom-background :cover="props.topSecond?.cover" :title="props.topSecond.title" :id="props.topSecond.id" height="120px" width="280px" size="14px" spacing="2px" />
    </a-col>
    <a-col :span="16">
      <item-desc :blogItems="props.blogItems" />
    </a-col>
  </a-row>  
</template>

<script setup>
import DomBackground from '@/components/modules/dom-background.vue'
import ItemDesc from '@/components/modules/item-desc.vue'

import { defineProps } from 'vue'

const props = defineProps({
  topFirst: Object,
  topSecond: Object,
  blogItems: Object
})

</script>

<style scoped>
.interval {
  height: 20px;
}
</style>