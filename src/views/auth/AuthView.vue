<script setup>

</script>

<template>
  <div class="auth-page">
    <router-view/>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold">欢迎来到我们的普通话报名系统</div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background-image: url("/images/auth/神子绮良良完稿JPG_5ee4b.jpg");
  background-size: cover;
  background-position: center;

  .welcome-title {
    position: absolute;
    top: 30px;
    left: 30px;
    color: white;
    text-shadow: 0 0 10px black;
  }
}

</style>