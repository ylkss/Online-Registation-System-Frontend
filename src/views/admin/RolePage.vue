<script setup>

import {onMounted, reactive, ref} from "vue";
import {addTest, getAdminTestList} from "@/net/admin/test/index.js";
import {getRoleList} from "@/net/admin/role/index.js";

const tableData = reactive({
  rows: [],
})
const showTable = ref(false)

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

onMounted(() => {
  getRoleList((data) => {
    tableData.rows = data
    showTable.value = true
  })
})
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="height: calc(100vh - 65px); width: 100%">
      <div class="header">
        <el-text type="info">角色管理</el-text>
      </div>
      <div class="interaction-item">
        <div class="search-item">
        </div>
        <div class="add-item">
          <el-button @click="handleShowAddNewTestDialog" type="primary">新增角色</el-button>
        </div>
      </div>
      <div v-if="showTable" class="data-table">
        <el-table
            :data="tableData.rows" stripe
            style="width: 100%"
            row-key="id"
            default-expand-all
        >
          <el-table-column prop="roleName" label="角色名称" width="280" />
          <el-table-column prop="userNum" label="角色人数" width="280" />
          <el-table-column prop="roleDesc" label="角色描述" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column fixed="right" label="Operations">
            <template #default="{ row }">
              <el-button link type="danger" size="small">删除</el-button>
              <el-button link type="primary" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
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