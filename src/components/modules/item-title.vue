<template>
  <div class="item" v-for="blogItem, index in props.blogItems" :key="blogItem.id">
    <router-link target='_blank' :to="{name: 'guest-blog', params: {id: blogItem.id}}">
      <div class="head" :style="{backgroundColor: (index < 3 ? '#FF6600': '#B1B1B1')}">{{ parseInt(index) + 1 }}</div>
      <h2>{{ blogItem.title }}</h2>
    </router-link>
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

  .item .head {
    display: inline-block; 
    vertical-align: top;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px; 
    color: white;
  }

  .item h2 {
    display: inline-block;
    vertical-align: top;
    margin: 0 0 0 12px;
    height: 20px;
    width: 196px;
    line-height: 20px;
    font-size: 14px;
    color: #000;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item:hover {
    background-color: #E9EAED;
  }

  .item h2:hover {
    font-weight: bold;
  }
</style>