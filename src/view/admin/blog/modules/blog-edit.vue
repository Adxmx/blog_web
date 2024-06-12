<template>
  <a-form :model="data.blogEditForm">
    <a-card>
      <a-select class="flag" v-model:value="data.blogEditForm.flag" :bordered="false" placeholder="类 型" size="small" @change="methods.flagChange">
        <a-select-option :value="1">原 创</a-select-option>
        <a-select-option :value="2">转 载</a-select-option>
        <a-select-option :value="3">翻 译</a-select-option>
      </a-select>
      <a-input class="title" v-model:value="data.blogEditForm.title" size="small" :showCount="true" :bordered="false" placeholder="请 输 入 文 章 标 题" />
      <a-button class="editor" type="text" size="small" v-if="!data.blogEditForm.content" @click="data.blogEditForm.editor = data.blogEditForm.editor === 1 ? 2 : 1"><template #icon><swap-outlined /></template>切换编辑器</a-button>
    </a-card>
    <!-- 富文本编辑器 -->
    <wang-editor-custom v-if="data.blogEditForm.editor === 1" v-model="data.blogEditForm.content" />
    <mavon-editor-custom v-if="data.blogEditForm.editor === 2" v-model="data.blogEditForm.content" />
  </a-form>
</template>

<script setup>
import WangEditorCustom from '@/components/editor/wang-editor-custom.vue'
import MavonEditorCustom from '@/components/editor/mavon-editor-custom.vue'

import { reactive, watch, defineExpose, defineProps } from 'vue'

const props = defineProps({
  blogForm: Object
})

const data = reactive({
  blogEditForm: {
    flag: props.blogForm.flag,
    title: props.blogForm.title,
    editor: props.blogForm.editor,
    content: props.blogForm.content
  }
})

const methods = reactive({
  flagChange: (value) => {
    data.blogEditForm.flag = value
  }
})

watch(props.blogForm, () => { 
  data.blogEditForm.flag = props.blogForm.flag
  data.blogEditForm.title = props.blogForm.title
  data.blogEditForm.editor = props.blogForm.editor
  data.blogEditForm.content = props.blogForm.content
},
data.blogEditForm.content, () => {
  console.log('----', data.blogEditForm.content)
})


defineExpose({
  data
})

</script>

<style scoped>
.flag {
  width: 15%;
  font-size: 30px;
}

::v-deep .ant-select-selector {
  height: 35px !important;
  color: #606266 !important;
  padding: 0 11px !important;
  line-height: 30px !important;
}

::v-deep .ant-select-selection-placeholder {
  line-height: 30px !important;
  font-size: 30px !important;;
}

::v-deep .ant-select-selection-item {
  line-height: 30px !important;
  font-size: 30px !important;
}

/* ::v-deep . */

.title {
  width: 70%;
  font-size: 30px;
}

::v-deep .ant-input {
  font-size: 30px;
  color: #606266;
}

.editor {
  float: right;
  position: relative;
  top: 15px;
}
</style>