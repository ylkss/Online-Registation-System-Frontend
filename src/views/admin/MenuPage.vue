<script setup>

import {onMounted, reactive, ref} from "vue";
import {addMenu, deleteMenu, getMenuTree, updateMenu} from "@/net/admin/menu/index.js";

const tableData = reactive({
  rows: [],
})
const showTable = ref(false)

const provinces = [
  "C", "M", "B"
];

const provincesOptions = provinces.map(province => ({
  value: province,
  label: province
}));
const menuAddDialogShow = ref(false)
const menuAddForm = reactive({
  id: 0,
  parentId: 0,
  menuType: '',
  menuName: '',
  orderNum: '',
  permission: '',
  path: ''
})

const newMenu = ref(false)

const handleNewMenuRequest = () => {
  addMenu(menuAddForm, () => {
    getMenuTree((data) => {
      tableData.rows = data
      showTable.value = true
    })
    menuAddDialogShow.value = false
  })
}
const handleShowAddNewMenuDialog = () => {
  // 清空表单
  menuAddForm.id = undefined
  menuAddForm.parentId = 0
  menuAddForm.menuType = ''
  menuAddForm.menuName = ''
  menuAddForm.orderNum = ''
  menuAddForm.permission = ''
  menuAddForm.path = ''
  menuAddDialogShow.value = true
  newMenu.value = true
}

const handleShowUpdateNewMenuDialog = (row) => {
  // 清空表单
  menuAddForm.id = row.id
  menuAddForm.parentId = row.parentId
  menuAddForm.menuType = row.menuType
  menuAddForm.menuName = row.menuName
  menuAddForm.orderNum = row.orderNum
  menuAddForm.permission = row.permission
  menuAddForm.path = row.path
  menuAddDialogShow.value = true
  newMenu.value = false
}

const handleUpdateMenuRequest = () => {
  updateMenu(menuAddForm, () => {
    getMenuTree((data) => {
      tableData.rows = data
      showTable.value = true
    })
    menuAddDialogShow.value = false
  })
}

const handleDeleteMenuRequest = (row) => {
  deleteMenu(row.id, () => {
    getMenuTree((data) => {
      tableData.rows = data
      showTable.value = true
    })
  })
}

onMounted(() => {
  getMenuTree((data) => {
    tableData.rows = data
    showTable.value = true
  })
})
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="height: calc(100vh - 65px); width: 100%">
      <div class="header">
        <el-text type="info">菜单管理</el-text>
      </div>
      <div class="interaction-item">
        <div class="search-item">
        </div>
        <div class="add-item">
          <el-button @click="handleShowAddNewMenuDialog" type="primary">新增菜单</el-button>
        </div>
      </div>
      <div v-if="showTable" class="data-table">
        <el-table
            :data="tableData.rows" stripe
            style="width: 100%"
            row-key="id"
            default-expand-all
        >
          <el-table-column prop="id" label="菜单id" />
          <el-table-column prop="menuName" label="菜单名称" />
          <el-table-column prop="path" label="路径" />
          <el-table-column prop="permission" label="权限" />
          <el-table-column prop="menuType" label="菜单类型" />
          <el-table-column prop="orderNum" label="序号" />
          <el-table-column fixed="right" label="Operations">
            <template #default="{ row }">
              <el-button @click="handleDeleteMenuRequest(row)" link type="danger" size="small">删除</el-button>
              <el-button @click="handleShowUpdateNewMenuDialog(row)" link type="primary" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="menuAddDialogShow" title="新增菜单">
    <el-form>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>菜单名称:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="menuAddForm.menuName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>父菜单id:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="menuAddForm.parentId" placeholder="父菜单id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>菜单类别:</el-text>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select
                v-model="menuAddForm.menuType"
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
          <el-text>菜单页面路径:</el-text>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="menuAddForm.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>菜单对应权限:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="menuAddForm.permission"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>菜单排序:</el-text>
        </el-col>
        <el-col :span="12">
          <el-input v-model="menuAddForm.orderNum"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 20px;margin-bottom: 20px">
      <el-button v-show="newMenu" @click="handleNewMenuRequest" type="primary">确认新建菜单</el-button>
      <el-button v-show="!newMenu" @click="handleUpdateMenuRequest" type="primary">确认修改菜单</el-button>
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