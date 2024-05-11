<script setup>
import {logout} from "@/net/index.js";
import router from "@/router/index.js";

const handleLogout = () => {
  logout(() => {
    router.push('/auth/login')
  })
}
</script>

<template>
  <div class="admin-header">
    <div class="header-text">
      <el-text>
        欢迎来到后台管理系统
      </el-text>
    </div>
    <div class="avatar">
      <el-dropdown>
        <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.admin-header{
  width: 100%;
  height: 60px;
  background-color: #b1b3b8;
  display: flex;
  justify-content: space-between;

  .header-text{
    height: 100%;
    margin-left: 20px;

    .el-text{
      font-size: 45px;
      font-weight: bold;
      color: #F2F6FC;
      line-height: 60px;
    }
  }

  .avatar{
    margin-top: 2px;
    margin-right: 40px;
  }
}
</style>