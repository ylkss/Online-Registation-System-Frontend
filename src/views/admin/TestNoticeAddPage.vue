<script setup>
import {reactive} from "vue";
import {addTestNotice} from "@/net/admin/testNotice/index.js";

const TestNoticeForm = reactive({
  title: '',
  content: ''
})

const handleAddTestNotice = () => {
  addTestNotice(TestNoticeForm)
}
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="height: calc(100vh - 65px); width: 100%">
      <div class="header">
        <el-text type="info">新增测试公告(支持markdown语法)</el-text>
      </div>
      <el-form>
        <div class="body-title">
          <el-text type="info">测试公告标题：</el-text>
          <el-form-item>
            <el-input style="margin-top: 20px;width: 400px" v-model="TestNoticeForm.title"></el-input>
          </el-form-item>
        </div>
        <div class="body-content">
          <div style="width: 100%;height: 460px">
            <el-form-item>
              <v-md-editor  v-model="TestNoticeForm.content" height="400px"></v-md-editor>
            </el-form-item>
          </div>
          <div style="width: 100%;height:50px;display: flex;justify-content: center;margin-top: 20px;margin-bottom: 20px">
            <el-button @click="handleAddTestNotice" style="width: 240px" type="primary">确认发布</el-button>
          </div>
        </div>
      </el-form>
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

.body-title{
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

.body-content{
  height: calc(100vh - 195px);
  background-color: #f5f7fa;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}
</style>