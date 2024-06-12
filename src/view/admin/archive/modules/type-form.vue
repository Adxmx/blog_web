<template>
  <a-modal v-model:open="data.open" title="新 增" size="small" @ok="methods.handleOk">
    <a-form :model="data.typeForm" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item label="分 类 名" name="label" :rules="[{ required: true, message: '请输入分类名字！' }]">
      <a-input v-model:value="data.typeForm.label" placeholder="请 输 入 分 类 名 字 " />
    </a-form-item>
  </a-form>
  </a-modal>
</template>
<script setup>
import { reactive, defineExpose, defineEmits } from "vue"

import { addTypeAPI } from '@/api/admin/archive.js'

const emits = defineEmits(['flush'])

const data = reactive({
  open: false,
  typeForm: {
    label: null
  }
})

const methods = reactive({
  handleOk: () => {
    methods.addType(data.typeForm)
  },
  addType: (type) => {
    addTypeAPI(type).then(() => {
      emits('flush')
      data.open = false
    }, error => {
      console.log(error)
    })
  }
})

defineExpose({
  data
})
</script>