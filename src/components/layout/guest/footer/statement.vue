<template>
  <a-row>
    <a-col :span="statement.width" v-for="statement, index in props.statements" :key="index">
      <div class="grid">
        <h3>{{ statement.title }}</h3>
        <div class="content">
          <p :style="statement.style" v-for="content, index in statement.contents" :key="index">{{ content }}</p>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  statements: Object
})
</script>

<style scoped>
.grid {
  height: 165px;
  padding: 10px;
  border-left: 2px #E9EAED solid;
}

.grid h3 {
  font-size: 16px;
  opacity: 0.6;
  font-weight: bold;
  text-align: center;
}

.grid .content {
  margin-top: 24px;
  padding: 0 10px 0 10px;
}

.grid p {
  margin: 4px auto;
  color: #737373;
}
</style>