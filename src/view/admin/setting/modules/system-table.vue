<template>
  <a-table :columns="data.columns" :data-source="data.confs" :row-key="(record) => record.id" size="small" bordered :pagination="data.pagination" @change="methods.handleTableChange" :loading="data.loading">
    <template #headerCell="{ column }">
      <template v-if="column.dataIndex === 'id'">
        <a-button class="add" size="small" type="primary" shape="circle" ghost @click.stop="methods.showModal()"><plus-outlined /></a-button>ID
      </template>
    </template>
    
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input ref="searchInput" :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px" @click="methods.handleSearch(selectedKeys, confirm, column.dataIndex)">
          <template #icon><SearchOutlined /></template>确定
        </a-button>
        <a-button size="small" style="width: 90px" @click="methods.handleReset(clearFilters)">重置</a-button>
      </div>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span>
            <a @click="methods.showModal(record.id)">编 辑</a>
            <a-popconfirm title="确定删除此分类吗？" @confirm="methods.deleteConfById(record.id)">
              <template #icon><question-circle-outlined style="color: red" /></template>
              <a style="color: red">删 除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
  <system-form ref="systemFormRef" @flush="methods.getConfList"/>
</template>

<script setup>
import systemForm from '@/view/admin/setting/modules/system-form.vue'

import { ref, reactive, onMounted } from 'vue';

import dayjs from 'dayjs'

import { getConfListAPI, deleteConfByIdAPI } from '@/api/admin/setting.js'

const searchInput = ref()
const systemFormRef = ref()

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
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: '10%',
      sorter: true
    }, 
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: '20%',
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
      title: '编码',
      dataIndex: 'code',
      align: 'center',
      width: '20%',
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
      title: '更新日期',
      dataIndex: 'modifiedTime',
      align: 'center',
      width: '20%',
      sorter: true,
      customRender({text}) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '处理人',
      dataIndex: ['user', 'nickname'],
      align: 'center',
      width: '15%',
      customFilterDropdown: true,
      onFilter: (value, record) => {
        record.user.nickname.toString().toLowerCase().includes(value.toLowerCase())
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus()
          }, 100);
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
    }
  ],
  confs: []
})

const methods = {
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
    methods.getConfList()
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
  getConfList: () => {
    getConfListAPI({current: data.pagination.current, pageSize: data.pagination.pageSize,  ...data.queryCustom}).then(response => {
      data.confs = response.data.confs
      data.pagination.total = response.data.total
      data.loading = false
    }, error => {
      console.log(error)
    })
  },
  deleteConfById: (id) => {
    deleteConfByIdAPI(id).then(response => {
      console.log(response)
      methods.getConfList()
    }, error => {
      console.log(error)
    })
  },
  showModal: (id) => {
    systemFormRef.value.methods.showModal(id)
  }
}

onMounted(
  () => {
    methods.getConfList()
  }
)
</script>

<style scoped>
.add {
  z-index: auto;
  cursor: pointer;
  float: left;
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>