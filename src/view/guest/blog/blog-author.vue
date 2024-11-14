<template>
  <a-card class="author">
    <img :src="props.user.avatar" />
    <h3>{{ props.user.nickname }}</h3>
    <p>欢迎来到我的主页</p>
    <a-divider class="divider" />
    <a-row class="visit">
      <a-col :span="8">
        <span>{{ props.view }}</span>
        <EyeOutlined class="icon" />
      </a-col>
      <a-col :span="8">
        <span>{{ props.thumb }}</span>
        <LikeOutlined class="icon" />
      </a-col>
      <a-col :span="8">
        <span>0</span>
        <CommentOutlined class="icon" />
      </a-col>
    </a-row>
  </a-card>

  <a-card title="文章目录" class="interval">
    待开发
  </a-card>

  <a-card title="作者推荐" class="interval">
    <item-title :blogItems="props.blogItems" />
  </a-card>
  
</template>

<script setup>
import ItemTitle from '@/components/modules/item-title.vue'

import { defineProps } from 'vue'

const props = defineProps({
  user: Object,
  view: Number,
  thumb: Number,
  blogItems: Object
})
</script>

<style scoped>
.author {
  text-align: center;
}

.author img {
  width: 64px;
  border-radius: 50%;
}

.author h3 {
  margin-top: 10px;
  font-weight: bold;
}

.author p {
  margin-top: 10px;
  opacity: 0.8;
}

.author .divider {
  background: #E9EAED;
  margin: 12px auto;
}

.author .visit {
  color: #4E5969;
}

.author .visit .icon {
  display: block;
  margin-top: 10px;
  font-size: 14px;

}

.interval {
  margin-top: 20px;
}

.ant-card {
  border-radius: 0px;
}
</style>