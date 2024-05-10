<script setup>

</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="height: calc(100vh - 65px); width: 100%">
      <div class="header">
        <el-text type="info">测试公告管理</el-text>
      </div>
      <div class="interaction-item"></div>
      <div class="data-table"></div>
    </el-card>
  </div>
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
  background-color: #f5f7fa;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}

.data-table{
  height: calc(100vh - 195px);
  background-color: #f5f7fa;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}
</style>