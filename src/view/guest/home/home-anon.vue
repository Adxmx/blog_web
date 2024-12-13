<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <a-card title="隐匿角落" class="content">
        <template #extra>
          <span class="soup">暂无匿名提交，先放一些非技术博客。</span>
        </template>
        <a-row :gutter="4">
          <a-col :span="6" v-for="blogItem in data.firstFourBlogItems" :key="blogItem.id">
            <a-card hoverable style="text-align: center">
              <template #cover>
                <img-action :width="'100%'" :height="'120px'" :action="true" :dimension="'width'" :url="blogItem.cover" />
              </template>
              <router-link target='_blank' :to="{name: 'guest-blog', params: {id: blogItem.id}}">
                <a-card-meta :title="blogItem.title">
                  <template #description>{{ blogItem.description }}</template>
                </a-card-meta>
              </router-link>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="4" style="margin-top: 10px;">
          <a-col :span="6" v-for="blogItem in data.fifthToEighthBlogItems" :key="blogItem.id">
            <a-card hoverable style="text-align: center">
              <template #cover>
                <img-action :width="'100%'" :height="'120px'" :action="true" :dimension="'width'" :url="blogItem.cover" />
              </template>
              <a-card-meta :title="blogItem.title">
                <template #description>{{ blogItem.description }}</template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :span="6">
      <a-card title="匿名推荐" :bordered="true" class="content">
        <item-pc :blogItems="data.recoBlogItems" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import ImgAction from '@/components/modules/img-action.vue'
import ItemPc from '@/components/modules/item-pc.vue'

import { reactive, onMounted } from 'vue'
import { getBlogItemAPI } from '@/api/guest/blog.js'

const data = reactive({
  firstFourBlogItems: [],
  fifthToEighthBlogItems: [],
  recoBlogItems: []
})

const methods = reactive({
  getBlogItem: (operate, params) => {
    getBlogItemAPI(params).then(response => {
      console.log(operate)
      const blogItems = response.data.blogItems
      if (operate === "anon") {
        if (blogItems.length > 4) {
          data.firstFourBlogItems = blogItems.slice(0, 4)
          data.fifthToEighthBlogItems = blogItems.slice(4)
        } else {
          data.firstFourBlogItems = blogItems
        }
      } else if (operate === "anonReco") {
        data.recoBlogItems = blogItems
      }
    })
  }
})

onMounted(() => {
  methods.getBlogItem("anon", {"isAnon": true, "limit": 8, "sorter": "-createdTime"})
  methods.getBlogItem("anonReco", {"isAnon": true, "isRecommend": true, "limit": 6, "sorter": "-createdTime"})
})
</script>

<style scoped>
.soup {
  font-size: 14px;
  color: #999999;
}

.content {
  height: 600px;
}

.content img {
  height: 120px;
}

::v-deep .ant-card-meta-description {
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.ant-card {
  border-radius: 0px;
}
</style>