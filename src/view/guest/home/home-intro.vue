<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-carousel class="carousel">
        <div v-for="carousel in data.config.carousels" :key="carousel.id">
          <dom-background :cover="carousel.cover" :title="carousel.title" :id="carousel.id" size="24px" spacing="5px" />
        </div>
      </a-carousel>
    </a-col>
    <a-col :span="6" class="push">
      <dom-background v-if="data.config.topFirst" :cover="data.config.topFirst?.cover" :title="data.config.topFirst?.title" :id="data.config.topFirst?.id" height="130px" size="16px" spacing="4px" />
      <div class="interval"></div>
      <dom-background v-if="data.config.topSecond" :cover="data.config.topSecond?.cover" :title="data.config.topSecond?.title" :id="data.config.topSecond?.id" height="130px" size="16px" spacing="4px" />
    </a-col>
    <a-col :span="6">
      <a-card title="分类标签">
        <tag :label="type.label" v-for="type in data.types" :key="type.id" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import DomBackground from '@/components/modules/dom-background.vue'
import Tag from '@/components/modules/tag.vue'

import { reactive, onMounted } from 'vue'
import { getConfDetailByCodeAPI } from '@/api/guest/conf.js'
import { getTypeItemAPI } from '@/api/guest/archive.js'

const data = reactive({
  config: {},
  types: []
})

const methods = reactive({
  getConfDetailByCode: (code) => {
    getConfDetailByCodeAPI(code).then(response => {
      data.config = response.data.config
    })
  },
  getTypeItem: () => {
    getTypeItemAPI({"limit": 15}).then(response => {
      data.types = response.data.types
    })
  }
})

onMounted(
  () => {
    methods.getConfDetailByCode("TOP_ARTICLE")
    methods.getTypeItem()
  }
)

</script>

<style scoped>
.carousel div {
  height: 270px;
}

.push .interval {
  height: 10px;
}

.ant-card {
  border-radius: 0px;
  height: 270px;
}

.ant-card-body {
  overflow: scroll;
  scrollbar-width: none;
}
</style>