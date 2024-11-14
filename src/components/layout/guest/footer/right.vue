<template>
  <div class="right">
    <p>{{ props.copyright }}</p>
    <p>{{ props.ICP }} <img src="https://www.fengfengzhidao.com/image/icon/beian.png" /> {{ props.ICP }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  copyright: String,
  ICP: String,
  PSB: String
})
</script>

<style scoped>
.right {
  margin-top: 20px;
  border-top: 2px #E9EAED solid;
  padding: 20px;
  text-align: center;
}

.right p {
  opacity: 0.8;
  line-height: 20px;
}
</style>