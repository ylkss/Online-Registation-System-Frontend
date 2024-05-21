<script setup>
import {onMounted, reactive, ref} from "vue";
import {getTestList} from "@/net/userApi/test/index.js";
import {useRoute} from "vue-router";
import {Check, DArrowRight, Location, UserFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {classifyTests, getTestTimeList} from "@/utils/TestListUtil.js";
import {useUserStore} from "@/store/index.js";
import router from "@/router/index.js";
import {userSignUp} from "@/net/userApi/user/index.js";

const route = useRoute();
const province = route.query.province

const userStore = useUserStore();
const userInfo = reactive({
  username: userStore.user.username,
  email: userStore.user.email,
  phone: userStore.user.phone,
  realName: userStore.user.realName,
  sex: userStore.user.sex,
  avatar: userStore.user.avatar,
  idCardNum: userStore.user.idCardNum,
  ethnicGroup: userStore.user.ethnicGroup,
  workingConditions: userStore.user.workingConditions,
})

const activeItem = ref(1);

// 被选中的测试
const selectedTest = ref(0)
const selectedTestTime = ref(0)
const selectedTestNotice = ref('')

// 完整测试数据
const TestInfoList = ref([])

// 测试名称数据
const TestNameList = ref([])
// 选择名称相同的测试时间数据
const TestTimeList = ref([])

const handleGetTestList = () => {
  getTestList(province, (data) => {
    TestInfoList.length = 0
    data.forEach(item => {
      TestInfoList.value.push(item)
    })
    const TestNameListData = classifyTests(data);
    TestNameList.length = 0
    TestNameListData.forEach(item => {
      TestNameList.value.push(item)
    })
  })
}

onMounted(() => {
  handleGetTestList()
})


const handleStepOneToTow = () => {
  if(activeItem.value === 1 && selectedTest.value === 0 && selectedTestTime.value === 0){
    ElMessage.warning('请选择测试站和测试时间')
    return
  }
  activeItem.value = 2
}

const handleStepTwoToOne = () => {
  // 清空选择的测试站和测试时间
  selectedTest.value = 0
  selectedTestTime.value = 0
  activeItem.value = 1
}

const handleStepTwoToThree = () => {
  activeItem.value = 3
}

const handleStepThreeToOne = () => {
  // 清空选择的测试站和测试时间
  selectedTest.value = 0
  selectedTestTime.value = 0
  activeItem.value = 1
}

const handleUserSignUp = () => {
  if(!userStore.isComplete){
    ElMessage.warning('请先完善个人信息')
  }else {
    userSignUp(selectedTestTime.value)
  }
}

// 选择指定测试
const handleSelectTest = (index, name) => {
  selectedTestTime.value = 0;
  if(selectedTest.value === index){
    selectedTest.value = 0
  }else {
    selectedTest.value = index
    const TestTimeListData = getTestTimeList(TestInfoList.value, name)
    TestTimeList.value.length = 0
    TestTimeListData.forEach(item => {
      TestTimeList.value.push(item)
    })
  }
}

const selectedTestInfo = ref({})

const handleSelectTestTime = (index) => {
  if(selectedTestTime.value === index){
    selectedTestTime.value = 0
  }else {
    selectedTestTime.value = index
    const foundItem = TestInfoList.value.find(item => item.id === index);
    // 创建 foundItem 的深拷贝
    selectedTestInfo.value = JSON.parse(JSON.stringify(foundItem));
    selectedTestInfo.value.testTime = TestTimeList.value.find(time => time.id === index).testTime
    selectedTestNotice.value = foundItem.notice
  }
}
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="margin-top: 25px;min-height: 700px;">
      <div class="step">
        <el-steps style="width: 900px" :active="activeItem" align-center>
          <el-step title="选择考点" />
          <el-step title="阅读报名须知" />
          <el-step title="填写报名信息" />
        </el-steps>
      </div>
      <div class="step-content">
        <div v-show="activeItem === 1" class="step-one">
<!--          选择测试站-->
          <div class="select-test-place">
            <div class="header">
              <div class="title">
                <div style="background-color: #79bbff;width: 3px;height: 16px;margin-top: 5px"></div>
                <div style="margin-left: 10px;font-size: 16px;font-weight: bold;">选择测试站</div>
              </div>
              <div class="test-place-more">
                更多 <el-icon><DArrowRight /></el-icon>
              </div>
            </div>
            <div class="content">
              <el-card v-if="TestNameList.length !== 0" @click="handleSelectTest(test.id, test.name)"
                       v-for="test in TestNameList"
                       class="test-place-card"
                       shadow="hover">
                <div class="test-name">{{ test.name }}</div>
                <div class="test-info">
                  <div class="test-province">
                    <el-icon><Location /></el-icon>
                    {{ test.province }}
                  </div>
                  <div class="test-register-time">报名截止日期： {{ test.registerTime }}</div>
                </div>
                <div class="card-overlay" v-show="selectedTest === test.id">
                  <div class="checkmark"><el-icon size="20" color="#337ecc"><Check /></el-icon></div>
                </div>
              </el-card>
              <el-empty style="width: 100%;" v-else description="此地区暂时没有可供报名的考试" />
            </div>
          </div>
<!--          选择测试时间-->
          <div class="select-test-time" v-show="selectedTest !== 0">
            <div class="title">
              <div style="background-color: #79bbff;width: 3px;height: 16px;margin-top: 5px"></div>
              <div style="margin-left: 10px;font-size: 16px;font-weight: bold;">选择测试时间</div>
            </div>
            <div class="content">
              <el-card @click="handleSelectTestTime(time.id)"
                       body-style="padding: 0"
                       v-for="time in TestTimeList"
                       class="test-time-card"
                       shadow="hover">
                <div style="margin-top: 7px;width: 205px;display: flex;justify-content: center;align-content: center;font-size: 13px">{{ time.testTime }}</div>
                <div class="card-overlay" v-show="selectedTestTime === time.id">
                  <div class="checkmark"><el-icon size="20" color="#337ecc"><Check /></el-icon></div>
                </div>
              </el-card>
            </div>
          </div>
<!--          显示当前报名人数信息-->
          <div class="show-sign-up-info" v-show="selectedTestTime !== 0">
            <div class="info-title">当前测试信息</div>
            <div class="info-item" style="display: flex">
               <div style="margin-top: 1px"><el-icon size="16"><UserFilled /></el-icon></div><div>计划人数：</div><div class="test-num">{{ selectedTestInfo.maxNum }}</div><div>人</div>
              <div style="margin-left: 10px">剩余名额：</div><div class="test-num">{{ selectedTestInfo.maxNum - selectedTestInfo.registerNum }}</div><div>人</div>
            </div>
            <div class="info-item" style="display: flex">
              <div style="margin-top: 1px"><el-icon size="16"><Location /></el-icon></div>
              <div>测试地址：{{ selectedTestInfo.location }}</div>
            </div>
          </div>
        </div>
        <div v-show="activeItem === 2" class="step-two">
          <div class="test-notice-title">
            报名须知
          </div>
          <div class="test-notice-content">
            <v-md-preview :text="selectedTestNotice"></v-md-preview>
          </div>
        </div>
        <div v-show="activeItem === 3" class="step-three">
          <div class="notice-info">
            <div style="font-weight: bold;font-size: 13px">报名信息：</div>
            <div style="font-size: 13px">您正在报名</div>
            <div style="font-size: 14px;color: #79bbff;font-weight: bold">&nbsp;{{ selectedTestInfo.testTime }}&nbsp;</div>
            <div style="font-size: 13px">于</div>
            <div style="font-size: 14px;color: #79bbff;font-weight: bold">&nbsp;{{ selectedTestInfo.location }}&nbsp;</div>
            <div style="font-size: 13px">举行的普通话测试</div>
          </div>
          <div style="width: 100%;height: 500px;padding: 10px;display: flex;justify-content: center">
            <div class="user-info">
              <el-card style="height: 450px">
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">考生姓名：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.realName }}</el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">考生性别：</el-col>
                  <el-col class="user-info-item-content" :span="18">
                    <span v-if="userInfo.sex === 0">男性</span>
                    <span v-else>女性</span>
                  </el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">身份证号：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.idCardNum }}</el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">联系电话：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.phone }}</el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">电子邮箱：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.email }}</el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">民族：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.ethnicGroup }}</el-col>
                </el-row>
                <el-row class="user-info-item">
                  <el-col class="user-info-item-title" :span="5">工作状态：</el-col>
                  <el-col class="user-info-item-content" :span="18">{{ userInfo.workingConditions }}</el-col>
                </el-row>
              </el-card>
              <div class="user-info-button">
                <el-button v-show="!userStore.isComplete" @click="router.push('/user-info')" type="primary">完善信息</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 20px;width: 100%"></div>
    </el-card>
    <div class="next-step">
      <el-button v-show="activeItem === 1" style="width: 150px;" @click="handleStepOneToTow" type="primary">下一步</el-button>

      <el-button v-show="activeItem === 2" style="width: 150px;" @click="handleStepTwoToOne" type="primary">上一步</el-button>
      <el-button v-show="activeItem === 2" style="width: 150px;" @click="handleStepTwoToThree" type="primary">下一步</el-button>

      <el-button v-show="activeItem === 3" style="width: 150px;" @click="handleStepThreeToOne" type="primary">重选考试</el-button>
      <el-button v-show="activeItem === 3" style="width: 150px;" @click="handleUserSignUp" type="primary">确认报名</el-button>
    </div>
  </div>
