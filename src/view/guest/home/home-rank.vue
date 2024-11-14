<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <a-card>
        <a-tabs size="small" @change="methods.change">
          <template #rightExtra>
            <span class="soup">因自我怀疑而失去的梦想比因失败而失去的更多。</span>
          </template>
          <a-tab-pane v-for="catalog, index in data.config" :key="index" :tab="catalog.title">
            <rank-content :topFirst="catalog.topFirst" :topSecond="catalog.topSecond" :blogItems="data.thumbBlogItems" />
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="阅读排名" :bordered="true">
        <item-title :blogItems="data.viewBlogItems" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import RankContent from '@/view/guest/home/modules/rank-content.vue'
import ItemTitle from '@/components/modules/item-title.vue'

import { reactive, onMounted } from 'vue'
import { getConfDetailByCodeAPI } from '@/api/guest/conf.js'
import { getBlogItemAPI } from '@/api/guest/blog.js'

const data = reactive({
  config: [],
  thumbBlogItems: [],
  viewBlogItems: []
})

const methods = reactive({
  change: (activeKey) => {
    methods.getBlogItem(data.config[activeKey].typeIds, "-thumb", 5)
  },
  getConfDetailByCode: (code) => {
    getConfDetailByCodeAPI(code).then(response => {
      data.config = response.data.config
      methods.getBlogItem(data.config[0].typeIds, "-thumb", 5)
    })
  },
  getBlogItem: (typeIds, sorter, limit) => {
    getBlogItemAPI({"typeIds": typeIds, "sorter": sorter, "limit": limit}).then(response => {
      if (typeIds) {
        data.thumbBlogItems = response.data.blogItems
      } else {
        data.viewBlogItems = response.data.blogItems
      }
    })
  }
})

onMounted(
  () => {
    methods.getConfDetailByCode("CATALOG_SETTING")
    methods.getBlogItem(null, "-view", 8)
  }
)

</script>

<style scoped>
.soup {
  font-size: 14px;
  color: #999999;
}

.ant-card {
  border-radius: 0px;
  height: 355px;
}
</style>