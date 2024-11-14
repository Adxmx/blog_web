<template>
  <div class="func">
    <a-input-search class="search horizontal vertical" :bordered="false" placeholder="关键字搜索" size="small" @search="methods.onSearch">
      <template #enterButton>
        <a-button type="text"><search-outlined style="color: rgba(0, 0, 0, 0.45)" /></a-button>
      </template>
    </a-input-search>

    <a-button class="horizontal" type="danger" size="small" @click="router.push({ name: 'admin-blog-artical-write' })">
      <template #icon><edit-outlined /></template>写博客
    </a-button>
    
    <a-badge class="horizontal" :count="1">
      <a-button type="primary" shape="circle" ghost size="small"><template #icon><bell-outlined /></template></a-button>
    </a-badge>

    <a-dropdown class="user horizontal">
      <div class="ant-dropdown-link">
        <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
        <span class="spacing"> {{ store.state.user.nickname }} </span> <DownOutlined />
      </div>
      <template #overlay>
        <a-menu class="menu">
          <a-menu-item key="center" class="item"><user-outlined />个人中心</a-menu-item>
          <a-menu-item key="settings" class="item"><setting-outlined />个人设置</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout" @click="methods.logout" class="item"><logout-outlined />注销用户</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>

</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()

const router = useRouter()

const methods = reactive({ 
  onSearch: (value) => {
    alert(value)
  },
  logout: () => {
    store.dispatch('logout')
  }
})
</script>

<style scoped>
.func {
  float: right;
  padding: 0 10px;
}

.func .horizontal {
  margin: 0 15px 0 15px;
}
.func .vertical {
  margin-top: 20px;
}

.func .search {
  width: 180px;
}

.msg {
  background-color: #F90;
  border-color: #F90;
  color: #FFF;
}

.func .user {
  display: inline-block;
}

/** 昵称间距 */
.func .user .spacing {
  padding: 0 8px 0 8px;
}

.func .user:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.025);
}

/** 自定义下拉框item选中后的颜色 */
.menu ::v-deep .item:hover{
  background: #E6F7FF !important;
}

/** 下拉图标位置右移10px */
.menu ::v-deep .item svg {
  margin-right: 10px;
}
</style>