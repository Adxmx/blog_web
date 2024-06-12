<template>
  <div>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height:60vh;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="onChange" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { fileUploadToGitRepo } from '@/utils/helper'

import { onBeforeUnmount, ref, shallowRef, defineProps, defineEmits, watch } from 'vue'


// 子组件获取父组件传递字段
const props = defineProps({
  modelValue: String,
  value: String
})

// 子组件调用父组件方法
const emits = defineEmits(["update:modelValue"])

// 父组件传值
watch(() => props.modelValue, () => {
  valueHtml.value = props.modelValue
})  

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编辑器mode
const mode = ref('default')

// 内容 HTML
const valueHtml = ref(props.modelValue)

// 菜单栏
const toolbarConfig = {
  // 工具栏配置
  toolbarKeys: [
    "headerSelect",
    "bold",
    "underline",
    "italic",
    "through",
    "color",
    "bgColor",
    "|",
    "sup",
    "sub",
    "blockquote",
    "codeBlock",
    "insertTable",
    {
      "key": "group-image",
      "title": "图片",
      "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
      "menuKeys": [
          "insertImage",
          "uploadImage"
      ]
    },
    "emotion",
    "insertLink",
    "bulletedList",
    "numberedList",
    {
      "key": "group-justify",
      "title": "对齐",
      "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
      "menuKeys": [
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify"
      ]
    },
    {
      "key": "group-indent",
      "title": "缩进",
      "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
      "menuKeys": [
          "indent",
          "delIndent"
      ]
    },
    "|",
    "undo",
    "redo",
    "fullScreen"
  ]
}

// 编辑器的配置
const editorConfig = { 
  placeholder: '请 输 入 文 章 内 容 ...',
  autoFocus: true,
  // 上传图片配置
  MENU_CONF: {
    uploadImage: {
      // // 服务端地址
      // server: 'http://localhost:8081/file/upload',
      // // 后端接受文件名
      // fieldName: "file",
      // // 图片最大体积(byte)
      // maxFileSize: 1 * 1024 * 1024,
      // // 文件类型
      // allowedFileTypes: ['image/*'],
      // // 超时时间(ms)
      // timeout: 6 * 1000,
      // // 加工上传接口返回数据
      // customInsert: (res, insertFn) => {
      //   insertFn(res.url, '图片消失了！', res.url)
      // },
      async customUpload(file, insertFn) {
        // TODO 校验是否图片
        fileUploadToGitRepo(file, (url) => {
          console.log(url)
          insertFn(url, '图片消失了！', url)
        })
      }
    }
  },
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const onChange = (editor) => {
  // const text = editor.getText()
  if (editor.isEmpty()) {
    emits('update:modelValue', '')
  } else {
    const text = editor.getHtml()
    emits('update:modelValue', text)
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style>
/* 工具栏背景颜色 */
.w-e-toolbar {
  background-color: #EDEDED;
}
</style>
