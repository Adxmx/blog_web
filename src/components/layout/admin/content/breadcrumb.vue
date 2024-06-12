<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>后台管理</a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in data.matched" :key="item.name">{{ item.meta.title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive({
  matched: []
})

watch(router.currentRoute, () => {
  data.matched = router.currentRoute.value.matched
}, {
  immediate: true
})

</script>