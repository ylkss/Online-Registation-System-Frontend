<script setup>
import router from "@/router/index.js";
import NavBar from "@/components/layout/NavBar.vue";
import {useUserStore} from "@/store/index.js";
import {isAuth, logout} from "@/net/index.js";

const logoUrl = 'public/images/logo.ce99f05f.png'

const userInfoStore = useUserStore()

const handleLogout = () => {
  logout(() => {
    router.push('/auth/login')
  })
}
</script>

<template>
  <div class="logo_or_user">
    <el-image style="width: 534px;height: 55px" :src="logoUrl"/>
    <div v-show="isAuth()" class="login_button">
      <el-button style="margin-top: 15px" @click="router.push('/auth/login')" type="primary" round>用户登录</el-button>
    </div>
    <!-- 用户登录之后的头像 -->
    <div v-show="!isAuth()" class="login_avatar">
      <el-dropdown>
        <el-avatar :size="50" :fit="'fill'" :src="userInfoStore.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/user-info')">个人中心</el-dropdown-item>
            <el-dropdown-item @click="router.push('/reset-password')">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <NavBar/>
</template>

<style scoped>
.logo_or_user{
  width: 1200px;
  height: 125px;
  display: flex;
  justify-content: space-between;
  padding: 38px 0 32px 0;

  .login_button{
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .login_avatar{
    display: flex;
    justify-content: center;
    align-content: center;

    .el-dropdown{

      .el-avatar{
        margin-top: 2px;
      }

      .el-avatar:focus {
        outline: none;
      }
    }
  }
}
</style>