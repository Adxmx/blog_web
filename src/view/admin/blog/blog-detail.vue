<template>
  <a-card class="artical">
    <a-typography-title :level="2" class="title">{{ data.blogForm.title }}</a-typography-title>
    <a-divider />
    <p class="content" v-html="data.blogContent"></p>
    <h1></h1>
  </a-card>
  <a-back-top />
</template>
<script setup>
import { marked } from 'marked'
import "highlight.js/styles/dark.min.css"
import hljs from "highlight.js"

import { reactive, onMounted, nextTick } from 'vue'
import { useRouter} from 'vue-router'

import { getBlogDetailByIdAPI } from '@/api/admin/blog.js'

const router = useRouter()

const data = reactive({
  // 博客字段
  blogForm: {},
  blogContent: ""
})

const methods = {
  getBlogDetailById: (id) => {
    getBlogDetailByIdAPI(id).then(response => {
      Object.assign(data.blogForm, response.data.blog)
      if (data.blogForm.editor === 2) {
        data.blogContent = marked.parse(data.blogForm.content)
      }
      nextTick(() => {
        hljs.highlightAll()
      })
    })
  }
}

onMounted(
  () => {
    let id = router.currentRoute.value.params.id
    methods.getBlogDetailById(id)
  }
)
</script>
<style>
.artical {
  width: 100%;
}

.artical .title {
  text-align: center;
  border-radius: 5px;
}

.artical .content h1 {
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 30px;
  line-height: 1.2666666666666666;
}
</style>