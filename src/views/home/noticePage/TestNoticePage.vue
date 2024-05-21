<script setup>
import {useRoute} from "vue-router";
import {DArrowLeft} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {onMounted, reactive} from "vue";
import {getTestNoticeInfo} from "@/net/userApi/testNotice/index.js";

const route = useRoute();
const id = route.query.id;
const testNotice = reactive({
  id: id,
  title: '',
  content: '',
  createTime: '',
  formattedCreateTime: ''
});

const handleGetTestNotice = () => {
  getTestNoticeInfo(testNotice.id, (data) => {
    testNotice.title = data.title;
    testNotice.content = data.content;
    testNotice.createTime = data.createTime;
    testNotice.formattedCreateTime = data.formattedCreateTime;
  })
}

onMounted(() => {
  handleGetTestNotice()
})
</script>

<template>
  <div class="test-notice">
    <el-card style="margin-top: 25px">
      <div class="test-notice-title">
        <div @click="router.push('/')" class="title-back"><el-icon size="12"><DArrowLeft /></el-icon>返回</div>
        <div class="title-main">
          <div class="title-content">{{ testNotice.title }}</div>
          <div class="time">{{ testNotice.formattedCreateTime }}</div>
        </div>
      </div>
      <div class="test-notice-content">
        <v-md-preview :text="testNotice.content"></v-md-preview>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.test-notice{
  width: 100%;
  height: 100%;

  .el-card{
    padding: 26px 69px 49px 69px;
    width: 100%;
    min-height: 767px;
  }

  .test-notice-title{
    width: 100%;
    margin-bottom: 36px;
    display: flex;
    position: relative;

    .title-back{
      position: absolute;
      left: 0;
      top: 15px;
      font-size: 14px;
      color: #409EFF;
      cursor: pointer;
    }

    .title-main{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title-content{
        font-size: 24px;
        font-weight: bold;
      }

      .time{
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>