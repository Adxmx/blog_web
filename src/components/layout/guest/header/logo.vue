<template>
  <div class="logo">
    <div class="img">{{ props.logo }}</div>
    <span class="title">{{ props.title }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  logo: String,
  title: String
})
</script>

<style scoped>
.logo {
  display: inline-block;
}

.img {
  display: inline-block;
  width: 120px;
  height: 35px;
  margin: 16px 24px 16px 0;
  border-radius: 10px;
  /** 字体设置 */
  text-align: center;
  line-height: 35px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 5px;
  /** logo图片地址 */
  background: rgba(123, 104, 238, 0.6);
}

.title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 5px;
  color: #7B68EE;
}
</style>