</template>

<style scoped>
.step{
  padding: 20px;
  height: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.step-content{
  min-height: 550px;

  .step-one{
    height: 100%;
    display: flex;
    padding: 10px 20px 0 20px;
    flex-direction: column;

    .select-test-place{
      min-height: 200px;

      .header{
        height: 20px;
        display: flex;
        justify-content: space-between;

        .title{
          display: flex;
        }

        .test-place-more{
          font-size: 15px;
          color: #999;
          display: flex;
          align-items: center;
        }
      }
      .content{
        min-height: 180px;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;

        .test-place-card{
          margin-top: 30px;
          width: 360px;
          height: 100px;
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          position: relative;

          .test-name{
            font-size: 18px;
            font-weight: bold;
          }

          .test-info{
            display: flex;
            margin-top: 10px;
            color: #606266;
            font-size: 13px;
            justify-content: space-between;
          }

          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(121, 187, 255, 0.3); /* Light blue overlay */
            z-index: 1;
          }
        }
      }
    }

    .select-test-time{
      height: 130px;

      .title{
        display: flex;
        height: 20px;
      }

      .content{
        min-height: 110px;
        padding: 10px;
        display: flex;

        .test-time-card{
          width: 210px;
          height: 40px;
          margin-right: 10px;
          position: relative;

          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(121, 187, 255, 0.3); /* Light blue overlay */
            z-index: 1;
          }
        }
      }
    }

    .show-sign-up-info{
      height: 150px;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      background-color: #E6E8EB;

      .info-title{
        font-size: 16px;
        font-weight: bold;
      }

      .info-item{
        margin-top: 10px;
        font-size: 15px;
        color: #606266;

        .test-num{
          font-weight: bold;
          color: #79bbff;
        }
      }
    }
  }

  .step-two{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 0 20px;

    .test-notice-title{
      height: 40px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    .test-notice-content{
      margin-top: 10px;
      min-height: 500px;
    }
  }

  .step-three{
    height: 100%;
    padding: 10px 20px 0 20px;

    .notice-info{
      height: 25px;
      display: flex;
      background-color: #E6E8EB;
    }

    .user-info{
      width: 500px;
      height: 100%;
      padding: 10px;

      .user-info-item{
        margin-top: 20px;
        display: flex;
        font-size: 15px;
        color: #606266;

        .user-info-item-title{
          font-weight: bold;
        }

        .user-info-item-content{
          margin-left: 10px;
        }
      }

      .user-info-button{
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }
}

.next-step{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>