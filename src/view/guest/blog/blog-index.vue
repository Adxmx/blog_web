<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <blog-article :blog="data.blog" />
    </a-col>
    <a-col :span="6"> 
      <blog-author :user="data.blog.user" :blogItems="data.blogItems" :view="data.blog.view" :thumb="data.blog.thumb" />
    </a-col>
  </a-row>
  <a-float-button-group shape="circle" :style="{ right: '94px', bottom: '24px' }">
    <a-float-button :class="{disabled: data.disabled}" @click="methods.clickThumb">
      <template #icon><LikeOutlined /></template>
    </a-float-button>
    <a-back-top :visibility-height="800" />
  </a-float-button-group>
</template>

<script setup>
import BlogArticle from '@/view/guest/blog/blog-article.vue'
import BlogAuthor from '@/view/guest/blog/blog-author.vue'

import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import { getBlogDetailByIdAPI, getBlogItemAPI, giveThumbAPI } from '@/api/guest/blog.js'
import { ANON_USER } from '@/constants/index.js'

const router = useRouter()

const data = reactive({
  disabled: false,
  blog: {},
  blogItems: {}
})

const methods = reactive({
  clickThumb: () => {
    // 避免重复点赞
    if (!data.disabled) {
      data.disabled = true
      data.blog.thumb += 1
      methods.giveThumb(data.blog.id)
    }
  },

  getBlogDetailById: (id) => {
    getBlogDetailByIdAPI(id).then(response => {
      Object.assign(data.blog, response.data.blog)
      if (data.blog.user) {
        methods.getBlogItem({"userId": data.blog.userId})
      } else {
        // 匿名赋值
        data.blog.user = {
          nickname: ANON_USER.nickname,
          avatar: ANON_USER.avatar,
          signature: ANON_USER.signature
        }
        methods.getBlogItem({"isAnon": true})
      }
      // 修改页面标题
      window.document.title = data.blog.title
    })
  },

  getBlogItem: (query) => {
    getBlogItemAPI({...query, "limit": 10, "sorter": "-createdTime"}).then(response => {
      Object.assign(data.blogItems, response.data.blogItems)
    })
  },

  giveThumb: (id) => {
    giveThumbAPI(id).then(response => {
      console.log(response.data.msg)
    })
  }
})

watch (router.currentRoute, () => {
  if (router.currentRoute.value.name === "guest-blog") {
    let id = router.currentRoute.value.params.id
    methods.getBlogDetailById(id)
  }
}, {
  immediate: true
})
</script>

<style scoped>
 .disabled ::v-deep .ant-float-btn-body {
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.06);
 }
</style>
