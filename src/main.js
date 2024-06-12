import { createApp } from 'vue'
import App from './App.vue'

// 引入路由器配配置
import router from './router/router-generate.js'
// 引入vuex相关
import store from './store/index.js'
// 引入Ant-design-vue相关
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// 导入Ant-design-vue所有icon
import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App)
// 使用路由器插件
app.use(router)
// 使用vuex插件
app.use(store)
// 引入Ant-design-vue插件
app.use(Antd)
// 一次性引入所有Ant-design-vue所有icons图标
for(const antIcon in antIcons) {
  app.component(antIcon, antIcons[antIcon])
}

// 挂载容器
app.mount('#app')
