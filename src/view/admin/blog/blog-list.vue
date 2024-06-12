<template>
<a-card>
  <a-button type="primary" size="small" @click="methods.add()">
    <template #icon><plus-outlined /></template>新 增
  </a-button>
  <a-input-search class="search" placeholder="模糊搜索" style="width: " />
</a-card>

<a-card class="interval">
  <a-table :columns="data.columns" :data-source="data.blogs" :row-key="(record) => record.id" size="small" bordered :customRow="data.customRow" :pagination="data.pagination" :loading="data.loading" @change="methods.handleTableChange" >
    <template #headerCell="{ column }">
      <template v-if="column.dataIndex === 'id'">
        <a-button class="add" size="small" type="primary" shape="circle" ghost @click.stop="methods.add()"><plus-outlined /></a-button>ID
      </template>
    </template>

    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input ref="searchInput" :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="methods.handleSearch(selectedKeys, confirm, column.dataIndex)" />
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px" @click="methods.handleSearch(selectedKeys, confirm, column.dataIndex)">
          <template #icon><SearchOutlined /></template>确定
        </a-button>
        <a-button size="small" style="width: 90px" @click="methods.handleReset(clearFilters)">重置</a-button>
      </div>
    </template>
    <!-- <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template> -->

    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'isPublished'">
        <a-switch :checked="record.isPublished" checked-children="发布" un-checked-children="草稿" @change="methods.isPublishChange(record)"/>
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <a-button class="operation" size="small" type="primary" ghost @click="methods.edit(record.id)">编辑</a-button>
        <a-button class="operation" size="small" type="primary" danger>删除</a-button>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <a-card :bordered="false" style="text-indent: 2em;letter-spacing:2px;line-height: 30px;color: grey">
        <div>{{ record.description }}qweqweqwewqeqweqweqwewqeqweqweqweqweqweqweqwsadfs手动阀手动阀手动阀撒旦撒旦请问大师反对佛挡杀佛即可获得爱上凤凰的萨芬打开回复健康大使即可收到回复喀什雕刻技法的健康eqweqweqw</div>
      </a-card>
    </template>
  </a-table>
  </a-card>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import dayjs from 'dayjs'

import { getBlogListAPI, updateBlogByIdAPI } from '@/api/admin/blog.js'
import { formatFilter, BLOG_FLAG, BLOG_FLAG_COLOR, BLOG_STATUS } from '@/constants/index.js'

const store = useStore()
const router = useRouter()

const searchInput = ref()

const data = reactive({
  state: {
    searchText: '',
    searchedColumn: ''
  },
  pagination: {
    showTotal: (total) => `共 ${total} 条数据`,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showQuickJumper: true,
    onShowSizeChange: (current, pageSize) => { data.pagination.pageSize = pageSize },
    current: 1
  },
  // 存储全局查询条件
  queryCustom: {

  },
  loading: false,
  customRow: (record) => {
    console.log(record)
    return {
      onclick: (event) => {
        console.log(event)
      }
    }
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    }, 
    {
      title: '类型',
      dataIndex: 'flag',
      align: 'center',
      filters: formatFilter(BLOG_FLAG),
      filterMultiple: false,
      customRender({text}) {
        return <a-tag color={BLOG_FLAG_COLOR[text]}>{BLOG_FLAG[text]}</a-tag>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus()
          }, 0)
        }
      },
    }, 
    {
      title: '分类',
      dataIndex: ['type', 'label'],
      align: 'center'
    }, 
    {
      title: '状态',
      dataIndex: 'isPublished',
      align: 'center',
      filters: formatFilter(BLOG_STATUS),
      flterMultiple: false
    }, 
    {
      title: '更新日期',
      dataIndex: 'modifiedTime',
      align: 'center',
      sorter: true,
      customRender({text}) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    }, 
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
    }
  ],
  blogs: []
})

const methods = reactive({
  handleTableChange: (pagination, filters, sorter) => {
    data.loading = true
    if (pagination) {
      data.pagination = pagination
    }
    const filterDic = {}
    if (filters) {
      for (const item in filters) {
        if (filters[item]) {
          filterDic[item] = filters[item][0]
        } else {
          continue
        }
      }
    }
    const sorterDic = {}
    if (sorter && Object.keys(sorter).length !== 0) {
      sorterDic['sorter'] = `${sorter.order === 'ascend' ? '': '-'}` + sorter.field
    }

    // 将表格中局部查询条件保存到全局变量中
    data.queryCustom = {...filterDic, ...sorterDic}
    methods.getBlogList()
  },
  handleSearch: (selectedKeys, confirm, dataIndex) => {
    confirm()
    data.state.searchText = selectedKeys[0]
    data.state.searchedColumn = dataIndex
  },
  handleReset: (clearFilters) => {
    clearFilters({ confirm: true })
    data.state.searchText = ''
  },
  isPublishChange: (record) => {
    record.isPublished = !record.isPublished
    methods.updateBlogById(record.id, { isPublished: record.isPublished })
  },
  getBlogList: () => {
    getBlogListAPI({current: data.pagination.current, pageSize: data.pagination.pageSize,  ...data.queryCustom}).then(response => {
      data.blogs = response.data.blogs
      data.pagination.total = response.data.total
      data.loading = false
    }, error => {
      console.log(error)
    })
  },
  updateBlogById: (id, data) => {
    updateBlogByIdAPI(id, data).then(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  },
  edit: (id) => {
    store.dispatch('cacheBlogId', id)
    router.push({ name: 'admin-blog-artical-write' })
  },
  add: () => {
    router.push({ name: 'admin-blog-artical-write' })
  }
})

onMounted(
  () => {
    methods.getBlogList()
  }
)
</script>

<style scoped>
.search {
  width: 240px;
  float: right;
}

.interval {
  margin-top: 10px;
}

.add {
  z-index: auto;
  cursor: pointer;
  float: left;
}

.editable-row-operations span {
  margin-right: 18px;
}

.operation {
  margin: 0 5px 0 5px;
}
</style>