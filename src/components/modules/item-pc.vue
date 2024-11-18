<template>
  <div class="item" v-for="blogItem in props.blogItems" :key="blogItem.id">
    <img-action class="box" :width="'96px'" :height="'68px'" :action="true" :dimension="'height'" :url="blogItem.cover" />
    <div class="desc">
      <router-link target='_blank' :to="{name: 'guest-blog', params: {id: blogItem.id}}"><h2>{{ blogItem.title }}</h2></router-link>
      <p><span class="field">发布日期</span> <span class="attach">{{ dateFormat(blogItem.createdTime) }}</span></p>
    </div>
  </div>
</template>

<script setup>
import ImgAction from '@/components/modules/img-action.vue'

import { defineProps } from 'vue'
import { dateFormat } from '@/utils/helper.js'

const props = defineProps({
  blogItems: Object
})
</script>

<style scoped>
.item {
  padding: 4px 4px;
  cursor: pointer;
}

.item .box {
  display: inline-block;
}

.item .desc {
  width: 124px;
  float: right;
  margin-left: 8px;
}

.item .desc h2 {
  height: 44px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  word-break: break-all;
  color: #000;
}

.item .desc span {
  font-size: 12px;
  color: #999999;
}

.item .desc .field {
  float: left;
}

.item .desc .attach {
  float: right;
}

.item:hover {
  background: #E9EAED;
}

.item:hover h2 {
  font-weight: bold;
}
</style>