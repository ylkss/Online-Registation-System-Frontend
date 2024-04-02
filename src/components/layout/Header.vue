<script setup>
import router from "@/router/index.js";
import NavBar from "@/components/layout/NavBar.vue";

const logoUrl = 'public/images/logo.ce99f05f.png'
</script>

<template>
  <div class="logo_or_user">
    <el-image style="width: 534px;height: 55px" :src="logoUrl"/>
    <div class="login_button">
      <el-button style="margin-top: 15px" @click="router.push('/auth/login')" type="primary" round>用户登录</el-button>
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
}
</style>