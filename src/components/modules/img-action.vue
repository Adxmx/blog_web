<template>
  <div class="mask" :style="{ width: props.width, height: props.height }">
    <img :class="{'action': props.action, [props.dimension]: true}" :src="props.url" alt="图片加载失败" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  width: String,
  height: String,
  action: Boolean,
  dimension: String,
  url: String
})
</script>

<style scoped>
.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.mask .height {
  max-height: 100%;
}

.mask .width {
  max-width: 100%;
}

.mask .action:hover {
  transform: scale(1.2);
  transition: 2s;
}

</style>