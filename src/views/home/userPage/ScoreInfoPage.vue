<script setup>
import {onMounted, ref} from "vue";
import {userSignUpInfo} from "@/net/userApi/user/index.js";

const tableInfo = ref([])

const getTableInfo = () => {
  userSignUpInfo((data) => {
    tableInfo.value = [
      {
        header: '考生姓名',
        body: data.realName
      },
      {
        header: '民族',
        body: data.ethnicGroup
      },
      {
        header: '工作状态',
        body: data.workingConditions
      },
      {
        header: '分数',
        body: data.score
      },
      {
        header: '报名时间',
        body: data.registerTime
      },
      {
        header: '测试日期',
        body: data.testTime
      }
    ]
  })
}

onMounted(() => {
  getTableInfo()
})
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="margin-top: 25px">
      <div class="card-main">
        <div class="enrollment-info">
          <div class="info-content">
            <div class="info-content-header">
              <div style="width: 10px;height: 100%;background-color: #a0cfff;margin-right: 10px"></div>
              <el-text>考试成绩信息</el-text>
            </div>
            <div class="info-content-table">
              <div class="table-item" v-for="item in tableInfo">
                <div class="table-header">{{ item.header }}</div>
                <div class="table-body">{{ item.body }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-main{
  width: 100%;
  height: 700px;

  .enrollment-info{
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;

    .info-content{
      width: 1000px;
      height: 100%;
      padding: 50px;

      .info-content-header{
        display: flex;
        height: 29px;

        .el-text{
          font-size: 19px;
          font-weight: bold;
        }
      }

      .info-content-table{
        margin-top: 20px;
        width: 100%;
        height: 100%;
        border: 1px solid #CDD0D6;
        display: flex;
        flex-wrap: wrap;

        .table-item{
          width: 50%;
          height: 33.33333%;
          display: flex;

          .table-header{
            height: 100%;
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 17px;
            background-color: #DCDFE6;
            border: 1px solid #E6E8EB;
          }

          .table-body{
            width: 75%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            border: 1px solid #E6E8EB;
          }
        }
      }
    }
  }
}
</style>