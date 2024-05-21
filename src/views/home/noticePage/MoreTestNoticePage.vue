<script setup>
import {onMounted, reactive, ref} from "vue";
import {getTestNoticeList} from "@/net/userApi/testNotice/index.js";
import router from "@/router/index.js";

const options = [
  {
    value: 'title',
    label: '标题'
  },
  {
    value: 'content',
    label: '正文'
  }
]

const searchForm = reactive({
  condition: '',
  keyword: '',
  pageNum: 1,
  pageSize: 8
})

const tableData = reactive({
  rows: [],
  total: 0
})
const showTestNotices = ref(false)

const handleGetTestNotice = (form) => {
  getTestNoticeList(form, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
    showTestNotices.value = true
  })
}

const handleSearch = () => {
  // 重置分页
  searchForm.pageNum = 1
  const params = {
    [searchForm.condition]: searchForm.keyword,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  handleGetTestNotice(params)
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
  handleGetTestNotice(params)
}

onMounted(() => {
  handleGetTestNotice(searchForm)
})
</script>

<template>
  <div class="testNotice-list">
    <div class="list-content">
      <div class="header">
        <el-text type="info">测试通知列表</el-text>
      </div>
      <div class="search-item">
        <el-form :model="searchForm" style="display: flex;margin-top: 12px">
          <el-form-item>
            <el-select
                v-model="searchForm.condition"
                placeholder="请先选择搜索条件"
                size="large"
                style="width: 200px"
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
              style="width: 380px; height: 40px;margin-left: 20px">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form>
        <el-button @click="handleSearch" style="height: 40px;margin-left: 20px" type="primary">搜索</el-button>
      </div>
      <el-card v-show="showTestNotices"
               v-for="item in tableData.rows"
               class="hover-cursor"
               @click="router.push({ path:'/test-notice', query: { id: item.id } })"
               style="margin-top: 10px" body-style="padding: 0">
        <div class="list-item">
          <div class="title">
            <el-text>{{ item.title }}</el-text>
          </div>
          <div class="time">
            <el-text>{{ item.formattedCreateTime }}</el-text>
          </div>
        </div>
      </el-card>
      <div style="display: flex;justify-content: center;margin-top: 20px">
        <div class="data-table-pagination">
          <el-pagination
              layout="prev, pager, next"
              :page-size="searchForm.pageSize"
              :total="tableData.total"
              @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-cursor:hover {
  cursor: pointer;
}
.testNotice-list{
  width: 100%;
  height: 100%;

  .list-content{
    width: 100%;
    min-height: 767px;
    padding: 20px;

    .header{
      height: 70px;
      background-color: #f5f7fa;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-text{
        font-size: 40px;
        font-weight: 500;
      }
    }

    .search-item{
      height: 50px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      justify-content: space-between;
    }

    .list-item{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .title{
        width: 80%;
        display: flex;
        align-items: center;
      }

      .time{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .el-text{
        font-size: 20px;
      }
    }
  }
}
</style>