<script setup>
import {useUserStore} from "@/store/index.js";
import {onMounted, reactive, ref} from "vue";
import {printTicket} from "@/net/userApi/test/index.js";

const userStore = useUserStore();

const showTicket = ref(false);

const ticketInfo = reactive({
  realName: userStore.user.realName,
  sex: userStore.user.sex === 0? "男": "女",
  ticketNum:'123456',
  avatar: userStore.user.avatar,
  IdCardType: '中华人民共和国居民身份证',
  IdCardNum: userStore.user.idCardNum,
  phoneNum: userStore.user.phone,
  email: userStore.user.email,
  testInfo: [{
    location: '123456',
    testTime: '123456',
    roomNum: '123456',
    seatNum: '123456',
    name: '123456',
  }],
  testNotice: '123456',
})

function getTicketInfo() {
  printTicket((data) => {
    ticketInfo.ticketNum = data.admissionTicketNum;
    ticketInfo.testNotice = data.notice;
    ticketInfo.testInfo = data.testInfo;
    showTicket.value = true;
  })
}

onMounted(() => {
  getTicketInfo()
})

</script>

<template>
  <div>
    <el-card  body-style="padding: 0" style="margin-top: 25px">
      <div v-show="showTicket">
        <div id="printMe">
          <div class="user-info">
            <div class="user-info-header">
              <el-text>身份信息</el-text>
            </div>
            <div class="user-info-body">
              <div class="text-info">
                <el-row>
                  <el-col :span="6">
                    <el-text>考生姓名: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.realName }}</el-text>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-text>考生性别: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.sex }} </el-text>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-text>准考证号: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.ticketNum }}</el-text>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-text>证件类型: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.IdCardType }}</el-text>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-text>证件号码: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.IdCardNum }}</el-text>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-text>手机号码: </el-text>
                  </el-col>
                  <el-col :span="18">
                    <el-text>{{ ticketInfo.phoneNum }}</el-text>
                  </el-col>
                </el-row>
              </div>
              <div class="avatar-info">
                <img :src="ticketInfo.avatar" alt="avatar" style="width: 100px;height: 100px">
              </div>
            </div>
          </div>
          <div class="test-info">
            <div class="test-info-header">
              <el-text>考试信息</el-text>
            </div>
            <div class="test-info-body">
              <el-table :data="ticketInfo.testInfo">
                <el-table-column prop="name" label="考试站点名称"></el-table-column>
                <el-table-column prop="location" label="考试地点"></el-table-column>
                <el-table-column prop="testTime" label="考试时间"></el-table-column>
                <el-table-column prop="roomNum" label="考场号"></el-table-column>
                <el-table-column prop="description" label="考场详细信息"></el-table-column>
                <el-table-column prop="seatNum" label="座位号"></el-table-column>
              </el-table>
            </div>
            <div class="test-info-notice">
              <div class="test-info-notice-header">
                <el-text>考试须知</el-text>
              </div>
              <v-md-preview :text="ticketInfo.testNotice"></v-md-preview>
            </div>
          </div>
        </div>
        <div class="print-button">
          <el-button type="primary" v-print="'#printMe'">打印准考证</el-button>
        </div>
      </div>
      <el-empty style="height: 150mm" v-show="!showTicket" description="尚未报名任何考试" />
    </el-card>
  </div>
</template>

<style scoped>
#printMe{
  width: 210mm;
  min-height: 150mm;
  padding: 10mm;
  margin: 0 auto;
}

.print-button{
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
}

.user-info{
  width: 100%;
  height: 200px;

  .user-info-header{
    display: flex;
    height: 30px;
    border-bottom: #79bbff 2px solid;

    .el-text{
      font-size: 19px;
      font-weight: bold;
    }
  }

  .user-info-body{
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
    height: 170px;

    .text-info{
      width: 70%;
      height: 100%;
    }
  }
}

.test-info{
  width: 100%;
  min-height: 100px;

  .test-info-header{
    display: flex;
    height: 30px;
    border-bottom: #79bbff 2px solid;

    .el-text{
      font-size: 19px;
      font-weight: bold;
    }
  }

  .test-info-body{
    width: 100%;
    min-height: 70px;
  }

  .test-info-notice{
    margin-top: 20px;
    width: 100%;

    .test-info-notice-header{
      display: flex;
      height: 30px;
      border-bottom: #79bbff 2px solid;

      .el-text{
        font-size: 19px;
        font-weight: bold;
      }
    }
  }
}
</style>