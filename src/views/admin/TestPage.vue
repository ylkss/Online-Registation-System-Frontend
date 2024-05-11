<script setup>

import {onMounted, reactive, ref} from "vue";
import {addTest, getAdminTestList} from "@/net/admin/test/index.js";

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


const provinces = [
  "北京", "天津", "山西", "河北",
  "内蒙古", "辽宁", "吉林", "黑龙江",
  "上海", "江苏", "浙江", "安徽",
  "福建", "江西", "山东", "河南",
  "湖北", "湖南", "广东", "广西",
  "海南", "重庆", "四川", "贵州",
  "云南", "西藏", "陕西", "甘肃",
  "青海", "宁夏", "新疆", "新疆兵团"
];

const provincesOptions = provinces.map(province => ({
  value: province,
  label: province
}));
const testAddDialogShow = ref(false)
const NewTest = ref(false)
const testAddForm = reactive({
  name: '',
  location: '',
  province: '',
  maxNum: '',
  notice: '',
  registerTime: '',
  testTime: ''
})
const handleNewTestRequest = () => {
  addTest(testAddForm, () => {
    testAddDialogShow.value = false
    const params = {
      pageNum: searchForm.pageNum,
      pageSize: searchForm.pageSize
    }
    getAdminTestList(params, (data) => {
      tableData.rows = data.rows
      tableData.total = data.total
    })
  })
}
const handleShowAddNewTestDialog = () => {
  // 清空表单
  NewTest.value = true
  testAddForm.name = ''
  testAddForm.location = ''
  testAddForm.province = ''
  testAddForm.maxNum = ''
  testAddForm.notice = ''
  testAddForm.registerTime = ''
  testAddForm.testTime = ''
  testAddDialogShow.value = true
}
const handleAddTestSessions = (row) => {
  testAddDialogShow.value = true
  NewTest.value = false
  testAddForm.name = row.name
  testAddForm.location = row.location
  testAddForm.province = row.province
  testAddForm.maxNum = row.maxNum
  testAddForm.notice = row.notice
  testAddForm.registerTime = ''
  testAddForm.testTime = ''
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
        <el-text type="info">测试管理</el-text>
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
          <el-button @click="handleShowAddNewTestDialog" type="primary">新增测试</el-button>
        </div>
      </div>
      <div v-if="showTable" class="data-table">
        <el-table :data="tableData.rows" stripe style="width: 100%">
          <el-table-column prop="name" label="测试站名称" width="280" />
          <el-table-column prop="location" label="测试地点" width="280" />
          <el-table-column prop="province" label="考试省份" />
          <el-table-column prop="maxNum" label="最大考试人数" />
          <el-table-column prop="registerNum" label="当前报考人数" />
          <el-table-column prop="hasTestRoom" label="是否安排考场">
            <template #default="{ row }">
              <span :style="{ color: row.hasTestRoom ? '#79bbff' : '#F56C6C' }">
                {{ row.hasTestRoom ? '已安排' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="registerTime" label="开始报名时间" />
          <el-table-column prop="testTime" label="测试时间" />
          <el-table-column fixed="right" label="Operations" width="200">
            <template #default="{ row }">
              <el-button link type="danger" size="small">删除</el-button>
              <el-button link type="primary" size="small">修改</el-button>
              <el-button @click="handleAddTestSessions(row)" link type="primary" size="small">增加场次</el-button>
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
  <el-dialog v-model="testAddDialogShow" title="新增测试">
    <el-form>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>测试站名称:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="testAddForm.name" placeholder="请输入测试站名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>测试地点:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="testAddForm.location" placeholder="请输入测试地点"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>考试省份:</el-text>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select
                v-model="testAddForm.province"
                placeholder="Select"
                size="large"
                style="width: 240px"
            >
              <el-option
                  v-for="item in provincesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-text>最大考试人数:</el-text>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="testAddForm.maxNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>开始报名时间:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-date-picker
                v-model="testAddForm.registerTime"
                type="datetime"
                placeholder="选择开始报名时间"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>测试时间:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-date-picker
                v-model="testAddForm.testTime"
                type="datetime"
                placeholder="选择测试时间"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>注意事项:</el-text>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="testAddForm.notice"
            :autosize="{ minRows: 3 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-col>
      </el-row>
    </el-form>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 20px;margin-bottom: 20px">
      <el-button @click="handleNewTestRequest" type="primary">确认新建测试</el-button>
    </div>
  </el-dialog>
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