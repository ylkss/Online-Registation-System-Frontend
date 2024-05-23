<script setup>
import {onMounted, reactive, ref} from "vue";
import {deleteTestNotice, getTestNotices} from "@/net/admin/testNotice/index.js";
import router from "@/router/index.js";

const options = [
  {
    value: 'title',
    label: '标题'
  },
  {
    value: 'content',
    label: '内容'
  },
]

const searchForm = reactive({
  condition: '',
  keyword: '',
  pageNum: 1,
  pageSize: 10
})

const tableData = reactive({
  rows: [],
  total: 0
})

const showTable = ref(false)

const handleSearch = () => {
  // 重置分页
  searchForm.pageNum = 1
  const params = {
    [searchForm.condition]: searchForm.keyword,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  getTestNotices(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
  })
}

const handlePageChange = (val) => {
  searchForm.pageNum = val
  const params = {
    [searchForm.condition]: searchForm.keyword,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  if(val===null){
    return
  }
  getTestNotices(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
  })
}

const handleAddNewTestNotice = () => {
  router.push({path: '/admin/testNotice/add'})
}

const handleDeleteTestNotice = (row) => {
  deleteTestNotice(row.id, () => {
    const params = {
      pageNum: searchForm.pageNum,
      pageSize: searchForm.pageSize
    }
    getTestNotices(params, (data) => {
      tableData.rows = data.rows
      tableData.total = data.total
    })
  })
}

onMounted(() => {
  const params = {
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  getTestNotices(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
    showTable.value = true
  })
})
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="height: calc(100vh - 65px); width: 100%">
      <div class="header">
        <el-text type="info">测试公告管理</el-text>
      </div>
      <div class="interaction-item">
        <div class="search-item">
          <el-form :model="searchForm" style="display: flex;margin-top: 12px">
            <el-form-item>
              <el-select
                  v-model="searchForm.condition"
                  placeholder="选择搜索条件"
                  size="large"
                  style="width: 160px"
              >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-input
                placeholder="请输入搜索关键字"
                v-model="searchForm.keyword"
                style="width: 240px; height: 40px;margin-left: 20px">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button @click="handleSearch" style="height: 40px;margin-left: 20px" type="primary">搜索</el-button>
          </el-form>

        </div>
        <div class="add-item">
          <el-button @click="handleAddNewTestNotice" type="primary">新增通知</el-button>
        </div>
      </div>
      <div v-if="showTable" class="data-table">
        <el-table :data="tableData.rows" stripe style="width: 100%">
          <el-table-column prop="id" label="测试通知id" width="280" />
          <el-table-column prop="title" label="测试通知标题" width="280" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="isDelete" label="是否删除">
            <template #default="{ row }">
              <span :style="{ color: row.isDelete === 0 ? '#79bbff' : '#F56C6C' }">
                {{ row.isDelete === 1 ? '已删除' : '未删除' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="200">
            <template #default="{ row }">
              <el-button link @click="handleDeleteTestNotice(row)" type="danger" size="small">删除</el-button>
              <el-button @click="router.push({path: '/admin/testNotice/add', query: { id: row.id }})" link type="primary" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="data-table-pagination">
          <el-pagination
              layout="prev, pager, next"
              :page-size="searchForm.pageSize"
              :total="tableData.total"
              @current-change="handlePageChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.header{
  height: 70px;
  background-color: #f5f7fa;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);

  .el-text{
    font-size: 40px;
    font-weight: 500;
  }
}

.interaction-item{
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);

  .search-item{
    width: 50%;
  }

  .add-item{
    width: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.data-table{
  height: calc(100vh - 195px);
  background-color: #f5f7fa;
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);

  .data-table-pagination{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>