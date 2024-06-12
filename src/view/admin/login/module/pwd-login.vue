<template>
  <a-form :model="data.userForm">
    <a-form-item v-if="data.alertData.visible">
      <a-alert :message="data.alertData.content" :type="data.alertData.type" show-icon closable :after-close="methods.handleClose" />
    </a-form-item>

    <a-form-item name="username" v-bind="validateInfos.username">
      <a-input placeholder=" 用 户 名：" v-model:value="data.userForm.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item name="password" v-bind="validateInfos.password">
      <a-input-password placeholder=" 密 码：" v-model:value="data.userForm.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <!-- 验证码 -->
    <a-form-item name="code" v-bind="validateInfos.code" class="captcha">
      <a-input class="code" placeholder=" 验 证 码：" v-model:value="data.userForm.code">
        <template #prefix>
          <MailOutlined class="site-form-item-icon" />
        </template>
      </a-input>
      <img @click="methods.getCaptcha()" :src="data.captcha.base64">
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, defineExpose, onMounted } from 'vue'
import { useStore } from 'vuex'

import { Form } from 'ant-design-vue'

import { loginAPI, getCaptchaAPI } from '@/api/admin/user.js'

const store = useStore()

const data = reactive({
  alertData: {
    visible: false,
    type: '',
    content: ''
  },
  userForm: {
    username: '',
    password: '',
    uuid: '',
    code: ''
  },
  captcha: {
    base64: '',
    uuid: ''
  },
  userFormRules: {
    username: [{ required: true, message: '请输入用户名！' }],
    password: [{ required: true, message: '请输入用户密码！' }],
    code: [{ required: true, message: '请输入验证码!' }]
  }
})

// 表单校验
const {validate, validateInfos} = Form.useForm(data.userForm, data.userFormRules)

const methods = reactive({
  handleClose: () => {
    data.alertData.visible = false
  },
  pwdLogin: () => {
    validate().then(() => {
      methods.login(data.userForm.username, data.userForm.password, data.userForm.uuid, data.userForm.code)
    }).catch(error => {
      console.log(error)
    })

  },
  login: (username, password, uuid, code) => {
    loginAPI({username: username, password: password, uuid: uuid, code: code}).then(response => {
      data.alertData.visible = true
      data.alertData.type = 'success'
      data.alertData.content = response.msg
      store.dispatch('login', response.data.token)
    }, error => {
      // 登录失败后刷新验证码
      methods.getCaptcha()
      // 显示登录失败警告
      data.alertData.visible = true
      data.alertData.type = 'error'
      data.alertData.content = error.msg
    })
  },
  getCaptcha: () => {
    getCaptchaAPI().then(response => {
      Object.assign(data.captcha, response.data.captcha)
      // 将uuid赋值给userForm
      data.userForm.uuid = data.captcha.uuid
    }, error => {
      console.log(error)
    }) 
  }
  
})

onMounted(
  () => {
    methods.getCaptcha()
  }
)

defineExpose({
  methods
})

</script>
<style>
.captcha .code {
  width: 50%;
  float: left;
}
.captcha img {
  float: right;
  cursor: pointer;
}
</style>