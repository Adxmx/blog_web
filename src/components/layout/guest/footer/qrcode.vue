<template>
  <div class="qrcode">
    <img :width="128" :src="props.qrcode" />
    <p class="caption">微信公众号(未激活)</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  qrcode: String,
})
</script>

<style scoped>
.qrcode {
  height: 165px;
  padding: 10px;
  text-align: center;
}

.caption {
  margin-top: 10px;
  opacity: 0.5;
}
</style>