<template>
  <a-modal v-model:open="data.open" v-model:title="data.title" size="small" :width="600" @ok="methods.handleOk">
    <a-divider />
      <a-form :model="data.confForm" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="配置名称" name="name" :rules="[{ required: true, message: '请输入配置名称！' }]">
        <a-input v-model:value="data.confForm.name" placeholder="请 输 入 配 置 名 称 " />
      </a-form-item>
      <a-form-item label="配置编码" name="code" :rules="[{ required: true, message: '请输入配置编码！' }]">
        <a-input v-model:value="data.confForm.code" placeholder="请 输 入 配 置 编 码" />
      </a-form-item>
      <a-form-item label="配置内容" name="config" :rules="[{ required: true, message: '请输入配置内容！' }]">
        <a-textarea v-model:value="data.confForm.config" :rows="8" allow-clear placeholder="请 输 入 配 置 内 容" />
      </a-form-item>
      <a-form-item label="配置描述" name="description" :rules="[{ required: true, message: '请输入配置描述！' }]">
        <a-textarea v-model:value="data.confForm.description" :rows="4" allow-clear show-count :maxlength="1024" placeholder="请 输 入 配 置 描 述" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, defineExpose, defineEmits } from 'vue'

import { addConfAPI, getConfDetailByIdAPI, updateConfByIdAPI } from '@/api/admin/setting.js'

const emits = defineEmits(['flush'])

const data = reactive({
  title: null,
  open: false,
  confForm: {
    id: null,
    name: null,
    code: null,
    description: null,
    config: null,
  }
})

const methods = reactive({
  showModal: (id) => {
    if (id) {
      data.title = `编 辑 - ${id}`
      methods.getConfDetailById(id)
    } else {
      data.title = '新 增'
      methods.initConfForm()
    }
    data.open = true;
  },
  handleOk: () => {
    if (data.confForm.id) {
      methods.updateConfById(data.confForm.id, data.confForm)
    } else {
      methods.addConf(data.confForm)
    }
  },
  initConfForm: () => {
    data.confForm = {
      id: null,
      name: null,
      code: null,
      description: null,
      config: null,
    }
  },
  addConf: (conf) => {
    addConfAPI(conf).then(() => {
      emits('flush')
      data.open = false
    }, error => {
      console.log(error)
    })
  },
  getConfDetailById: (id) => {
    getConfDetailByIdAPI(id).then(response => {
      data.confForm = response.data.conf
    })
  },
  updateConfById: (id, conf) => {
    updateConfByIdAPI(id, conf).then(() => {
      emits('flush')
      data.open = false
    }, error => {
      console.log(error)
    })
  }
})

defineExpose({
  data,
  methods
})
</script>