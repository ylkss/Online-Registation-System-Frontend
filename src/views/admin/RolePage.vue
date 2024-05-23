<script setup>

import {onMounted, reactive, ref} from "vue";
import {addRole, deleteRole, getRoleList, updateRole, updateRoleMenu} from "@/net/admin/role/index.js";
import {getMenuTree, getRoleMenuTree} from "@/net/admin/menu/index.js";

const tableData = reactive({
  rows: [],
})
const showTable = ref(false)

const roleMenuDialogShow = ref(false)

const roleAddDialogShow = ref(false)
const NewRole = ref(false)
const roleAddForm = reactive({
  id: 0,
  roleName: '',
  roleDesc: ''
})
const handleNewRoleRequest = () => {
  addRole(roleAddForm, () => {
    roleAddDialogShow.value = false
    getRoleList((data) => {
      tableData.rows = data
      showTable.value = true
    })
  })
}
const handleShowAddNewRoleDialog = () => {
  // 清空表单
  NewRole.value = true
  roleAddForm.id = undefined
  roleAddForm.roleName = ''
  roleAddForm.roleDesc = ''
  roleAddDialogShow.value = true
}

const handleShowUpdateNewRoleDialog = (row) => {
  // 清空表单
  NewRole.value = false
  roleAddForm.id = row.id
  roleAddForm.roleName = row.roleName
  roleAddForm.roleDesc = row.roleDesc
  roleAddDialogShow.value = true
}

const handleUpdateRoleRequest = () => {
  updateRole(roleAddForm, () => {
    roleAddDialogShow.value = false
    getRoleList((data) => {
      tableData.rows = data
      showTable.value = true
    })
  })
}

const tree = ref()
const MenuTree = ref([])
const RoleMenuTree = ref([])
const defaultCheckedKeys = ref([])
const handleRoleMenuDialogShow = (row) => {
  roleMenuDialogShow.value = true
  updateRoleMenuForm.roleId = row.id
  // 获取总体菜单
  getMenuTree((data) => {
    MenuTree.value = data
    // 获取角色的菜单
    getRoleMenuTree(row.id, (data) => {
      RoleMenuTree.value = data
      tree.value.setCheckedKeys = RoleMenuTree.value.map(item => item.id)
    })
  })
}

const handleDeleteRoleRequest = (row) => {
  deleteRole(row.id, () => {
    getRoleList((data) => {
      tableData.rows = data
      showTable.value = true
    })
  })
}

const updateRoleMenuForm = reactive({
  roleId: 0,
  menuIds: []
})

const handleUpdateRoleMenuRequest = () => {
  const checkedKeys = tree.value.getCheckedKeys()
  updateRoleMenuForm.menuIds = checkedKeys
  console.log(updateRoleMenuForm)
  updateRoleMenu(updateRoleMenuForm)
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
          <el-button @click="handleShowAddNewRoleDialog" type="primary">新增角色</el-button>
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
              <el-button @click="handleShowUpdateNewRoleDialog(row)" link type="primary" size="small">修改</el-button>
              <el-button @click="handleRoleMenuDialogShow(row)" link type="primary" size="small">修改角色菜单</el-button>
              <el-button @click="handleDeleteRoleRequest(row)" link type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="roleAddDialogShow" title="新增菜单">
    <el-form>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>角色名称:</el-text>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="roleAddForm.roleName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-text>角色描述:</el-text>
        </el-col>
        <el-col :span="12">
          <el-input v-model="roleAddForm.roleDesc"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 20px;margin-bottom: 20px">
      <el-button v-show="NewRole" @click="handleNewRoleRequest" type="primary">确认新建角色</el-button>
      <el-button v-show="!NewRole" @click="handleUpdateRoleRequest" type="primary">确认修改角色</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="roleMenuDialogShow" title="修改角色对应菜单">
    <el-tree-v2
        ref="tree"
        style="max-width: 600px"
        :data="MenuTree"
        node-key="id"
        :props="{
          label: 'menuName'
        }"
        :default-checked-keys="defaultCheckedKeys"
        show-checkbox
        :height="208"
    />
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 20px;margin-bottom: 20px">
      <el-button @click="handleUpdateRoleMenuRequest" type="primary">确认修改角色</el-button>
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