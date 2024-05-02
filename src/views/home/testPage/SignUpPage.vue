<script setup>
import {onMounted, ref} from "vue";
import {getTestList} from "@/net/test/index.js";
import {useRoute} from "vue-router";
import {Check, DArrowRight, Location, UserFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {classifyTests, getTestTimeList} from "@/utils/TestListUtil.js";

const route = useRoute();
const province = route.query.province

const activeItem = ref(1);

// 被选中的测试
const selectedTest = ref(0)
// 被选中的测试时间
const selectedTestTime = ref(0)

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
    // 添加十个数据用以测试
    for(let i = 0; i < 10; i++){
      TestNameList.value.push(TestNameListData[0])
    }
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
    console.log(TestTimeList)
  }
}

const selectedTestInfo = ref({})

const handleSelectTestTime = (index) => {
  if(selectedTestTime.value === index){
    selectedTestTime.value = 0
  }else {
    selectedTestTime.value = index
    TestInfoList.value.find(item => {
      if(item.id === index){
        selectedTestInfo.value = item
      }
    })
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
        <div v-show="activeItem === 2" class="step-two">2</div>
        <div v-show="activeItem === 3" class="step-three">3</div>
      </div>
    </el-card>
    <div class="next-step">
      <el-button v-show="activeItem === 1" style="width: 150px;" @click="handleStepOneToTow" type="primary">下一步</el-button>
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
}

.next-step{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>