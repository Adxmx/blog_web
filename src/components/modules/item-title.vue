<template>
  <div class="item" v-for="blogItem, index in props.blogItems" :key="blogItem.id">
    <div class="head" :style="{backgroundColor: (index < 3 ? '#FF6600': '#B1B1B1')}">{{ parseInt(index) + 1 }}</div>
    <router-link target='_blank' :to="{name: 'guest-blog', params: {id: blogItem.id}}"><span>{{ blogItem.title }}</span></router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  blogItems: Object
})
</script>

<style scoped>
  .item {
    padding: 5px 5px;
    cursor: pointer;
  }

  .item:hover {
    background-color: #E9EAED;
    font-weight: bold;
  }

  .item .head {
    height: 20px;
    width: 20px;
    display: inline-block; 
    text-align: center;
    line-height: 20px; 
    color: white;
  }

  .item span {
    margin-left: 12px;
    color: #000;
  }
</style>