<template>
  <div class="item" v-for="blogItem, index in props.blogItems" :key="blogItem.id" @mouseenter="data.index = index" @mouseleave="data.index = 0">
    <div class="head" :style="{backgroundColor: (index < 3 ? '#FF6600': '#B1B1B1')}">{{ parseInt(index) + 1 }}</div>
    <router-link target='_blank' :to="{name: 'guest-blog', params: {id: blogItem.id}}"><h3>{{ blogItem.title }}</h3></router-link>
    <span v-show="data.index === index">{{ blogItem.description }}</span>
  </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue'

const props = defineProps({
  blogItems: Object
})

const data = reactive({
  index: 0
})
</script>

<style scoped>
  .item {
    padding: 5px 5px;
    cursor: pointer;
  }

  .item h3 {
    display: inline-block; 
    margin-left: 12px;
    font-weight: 400;
    color: #000;
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
    display: -webkit-box;
    height: 48px;
    overflow: hidden;
    color: #737373;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all; 
  }

  .item:hover {
    background-color: #E9EAED;
  }

  .item:hover h3 {
    font-weight: bold;
  }
</style>