<script setup>
import {ref} from "vue";

const activeTab = ref('home');
</script>

<template>
  <div class="NavBar">
    <div class="tabs">
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane label="首页" name="home"></el-tab-pane>
        <el-tab-pane label="在线报名" name="onlineRegistration"></el-tab-pane>
        <el-tab-pane label="报名查询" name="registrationInquiry"></el-tab-pane>
        <el-tab-pane label="准考证打印" name="admitCardPrinting"></el-tab-pane>
        <el-tab-pane label="成绩查询" name="scoreInquiry"></el-tab-pane>
        <el-tab-pane label="测前须知" name="preTestInstructions"></el-tab-pane>
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