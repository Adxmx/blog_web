<template>
  <div id="editor">
    <mavon-editor ref="mavonEditorRef" style="height: 100%;" toolbarsBackground="#EDEDED" :boxShadow="false" placeholder="请 输 入 文 章 内 容 ..." v-model="valueMark" @change="change" @imgAdd="$imgAdd"></mavon-editor>
  </div>
</template>

<script setup>
import 'mavon-editor/dist/css/index.css'

import { mavonEditor } from 'mavon-editor'

import { fileUploadToGitRepo } from '@/utils/helper'

import { ref, watch, defineProps, defineEmits } from 'vue'

// 子组件获取父组件传递字段
const props = defineProps({
  modelValue: String
})

// 获取编辑器
const mavonEditorRef = ref()

// 子组件调用父组件方法
const emits = defineEmits(["update:modelValue"])

// 父组件传值
watch(() => props.modelValue, () => {
  valueMark.value = props.modelValue
}) 

// 内容 HTML
const valueMark = ref(props.modelValue)

const change = (text) => {
  emits('update:modelValue', text)
}

// 图片上传配置
const $imgAdd = (pos, $file) => {
  // TODO 校验是否图片
  fileUploadToGitRepo($file, (url) => {
    mavonEditorRef.value.$img2Url(pos, url)
  })
}
</script>

<style>
#editor {
  margin: auto;
  width: 100%;
  height: 65vh;
}

.v-note-wrapper {
  border: none !important;
  z-index: auto;
}

.v-note-wrapper .v-note-op {
  height: 40px !important;
}
</style>