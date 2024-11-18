<template>
  <a-card class="artical">
    <a-typography-title :level="2" class="title">{{ props.blog.title }}</a-typography-title>
    <div class="remark">
      <UserOutlined /> {{ props.blog.user?.nickname }}
      <TagOutlined /> {{ props.blog.type?.label }}
      <CalendarOutlined /> {{ methods.blogTimeFormat(props.blog.createdTime) }}
      <EyeOutlined /> {{ props.blog.view  }}
      <LikeOutlined /> {{ props.blog.thumb }}
      <CommentOutlined /> 0
    </div>
    <a-divider class="divider" />
    <img-action :width="'100%'" :height="'480px'" :action="false" :dimension="'height'" :url="props.blog.cover" />
    <a-divider class="divider" />
    <p class="content" v-html="methods.blogContentFormat(props.blog)"></p>
  </a-card>
</template>

<script setup>
import ImgAction from '@/components/modules/img-action.vue'
import { reactive, defineProps, nextTick } from 'vue'

import hljs from "highlight.js"
import { marked } from 'marked'
import "highlight.js/styles/dark.min.css"
import dayjs from 'dayjs'

const props = defineProps({
  blog: Object,
})

const methods = reactive({
  blogContentFormat: (blog) => {
    let blogContent
    if (blog.editor === 1) {
      blogContent = blog.content
    } else if (blog.editor === 2) {
      blogContent = marked.parse(blog.content)
    }
    nextTick(() => {
      hljs.highlightAll()
    })
    return blogContent
  },
  blogTimeFormat: (time) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  }
})


</script>

<style scoped>
.artical {
  width: 100%;
}

.artical img {
  border-radius: 0px;
  width: 100%;
}

.artical .remark {
  text-align: center;
  opacity: 0.8;
}

.artical .remark span:nth-child(n+1) {
  margin-left: 24px;
}

.artical .title {
  text-align: center;
  border-radius: 5px;
}

.artical .divider {
  background: #E9EAED;
  margin: 12px auto;
}

.ant-card {
  border-radius: 0px;
}
</style>