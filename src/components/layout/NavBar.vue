<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

const activeTab = ref('home');

const handleTabClick = (tab) => {
  router.push({name: tab.paneName});
}
</script>

<template>
  <div class="NavBar">
    <div class="tabs">
      <el-tabs v-model="activeTab" stretch @tab-click="handleTabClick">
        <el-tab-pane label="首页" name="home"></el-tab-pane>
        <el-tab-pane label="在线报名" name="onlineRegistration"></el-tab-pane>
        <el-tab-pane label="报名查询" name="registrationInquiry"></el-tab-pane>
        <el-tab-pane label="准考证打印" name="admitCardPrinting"></el-tab-pane>
        <el-tab-pane label="成绩查询" name="scoreInquiry"></el-tab-pane>
        <el-tab-pane label="测前须知" name="testInstructions"></el-tab-pane>
        <el-tab-pane label="帮助中心" name="helpCenter"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.NavBar{
  height: 55px;
  width: 1200px;
}
</style>