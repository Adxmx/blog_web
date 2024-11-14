<template>
  <a-layout>
    <a-layout-header class="header">
      <a-layout-content class="inner">
        <a-flex>  
          <logo style="width: 21%;" :logo="data.config.logo" :title="data.config.title" />
          <navigation style="width: 65%;"/>
          <func style="width: 14%;"/>
        </a-flex> 
      </a-layout-content>
    </a-layout-header>
    <a-layout-content class="content">
      <a-layout-content class="inner">
        <router-view></router-view>
      </a-layout-content>
    </a-layout-content>
    <a-layout-footer class="footer">
      <a-layout-content class="inner">
        <a-row>
          <a-col :span="4">
            <QRcode :qrcode="data.config.qrcode" />
          </a-col>
          <a-col :span="20">
            <Statement :statements="data.config.statements" />
          </a-col>
        </a-row>
        <Right :copyright="data.config.copyright" :ICP="data.config.ICP" :PSB="data.config.PSB" />
      </a-layout-content>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import Logo from '@/components/layout/guest/header/logo.vue'
import Navigation from '@/components/layout/guest/header/navigation.vue'
import Func from '@/components/layout/guest/header/func.vue'
import QRcode from '@/components/layout/guest/footer/qrcode.vue'
import Statement from '@/components/layout/guest/footer/statement.vue'
import Right from '@/components/layout/guest/footer/right.vue'

import { reactive, onMounted } from 'vue'
import { getConfDetailByCodeAPI } from '@/api/guest/conf.js'

const data = reactive({
  config: {}
})

const methods = reactive({
  getConfDetailByCode: (code) => {
    getConfDetailByCodeAPI(code).then(response => {
      data.config = response.data.config
    })
  }
})

onMounted(
  () => {
    methods.getConfDetailByCode("WEBSITE_SETTING")
  }
)
</script>

<style scoped>
.header {
  background: #fff;
  position: fixed;
  z-index: 1;
  width: 100%;
  box-shadow: 5px 0 10px #0000001a;
}

.header .inner {
  margin: 0 auto;
  width: 1200px;
}

.content {
  margin-top: 65px;
  background:#E9EAED;
}

.content .inner {
  margin: 10px auto;
  width: 1200px
}

.footer {
  background: #fff;
}

.footer .inner {
  margin: 0 auto;
  width: 1200px;
}

</style>
