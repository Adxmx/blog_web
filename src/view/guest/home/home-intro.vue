<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-carousel class="carousel">
        <div v-for="carousel in data.config.carousels" :key="carousel.id">
          <router-link target='_blank' :to="{name: 'guest-blog', params: {id: carousel.id}}"><h1 :style="`background-image: url(${carousel.cover});`">{{ carousel.title }}</h1></router-link>
        </div>
      </a-carousel>
    </a-col>
    <a-col :span="6" class="push">
      <div class="article" :style="`background-image: url(${data.config.topFirst?.cover})`">
        <router-link v-if="data.config.topFirst?.id" target='_blank' :to="{name: 'guest-blog', params: {id: data.config.topFirst?.id}}"><h3>{{data.config.topFirst?.title}}</h3></router-link>
      </div>
      <div class="interval"></div>
      <div class="article" :style="`background-image: url(${data.config.topSecond?.cover})`">
        <router-link v-if="data.config.topSecond?.id" target='_blank' :to="{name: 'guest-blog', params: {id: data.config.topSecond?.id}}"><h3>{{data.config.topSecond?.title}}</h3></router-link>
      </div>
    </a-col>
    <a-col :span="6">
      <a-card title="分类标签">
        <tag :label="type.label" v-for="type in data.types" :key="type.id" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
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
  text-align: center;
  height: 270px;
  line-height: 270px;
  overflow: hidden;
}

.carousel h1 {
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 5px;
}

.push .article {
  text-align: center;
  height: 130px;
  line-height: 130px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.push .article h3 {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 4px;
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