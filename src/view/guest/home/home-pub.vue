<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <a-card title="最新发布" class="blog bottom">
        <a-list item-layout="vertical" size="small" :data-source="data.blogList">
          <template #renderItem="{ item }">
            <a-list-item key="item.id">
              <template #actions>
                <span><UserOutlined class="interval" />{{ item.user.nickname }}</span>
                <span><TagOutlined class="interval" />{{ item.type.label }}</span>
                <span><EyeOutlined class="interval" />{{ item.view }}</span>
                <span><LikeOutlined class="interval" />{{ item.thumb }}</span>
                <span><CommentOutlined class="interval" />0</span>
                <span><CalendarOutlined class="interval" />{{dateFormat(item.createdTime)}}</span>
              </template>
              <template #extra>
                <img-action :width="'200px'" :height="'150px'" :action="true" :dimension="'width'" :url="item.cover" />
              </template>
              <a-list-item-meta :description="item.description" style="height:112px;">
                <template #title>
                  <router-link target='_blank' :to="{name: 'guest-blog', params: {id: item.id}}">{{ item.title }}</router-link>
                </template>
                <template #avatar><a-avatar :src="item.user.avatar" /></template>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </template>
        </a-list>
      </a-card>
      <a-card size="small" class="pagination">
        <a-pagination
          v-model:current="data.pagination.current" 
          :pageSize="data.pagination.pageSize" 
          :total="data.pagination.total" 
          :show-total="total => `共 ${total} 条博客`" 
          show-less-items
          @change="methods.onChange"
        />
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Coding轨迹" class="trace bottom">
        <a-timeline mode="alternate">
          <a-timeline-item position="right">
            <span class="coding">2024.11.14 完善一下前端博客详情页数据渲染，新增点赞交互功能，完善路由跳转，新增404页面</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2024.11.13 后端新增异步方法，处理浏览和点赞数据自增，并完成接口开发</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.11.12 前端实现一个简易的“关于我”页面，后续更新重做</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.11.11 再次调研免费图床，将图床改为gitee，绕过gitee图片防盗链保护，解决github图片无代理打不开问题</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2024.11.01 开发前端前台首页所依赖的各种接口，及主页各种配置，并逐步设计主页每个模块的样式及填充内容 </span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.10.07 完成前端前台网站名，站点声明，公众号，版权声明等内容从后端加载，站点正式命名为“雅俗共赏”</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.09.25 进行前端博客条目的组件开发</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.09.25 完成前端设置页面交互的开发，完成博客详情页面开发，解决rich和markdown编辑器渲染问题及代码高亮</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2024.09.01 完成前台博客详情页依赖接口开发，确定新增设置模块，及设置相关接口开发。</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.8.25 构建主页轮廓，思考模块内容，开发博客详情页页面。</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.08.15 开始前端前台界面的设计开发，包括区分前后台导航，前台主页及前台博客详情页页面开发</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.07.15 调研前端前台页面样式</span>
          </a-timeline-item>
          <a-timeline-item position="right" color="green">
            <template #dot><EditOutlined /></template>
            <span class="coding">2024.06.19 发布第一篇博客</span>
          </a-timeline-item>
          <a-timeline-item position="right" color="green">
            <template #dot><CheckCircleOutlined /></template>
            <span class="coding">2024.06.15 登录云服务器，安装前端依赖环境，上线前端项目</span>
          </a-timeline-item>
          <a-timeline-item position="left" color="green">
            <template #dot><CheckCircleOutlined /></template>
            <span class="coding">2024.06.13 登录云服务器，安装后端依赖环境，上线后端项目，解决开发、生产环境区分问题，部署后端服务</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.05.31 前端登录页添加验证码输入及校验交互</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2024.05.28 后端完成登录验证码校验功能</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.05.24 开发前端博客详情页，解决rich和markdown编辑器内容渲染问题，代码高亮等问题</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2024.03.13 调研免费图床，最终使用gihub作为图床，解决编辑器图片上传问题</span>
          </a-timeline-item>
          <a-timeline-item position="left" color="red">
            <template #dot><ClockCircleOutlined /></template>
            <span class="coding">2023.07-2024.01 摸鱼半年无任何开发进度</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2023.06.06 完成博客操作、分类操作、登录等接口开发</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2023.04.13 完成动态路由，博客编辑页面，分类配置页面，登录页开发及路由拦截等功能开发，及rich和markdown编辑器的集成，封装axios等。</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <span class="coding">2023.03.01 设计前端后台样式的基本布局，包括左侧导航栏，上方功能栏，面包屑等样式</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <span class="coding">2022.10.03 完成登录认证系统，未认证接口访问的拦截</span>
          </a-timeline-item>
          <a-timeline-item position="left">
            <template #dot><DatabaseOutlined /></template>
            <span class="coding">2022.09.17 创建blog后端项目，搭建后端框架</span>
          </a-timeline-item>
          <a-timeline-item position="right">
            <template #dot><LaptopOutlined /></template>
            <span class="coding">2022.09.15 创建blog前端项目，搭建前端框架</span>
          </a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>
  </a-row>
  
  </template>
  <script setup>
  import ImgAction from '@/components/modules/img-action.vue'

  import { reactive, onMounted } from 'vue'
  import { getBlogListAPI } from '@/api/guest/blog.js'
  import { dateFormat } from '@/utils/helper.js'

  const data = reactive({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 5
    },
    blogList: []
  })

  const methods = reactive({
    onChange: () => {
      methods.getBlogList()
    },
    getBlogList: () => {
      const params = {
        current: data.pagination.current,
        pageSize: data.pagination.pageSize,
        sorter: "-createdTime"
      }
      getBlogListAPI(params).then(response => {
        data.blogList = response.data.blogs
        data.pagination.total = response.data.total
      })
    }
  })

  onMounted(
    () => {
      methods.getBlogList()
    }
  )
  </script>

<style scoped>
.bottom {
  padding-bottom: 24px;
}

.blog ::v-deep .ant-card-body {
  height: 585px;
  overflow: scroll;
  scrollbar-width: none;
}

.blog span .interval {
  margin-right: 8px;
}

.trace ::v-deep .ant-card-body {
  height: 652px;
  overflow: scroll;
  scrollbar-width: none;
}

.trace .coding {
  word-break: break-all;
  font-size: 13px;
}

.pagination {
  margin-top: 10px;
  text-align: right;
}

.ant-card {
  border-radius: 0px;
}

.trace ::v-deep .ant-timeline-item-content {
  text-align: start !important;
}
</style>