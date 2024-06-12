<template>
  <div class="content">
    <h1>后 台 管 理</h1>
    <h4>博客系统后台管理系统登录地址</h4>
    <a-tabs :activeKey='data.activeTab' centered @change='methods.tabChange'>
      <a-tab-pane key="pwd">
        <template #tab>
          <span><LockOutlined />密码登录</span>
        </template>
        <pwd-login ref='pwdLoginRef' />
      </a-tab-pane>
      <a-tab-pane key="email">
        <template #tab>
          <span><MailOutlined />邮箱登录</span>
        </template>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
    <a-checkbox class="autoChk">自动登录</a-checkbox>
    <a-button class="loginBtn" type="primary" @click="methods.login">登 录</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import pwdLogin from '@/view/admin/login/module/pwd-login.vue'
const pwdLoginRef = ref()

const data = {
  // 默认密码登录
  activeTab: 'pwd'
}

const methods = {
  tabChange: (key) => {
    data.activeTab = key
  },
  login: () => {
    if (data.activeTab === 'pwd') {
      pwdLoginRef.value.methods.pwdLogin()
    } else if (data.activeTab === 'email') {
      console.log('email登录方法')
    }
  }
}
</script>

<style>
  .content {
    margin: 50px auto;
    padding:20px 40px;
    height: 500px;
    width: 400px;
    background: #f0f2f5;
    text-align: center;
  }

  .content h1 {
    font-size: 33px;
    color: rgba(0,0,0,.85);
    font-weight: 600;
    position: relative;
    top: 2px;
  }

  .content h4 {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

  .content .autoChk {
    float: left;
  }

  .content .loginBtn {
    margin-top: 25px;
    width: 100%;
  }

  /* 表单错误提示左浮动(避免因content: {text-align: center} 造成的居中影响) */
  .content .ant-form-item-explain-error {
    float: left;
  }

  .ant-tabs-tab {
    padding: 10px 10px;
  }
</style>