<template>
  <div class="right">
    <p>{{ props.copyright }}</p>
    <p>
      <img src="https://gw.alicdn.com/tfs/TB1GxwdSXXXXXa.aXXXXXXXXXXX-65-70.gif" /> <a target="_blank" href="https://beian.miit.gov.cn/">{{ props.ICP }}</a> <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" /> <a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch">{{ props.PSB }}</a>
    </p>
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

.right p img {
  width: 20px;
}

.right p a {
  color: #000;
}

.right p a:hover {
  color: #1366ec;
}
</style>