<template>
  <a-row :gutter="16">
    <!-- 左侧文章导航 -->
    <a-col :span="5">
      <a-card class="articles">
        <a-collapse ghost>
          <a-collapse-panel key="1">
            <template #header><b>草 稿 箱</b></template>
            <template #extra><span class="clear" @click.stop="methods.clearClick">清空</span></template>
            <a-row :class="'row'+ (data.selectBlogId===draftBlog.id ? ' select ?' : '')" v-for="draftBlog in data.draftBlogs" :key="draftBlog.id" @click="methods.getBlogDetailById(draftBlog.id)">
              <a-col :span=20 class="left">
                <div class="title"> 
                  <a-popover placement="right">
                    <template #content><span>{{ draftBlog.title }}</span></template>
                    <span>{{ draftBlog.title }}</span>
                  </a-popover>
                </div>
              </a-col>
              <a-col :span=4 class="right">
                <a-popconfirm title="确定删除此博客吗？" @confirm="methods.deleteConfirm(draftBlog.id)">
                  <delete-outlined class="delete" />
                </a-popconfirm>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel key="2">
            <template #header><b>已 发 布</b></template>
            <!-- <template #extra><span class="clear">清空</span></template> -->
            <a-row  v-for="publishBlog in data.publishBlogs" :key="publishBlog.id" :class="'row'+ (data.selectBlogId===publishBlog.id ? ' select ?' : '')" @click="methods.getBlogDetailById(publishBlog.id)">
              <a-col :span=20 class="left">
                <div class="title"> 
                  <a-popover placement="right">
                    <template #content><span>{{ publishBlog.title }}</span></template>
                    <span>{{ publishBlog.title }}</span>
                  </a-popover>
                </div>
              </a-col>
              <a-col :span=4 class="right">
                <a-popconfirm title="确定删除此博客吗？" @confirm="methods.deleteConfirm(publishBlog.id)">
                  <delete-outlined class="delete" />
                </a-popconfirm>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </a-col>
    
    <!-- 右侧文章列表 -->
    <a-col :span="19">
      <blog-edit ref="blogEditRef" :blogForm="data.blogForm" v-if="data.step === 1" />
      <blog-settings ref="blogSettingsRef" :blogForm="data.blogForm" v-if="data.step === 2" />
      <!-- 右侧底部交互按钮 -->
      <a-card class="bottom">
        <a-button class="left" v-if="data.step !== 1" @click="methods.previousStep">上一步</a-button>
        <a-button class="right" v-if="data.step === 1" @click="methods.nextStep">下一步</a-button>
        <a-button class="right" v-if="data.step === 2" type="primary" @click="methods.submit">提 交</a-button>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import BlogEdit from '@/view/admin/blog/modules/blog-edit.vue'
import BlogSettings from '@/view/admin/blog/modules/blog-settings.vue'

import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

import { message, Modal, notification, } from 'ant-design-vue'

import { getBlogListAPI, getBlogDetailByIdAPI, updateBlogByIdAPI, addBlogAPI, deleteBlogByIdAPI } from '@/api/admin/blog.js'

const store = useStore()
const blogEditRef = ref()
const blogSettingsRef = ref()

const data = reactive({
  // 左侧博客导航
  selectBlogId: null,
  draftBlogs: [],
  publishBlogs: [],
  // 文章发布步骤
  step: 1,
  // 博客字段
  blogForm: {
    id: null,
    flag: null,
    title: '',
    editor: 1,
    content: '',
    typeId: null,
    isPublished: true,
    isAnon: false,
    isRecommend: true,
    isCopyright: true,
    isReward: false,
    isComment: false,
    description: '',
    cover: ''
  }
})

