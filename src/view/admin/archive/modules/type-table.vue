<template>
  <a-table :columns="data.columns" :data-source="data.types" :row-key="(record) => record.id" size="small" bordered style="margin-top: 10px;" :pagination="data.pagination" @change="methods.handleTableChange" :loading="data.loading" >
    <template #headerCell="{ column }">
      <template v-if="column.dataIndex === 'id'">
        <a-button class="add" size="small" type="primary" shape="circle" ghost @click.stop="typeFormRef.data.open = true"><plus-outlined /></a-button>ID
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
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>

    <template #bodyCell="{ column, text, record }">
      <!-- 控制可编辑列 -->
      <template v-if="['label'].includes(column.dataIndex)">
        <div>
          <a-input v-if="data.editableData[record.id]" v-model:value="data.editableData[record.id][column.dataIndex]" style="margin: -5px 0" />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="data.editableData[record.id]">
            <a-typography-link @click="methods.save(record.id)">保 存</a-typography-link>
            <a-popconfirm title="是 否 确 定 取 消?" @confirm="methods.cancel(record.id)"><a>取 消</a></a-popconfirm>
          </span>
          <span v-else>
            <a @click="methods.edit(record.id)">编 辑</a>
            <a-popconfirm title="确定删除此分类吗？" @confirm="methods.deleteTypeById(record.id)">
              <template #icon><question-circle-outlined style="color: red" /></template>
              <a>删 除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
  <type-form ref="typeFormRef" @flush="methods.getTypeList" />
</template>

<script setup>
import typeForm from '@/view/admin/archive/modules/type-form.vue'

import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

import { cloneDeep } from 'lodash-es'
import dayjs from 'dayjs'

import { getTypeListAPI, deleteTypeByIdAPI, updateTypeByIdAPI } from '@/api/admin/archive.js'

const store = useStore()

const searchInput = ref()
const typeFormRef = ref()

const data = reactive({
  state: {
    searchText: '',
    searchedColumn: ''
  },
  editableData: {},
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
      width: '15%',
      sorter: true
    }, 
    {
      title: '分类',
      dataIndex: 'label',
      align: 'center',
      width: '30%',
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
      width: '20%',
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
  types: []
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
    methods.getTypeList()
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
  edit: (id) => {
    data.editableData[id] = cloneDeep(data.types.filter(item => id === item.id)[0])
  },
  save: (id) => {
    // 后台检验更新修改后的数据
    methods.updateTypeById(id, {id: id, label: data.editableData[id]['label']})
  },
  cancel: (id) => {
    delete data.editableData[id]
  },
  getTypeList: () => {
    getTypeListAPI({current: data.pagination.current, pageSize: data.pagination.pageSize,  ...data.queryCustom}).then(response => {
      data.types = response.data.types
      data.pagination.total = response.data.total
      data.loading = false
    }, error => {
      console.log(error)
    })
  },
  updateTypeById: (id, type) => {
    updateTypeByIdAPI(id, type).then(() => {
      // 将表格中的处理人改为当前用户
      data.editableData[id].user.nickname = store.state.user.nickname
      // 更新表格数据
      Object.assign(data.types.filter(item => id === item.id)[0], data.editableData[id])
      // 删除编辑数据
      delete data.editableData[id]
    }, error => {
      console.log(error)
    })
  },
  deleteTypeById: (id) => {
    deleteTypeByIdAPI(id).then(response => {
      console.log(response)
      methods.getTypeList()
    }, error => {
      console.log(error)
    })
  },
  addType: () => {
    typeFormRef.value.data.open = true
  }
}

onMounted(
  () => {
    methods.getTypeList()
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