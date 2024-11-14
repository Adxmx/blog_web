<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <blog-article :blog="data.blog" :author="data.user.nickname" :label="data.type.label" />
    </a-col>
    <a-col :span="6"> 
      <blog-author :user="data.user" :view="data.blog.view" :thumb="data.blog.thumb" :blogItems="data.blogItems" />
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
import { getUserDetailByIdAPI } from '@/api/guest/user.js'
import { getTypeDetailByIdAPI } from '@/api/guest/archive.js'

const router = useRouter()

const data = reactive({
  disabled: false,
  blog: {},
  user: {},
  type: {},
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
      methods.getUserDetailById(data.blog.userId)
      methods.getBlogItem(data.blog.userId)
      methods.getTypeDetailById(data.blog.typeId)
      // 修改页面标题
      window.document.title = data.blog.title
    })
  },

  getUserDetailById: (id) => {
    getUserDetailByIdAPI(id).then(response => {
      Object.assign(data.user, response.data.user)
    })
  },

  getTypeDetailById: (id) => {
    getTypeDetailByIdAPI(id).then(response => {
      Object.assign(data.type, response.data.type)
    })
  },

  getBlogItem: (userId) => {
    getBlogItemAPI({"userId": userId, "limit": 10, "sorter": "-createdTime"}).then(response => {
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
