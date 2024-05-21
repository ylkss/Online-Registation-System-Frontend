<script setup>
import {onMounted, reactive, ref} from "vue";
import {getAdminTestList} from "@/net/admin/test/index.js";
import router from "@/router/index.js";

const options = [
  {
    value: 'province',
    label: '省份'
  },
  {
    value: 'testName',
    label: '测试站点名称'
  },
  {
    value: 'location',
    label: '考试地点'
  },
]

const searchForm = reactive({
  condition: '',
  keyword: '',
  pageNum: 1,
  pageSize: 8
})

const showTable = ref(false)

const tableData = reactive({
  rows: [],
  total: 0
})

const handleSearch = () => {
  // 重置分页
  searchForm.pageNum = 1
  const params = {
    [searchForm.condition]: searchForm.keyword,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  getAdminTestList(params, (data) => {
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
  getAdminTestList(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
  })
}

const handleToRegisterList = (item) => {
  router.push({path: '/admin/register/list', query: {testId: item.id}})
}

onMounted(() => {
  const params = {
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  getAdminTestList(params, (data) => {
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
        <el-text type="info">报名人员管理</el-text>
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
      </div>
      <div v-show="showTable" class="data-table">
        <div style="display: flex;justify-content: space-between;flex-wrap: wrap">
          <el-card class="test-card" v-for="item in tableData.rows">
            <el-text type="info">{{ item.name }}</el-text><el-divider/>
            <el-text type="info">测试地点： {{ item.location }}</el-text><br/>
            <el-text type="info">考试省份： {{ item.province }}</el-text><br>
            <el-text type="info">考试时间： {{ item.testTime }}</el-text><br>
            <el-text type="info">报名人数： {{ item.registerNum }}</el-text><el-divider/>
            <el-button @click="handleToRegisterList(item)" :disabled="item.registerNum === 0" type="primary">管理报名人员</el-button>
          </el-card>
        </div>
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

  .test-card{
    width: 20%;
    margin-left: 10px;
    margin-top: 10px;
    min-height: 300px;
  }

  .data-table-pagination{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>