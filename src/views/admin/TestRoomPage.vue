<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {addTestRoom, getTestRooms} from "@/net/admin/testRoom/index.js";

const customColors = [
  { color: '#f56c6c', percentage: 100 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 40 },
  { color: '#6f7ad3', percentage: 20 },
]

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
  getTestRooms(params, (data) => {
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
  getTestRooms(params, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
  })
}

const addTestDialogShow = ref(false)
const addTestRoomForm = reactive({
  testId: 1,
  roomNum: '',
  maxUserNum: '',
  description: ''
})

const handleAddTestRoomDialogShow = (row) => {
  addTestDialogShow.value = true
  addTestRoomForm.testId = row.id
}

const handleAddTestRoom = () => {
  addTestRoom(addTestRoomForm, () => {
    // 获取考场信息
    const params = {
      pageNum: searchForm.pageNum,
      pageSize: searchForm.pageSize
    }
    getTestRooms(params, (data) => {
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
  getTestRooms(params, (data) => {
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
        <el-text type="info">考场管理</el-text>
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
      <div v-if="showTable" class="data-table">
        <el-table
            :data="tableData.rows" stripe style="width: 100%"
            :tree-props="{ hasChildren: 'hasTestRoom', children: 'testRoomInfo' }"
        >
          <el-table-column type="expand">
            <template #default="props">
              <div style="padding:0 30px">
                <div style="width: 100%;display: flex;justify-content: center;color: #b3e19d"><h4>考场信息</h4></div>
                <el-table show-summary :data="props.row.testRoomInfo">
                  <el-table-column label="考场号" prop="roomNum" />
                  <el-table-column prop="usedNum" label="使用情况">
                    <template #default="{ row }">
                      <el-progress
                          :text-inside="true"
                          :stroke-width="15"
                          :percentage="row.usedNum / row.maxUserNum * 100"
                          :color = "customColors"
                      >
                        <span>已分配 {{ row.usedNum }}</span>
                      </el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column label="最大人数" prop="maxUserNum"/>
                  <el-table-column label="位置描述" prop="description" />
                  <el-table-column fixed="right" label="Operations">
                    <template #default="{ row }">
                      <el-button link type="primary" size="small">修改</el-button>
                      <el-button link type="danger" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="测试站名称"/>
          <el-table-column prop="location" label="测试地点" />
          <el-table-column prop="province" label="考试省份" />
          <el-table-column prop="hasTestRoom" label="是否安排考场">
            <template #default="{ row }">
              <span :style="{ color: row.hasTestRoom ? '#79bbff' : '#F56C6C' }">
                {{ row.hasTestRoom ? '已安排' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="testTime" label="测试时间" />
          <el-table-column fixed="right" label="Operations">
            <template #default="{ row }">
              <el-button @click="handleAddTestRoomDialogShow(row)" link type="primary" size="small">增加考场</el-button>
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
  <el-dialog v-model="addTestDialogShow" title="新增考场">
    <el-form>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>考场号:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="addTestRoomForm.roomNum" placeholder="请输入考场号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>最大人数:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="addTestRoomForm.maxUserNum" placeholder="请输入最大人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>位置描述:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="addTestRoomForm.description" placeholder="请输入位置描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="display: flex;justify-content: center;margin-top: 20px;margin-bottom: 20px">
      <el-button @click="handleAddTestRoom" type="primary" style="width: 240px">确认提交</el-button>
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