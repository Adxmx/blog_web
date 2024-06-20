<template>
  <a-card class="artical">
    <a-typography-title :level="2" class="title">{{ data.blogForm.title }}</a-typography-title>
    <a-divider />
    <pre style="text-align: start;" class="language-java" language="java" tabindex="0"><code class="language-python" language="java"  style="line-height: 1;">p { color: red }</code></pre>
    <p id="wrapper" class="typo typo-selection" v-html="data.blogForm.content"></p>
  </a-card>
  <a-back-top />
</template>
<script setup>
import 'typo.css/typo.css'

import 'prismjs/themes/prism-twilight.min.css'
import Prism from 'prismjs/prism.js'

import { reactive, onMounted } from 'vue'
import { useRouter} from 'vue-router'

import { getBlogDetailByIdAPI } from '@/api/admin/blog.js'

const router = useRouter()

const data = reactive({
  // 博客字段
  blogForm: {}
})

const methods = {
  getBlogDetailById: (id) => {
    getBlogDetailByIdAPI(id).then(response => {
      Object.assign(data.blogForm, response.data.blog)
    })
  }
}

onMounted(
  () => {
    let id = router.currentRoute.value.params.id
    methods.getBlogDetailById(id)
    setTimeout(() => {
      Prism.highlightAll()
    }, 100)
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
</style>