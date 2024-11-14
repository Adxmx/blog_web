<template>
  <a-card>
    <a-form :model="data.blogSettingsForm" name="validate_other" v-bind="data.formItemLayout">
      <a-form-item label="标 题">
        <span class="ant-form-text"><b v-text="data.blogSettingsForm.title" /></span>
      </a-form-item>

      <a-form-item label="类 型">
        <a-radio-group v-model:value="data.blogSettingsForm.flag">
          <a-radio-button :value="1">原 创</a-radio-button>
          <a-radio-button :value="2">转 载</a-radio-button>
          <a-radio-button :value="3">翻 译</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="分 类">
        <a-select v-model:value="data.blogSettingsForm.typeId" placeholder="请 选 择 文 章 分 类" show-search :filter-option="methods.filterOption" @change="methods.typeChange">
          <a-select-option v-for="item in data.types" :key="item.id" :value="item.id" :label="item.label">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="状 态">
        <a-switch v-model:checked="data.blogSettingsForm.isPublished" checked-children="发 布" un-checked-children="草 稿" />
      </a-form-item>

      <a-form-item label="身 份">
        <a-radio-group v-model:value="data.blogSettingsForm.isAnon">
          <a-radio :value="false">nickname</a-radio>
          <a-radio :value="true">匿 名</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="更 多">
        <a-checkbox v-model:checked="data.blogSettingsForm.isRecommend" style="line-height: 32px">推 荐</a-checkbox>
        <a-checkbox v-model:checked="data.blogSettingsForm.isCopyright" style="line-height: 32px">版 权</a-checkbox>
        <a-checkbox v-model:checked="data.blogSettingsForm.isReward" style="line-height: 32px">赞 赏</a-checkbox>
        <a-checkbox v-model:checked="data.blogSettingsForm.isComment" style="line-height: 32px">评 论</a-checkbox>
      </a-form-item>

      <a-form-item label="描 述">
        <a-textarea v-model:value="data.blogSettingsForm.description" :rows="5" placeholder="请 输 入 文 章 描 述 . . ." show-count :maxlength="100" />
      </a-form-item>

      <a-form-item label="封 面">
        <a-upload class="cover-upload" list-type="picture-card" :show-upload-list="false" :before-upload="methods.beforeUpload" :customRequest="methods.customUpload">
          <img v-if="data.blogSettingsForm.cover" style="width: 100%;" :src="data.blogSettingsForm.cover" alt="cover" />
          <div class="upload-desc" v-else>
            <loading-outlined v-if="data.upload.loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">封 面 图 片</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive, watch, defineExpose, defineProps, onMounted } from 'vue'
import { message } from 'ant-design-vue'

import { getTypeListAPI } from '@/api/admin/archive.js'
import { fileUploadToGitRepo } from '@/utils/helper'

const props = defineProps({
  blogForm: Object
})

const data = reactive({
  formItemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      offset: 1,
      span: 14,
    },
  },
  types: [],
  blogSettingsForm: {
    title: props.blogForm.title,
    flag: props.blogForm.flag,
    typeId: props.blogForm.typeId,
    isPublished: props.blogForm.isPublished,
    isAnon: props.blogForm.isAnon,
    isRecommend: props.blogForm.isRecommend,
    isCopyright: props.blogForm.isCopyright,
    isReward: props.blogForm.isReward,
    isComment: props.blogForm.isComment,
    description: props.blogForm.description,
    cover: props.blogForm.cover
  },
  upload: {
    loading: false
  }
})

const methods = reactive({
  filterOption: (input, option) => {
    if (option.label) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  typeChange: (value) => {
    data.blogSettingsForm.typeId = value
  },
  getTypeList: () => {
    getTypeListAPI({pageSize: 999}).then(response => {
      data.types = response.data.types
    }, error => {
      console.log(error)
    })
  },
  beforeUpload: (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!')
    }
    return isJpgOrPng && isLt2M
  },
  customUpload: (upload) => {
    fileUploadToGitRepo(upload.file, (url) => {
      data.blogSettingsForm.cover = url
      data.upload.loading = false
    })
  }
})

watch(props.blogForm, () => { 
  data.blogSettingsForm.title = props.blogForm.title
  data.blogSettingsForm.flag = props.blogForm.flag
  data.blogSettingsForm.typeId = props.blogForm.typeId
  data.blogSettingsForm.isPublished = props.blogForm.isPublished
  data.blogSettingsForm.isAnon = props.blogForm.isAnon
  data.blogSettingsForm.isRecommend = props.blogForm.isRecommend
  data.blogSettingsForm.isCopyright = props.blogForm.isCopyright
  data.blogSettingsForm.isReward = props.blogForm.isReward
  data.blogSettingsForm.isComment = props.blogForm.isComment
  data.blogSettingsForm.description = props.blogForm.description
  data.blogSettingsForm.cover = props.blogForm.cover
})

defineExpose({
  data
})

onMounted(
  () => {
    methods.getTypeList()
  }
)

</script>

<style>
.cover-upload  .ant-upload-select-picture-card {
  width: 100% !important;
  height: 100% !important;
  min-height: 160px;
}

.cover-upload img {
  width: 100%;
  line-height: 160px;;
}

.cover-upload .upload-desc{
  margin: 60px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>