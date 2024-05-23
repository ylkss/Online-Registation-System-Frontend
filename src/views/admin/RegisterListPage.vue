<script setup>

import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getRegisterList, getRegisterListExcel, updateRegisterStatus} from "@/net/admin/register/index.js";

const route = useRoute();
const testId = route.query.testId;

const updateForm = reactive({
  id: 0,
  status: 0,
  score: 0
})

const searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const tableData = reactive({
  rows: [],
  total: 0
})
const showTable = ref(false)

const handlePageChange = (val) => {
  searchForm.pageNum = val
  const params = {
    testId: testId,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  if(val===null){
    return
  }
  getRegisterList(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
    showTable.value = true
  })
}

const statusColor = (status) => {
  switch (status) {
    case 0:
      return '#CDD0D6'; // 未审核
    case 1:
      return '#95d475'; // 审核通过
    case 2:
      return '#79bbff'; // 成绩可查
    case 3:
      return '#f89898'; // 审核未通过
    default:
      return '#CDD0D6'; // 默认颜色
  }
}

const statusText = (status) => {
  switch (status) {
    case 0:
      return '未审核'; // 未审核
    case 1:
      return '审核通过'; // 审核通过
    case 2:
      return '成绩可查'; // 成绩可查
    case 3:
      return '审核未通过'; // 审核未通过
    default:
      return '未审核'; // 默认颜色
  }
}

const handleGetRegisterListExcel = () => {
  getRegisterListExcel(testId)
}

const handlePass = (row) => {
  // 通过审核
  updateForm.id = row.id
  updateForm.status = 1
  updateForm.score = undefined

  updateRegisterStatus(updateForm, () => {
    getRegisterList(searchForm, (data) => {
      tableData.rows = data.rows
      tableData.total = data.total
      showTable.value = true
    })
  })
}

const handleFail = (row) => {
  // 未通过审核
  updateForm.id = row.id
  updateForm.status = 3
  updateForm.score = undefined

  updateRegisterStatus(updateForm, () => {
    getRegisterList(searchForm, (data) => {
      tableData.rows = data.rows
      tableData.total = data.total
      showTable.value = true
    })
  })
}

const handleSetScore = (row) => {
  // 上传分数
  updateForm.id = row.id
  updateForm.status = undefined

  updateRegisterStatus(updateForm, () => {
    getRegisterList(searchForm, (data) => {
      tableData.rows = data.rows
      tableData.total = data.total
      showTable.value = true
    })
  })
}

onMounted(() => {
  const params = {
    testId: testId,
    pageNum: searchForm.pageNum,
    pageSize: searchForm.pageSize
  }
  getRegisterList(params, (data) => {
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
        <el-text type="info">报考人员管理</el-text>
      </div>
      <div class="interaction-item">
        <div class="add-item">
          <el-button @click=handleGetRegisterListExcel type="primary">上传修改后的表格</el-button>
          <el-button @click=handleGetRegisterListExcel type="primary">导出所有报考人员表格</el-button>
        </div>
      </div>
      <div v-if="showTable" class="data-table">
        <el-table :data="tableData.rows" stripe style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div>
                <div style="width: 100%">
                  <el-text style="font-size: 20px;margin-left: 20px">用户报考信息</el-text>
                </div>
                <el-divider/>
                <el-empty v-if="props.row.status === 0" description="尚未审核" />
                <el-empty v-if="props.row.status === 3" description="未通过审核" />
                <div v-if="props.row.status === 1" style="display: flex;padding: 20px;justify-content: space-between">
                  <el-text>准考证号： {{ props.row.admissionTicketNum }}</el-text>
                  <el-text>考场号： {{ props.row.roomNum }}</el-text>
                  <el-text>座位号： {{ props.row.seatNum }}</el-text>
                </div>
                <div v-if="props.row.status === 2" style="display: flex;padding: 20px;justify-content: space-between">
                  <el-text>准考证号： {{ props.row.admissionTicketNum }}</el-text>
                  <el-text>考场号： {{ props.row.roomNum }}</el-text>
                  <el-text>座位号： {{ props.row.seatNum }}</el-text>
                  <el-text>分数： {{ props.row.score }}</el-text>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="考生姓名" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="idCardNum" label="身份证号" width="160px"/>
          <el-table-column prop="ethnicGroup" label="民族" />
          <el-table-column prop="workingConditions" label="工作状态" />
          <el-table-column prop="hasTestRoom" label="审核状态">
            <template #default="{ row }">
              <span :style="{ color: statusColor(row.status) }">
                {{ statusText(row.status) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="250">
            <template #default="{ row }">
              <el-button link @click="handleFail(row)" type="danger" size="small">审核不通过</el-button>
              <el-button link @click="handlePass(row)" type="primary" size="small">审核通过</el-button>
              <el-popover placement="top" :width="200" trigger="click">
                <template #reference>
                  <el-button link type="primary" size="small">上传分数</el-button>
                </template>
                <el-input v-model="updateForm.score" placeholder="请输入分数" style="width: 100px"></el-input>
                <el-button @click="handleSetScore(row)" type="primary" size="small">确定</el-button>
              </el-popover>

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

  .add-item{
    width: 25%;
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