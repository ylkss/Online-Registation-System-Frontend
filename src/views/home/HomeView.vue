<script setup>
import Header from '@/components/layout/Header.vue';
</script>

<template>
  <div class="common-layout">
    <div class="header">
      <Header/>
    </div>
    <div class="main">
      <div class="router-main">
        <transition name="el-fade-in-linear">
          <router-view/>
        </transition>
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  display: block;
  overflow-x: hidden;

  .header {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main{
    min-height: calc(100vh - 250px);
    width: 100%;
    display: flex;
    justify-content: center;

    .router-main{
      width: 1200px;
    }
  }

  .footer{
    height: 50px;
  }
}
</style>