const methods = reactive({
  clearClick: () => {
    Modal.confirm({
      title: '温 馨 提 示',
      content: '确认要清空草稿箱吗？无法恢复，请谨慎处理！',
      onOk() {
        console.log('1232')
      }
    })
  },
  deleteConfirm: (id) => {
    methods.deleteBlogById(id)
    data.draftBlogs.splice(data.draftBlogs.findIndex(item => item.id == id), 1)
    data.publishBlogs.splice(data.publishBlogs.findIndex(item => item.id == id), 1)
  },
  // 校验并同步blogEdit的数据
  checkBlogEdit: () => {
    const blogEditForm = blogEditRef.value.data.blogEditForm
    if (!blogEditForm.flag) {
      message.warning('请选择文章类型')
    } else if (!blogEditForm.title) {
      message.warning('请输入文章标题')
    } else if (!blogEditForm.content) {
      message.warning('请输入文章内容')
    } else {
      // 校验通过，同步数据
      data.blogForm.flag = blogEditForm.flag
      data.blogForm.title = blogEditForm.title
      data.blogForm.editor = blogEditForm.editor
      data.blogForm.content = blogEditForm.content
      return true
    }
    return false
  },
  // 校验并同步blogSettings的数据
  checkBlogSettings: () => {
    const blogSettingsForm = blogSettingsRef.value.data.blogSettingsForm
    if (!blogSettingsForm.typeId) {
      notification.warning({
        message: '请选择文章分类',
        description: '请在左侧点击下拉框，选择文章所属类别！'
      })
    } else if (!blogSettingsForm.description) {
      notification.warning({
        message: '请输入文章描述',
        description: '请在左侧输入文章简述，描述文章大致内容！'
      })
    } else {
      // 校验通过，同步数据
      data.blogForm.flag = blogSettingsForm.flag
      data.blogForm.typeId = blogSettingsForm.typeId
      data.blogForm.isPublished = blogSettingsForm.isPublished
      data.blogForm.isAnon = blogSettingsForm.isAnon
      data.blogForm.isRecommend = blogSettingsForm.isRecommend
      data.blogForm.isCopyright = blogSettingsForm.isCopyright
      data.blogForm.isReward = blogSettingsForm.isReward
      data.blogForm.isComment = blogSettingsForm.isComment
      data.blogForm.description = blogSettingsForm.description
      data.blogForm.cover = blogSettingsForm.cover
      return true
    }
    return false
  },
  // 上一步
  previousStep: () => {
    if (methods.checkBlogSettings()) {
      data.step--
    }
  },
  // 下一步
  nextStep: () => {
    if (methods.checkBlogEdit()) {
      data.step++
    }
  },
  submit: () => {
    if (methods.checkBlogSettings()) {
      // 判断是否含有id
      if (data.blogForm.id) {
        methods.updateBlogById(data.blogForm.id, data.blogForm)
      } else {
        methods.addBlog(data.blogForm)
      }
    }
  },
  addBlog: (blog) => {
    addBlogAPI(blog).then(() => {
      console.log('111')
    }, error => {
      console.log(error)
    })
  },
  updateBlogById: (id, blog) => {
    updateBlogByIdAPI(id, blog).then(() => {
      console.log('aaa')
    }, error => {
      console.log(error)
    })
  },
  deleteBlogById: (id) => {
    deleteBlogByIdAPI(id).then(() => {
      console.log("删除操作")
    }, error => {
      console.log(error)
    })
  },
  getBlogList: () => {
    getBlogListAPI().then(response => {
      response.data.blogs.forEach((blog) => {
        if (blog.isPublished) {
          data.publishBlogs.push(blog)
        } else {
          data.draftBlogs.push(blog)
        }
      })
    }, error => {
      console.log(error)
    })
  },
  getBlogDetailById: (id) => {
    getBlogDetailByIdAPI(id).then(response => {
      // data.blogForm = response.data.blog
      data.selectBlogId = response.data.blog.id
      Object.assign(data.blogForm, response.data.blog)
      console.log(data.blogForm)
    }, error => {
      console.log(error)
    })
  },
  checkIsBlogId: () => {
    let id = store.state.blog.blogId
    if (id) {
      methods.getBlogDetailById(id)
      // 防止非从编博客辑过来直接查询
      store.dispatch('releaseBlogId')
    }
  }
})

onMounted(
  () => {
    methods.getBlogList()
    methods.checkIsBlogId()
  }
)
</script>

<style scoped>
/* 保持左侧文章目录高度和右侧文章块高度一致 */
.articles {
  height: 100%;
}

.articles ::v-deep .ant-card-body {
  padding: 10px !important;
}

/* 底部样式 */
.bottom {
  margin-top: 10px;
}

.bottom .left {
  float: left
}

.bottom .right {
  float: right
}

/** 左侧文章目录样式 */
.articles .clear {
  font-size: 12px;
  color:#1b1c1e;
  padding-right: 1em;
}

.articles .clear:hover {
  color: red;
}

.articles .row {
  line-height: 28px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 0 5px 0;
}

.articles .select {
  background: #EDEDED;
}

.articles .row:hover {
  background: #EDEDED;
}

.articles .title {
  text-align:left;
}

.articles .left .title {
  width: 140px;
  padding-left: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.articles .right {
  text-align:right;
  padding-right: 1em;
}

.articles .right .delete:hover {
  color: red;
}
</style>