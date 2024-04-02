<script setup>

import {DArrowRight} from "@element-plus/icons-vue";

const provinces = [
  "北京", "天津", "山西", "河北",
  "内蒙古", "辽宁", "吉林", "黑龙江",
  "上海", "江苏", "浙江", "安徽",
  "福建", "江西", "山东", "河南",
  "湖北", "湖南", "广东", "广西",
  "海南", "重庆", "四川", "贵州",
  "云南", "西藏", "陕西", "甘肃",
  "青海", "宁夏", "新疆", "新疆兵团"
];
</script>

<template>
  <div>
    <div class="sign-up">
<!--      测试计划展示-->
      <div class="play">
        <el-container>
          <el-header>
            <div class="test-notice">
              <div class="test-notice-title">
                测试计划
              </div>
              <div class="test-notice-more">
                <div>
                  更多 <el-icon><DArrowRight /></el-icon>
                </div>
              </div>
            </div>
          </el-header>
          <el-main>
            <div class="test-notice-main">
              <div v-for="n in 6"  :key="n" class="test-notice-content">
                <div class="test-notice-content-text">
                  <el-link :underline="false">黎明职业大学普通话水平测试站5月份测试计划</el-link>
                </div>
                <div class="test-notice-content-time">
                  <el-text type="info" size="large">2024-02-25</el-text>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
<!--      报名入口-->
      <div class="entrance">
        <div class="entrance-header">
          <div class="entrance-header-title">
            报名入口
          </div>
        </div>
        <div class="entrance-main">
          <div class="entrance-main-content">
            <div v-for="province in provinces" :key="province" class="entrance-main-content-provinces-button">
              <div class="entrance-main-content-provinces-content">{{ province }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-link:hover{
  background-color: transparent;
}
.el-main{
  padding: 0;
}

.sign-up{
  width: 100%;
  height: 525px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .play{
    width: 791px;
    height: 522px;

    .test-notice{
      display: flex;
      justify-content: space-between;
      background-color: #e1f3d8;
      border-bottom: 2px solid #95d475;

      .test-notice-title{
        margin-top: 2px;
        font-size: 35px;
        font-weight: bold;
        margin-left: 15px;
        width: 80%;
      }

      .test-notice-more{
        font-size: 15px;
        color: #999;
        display: flex;
        align-items: center;
      }
    }

    .test-notice-main{
      height: 442px;
      margin-top: 0;

      .test-notice-content{
        display: flex;
        margin-top: 20px;
        padding: 0 20px;
        justify-content: space-between;
        width: 100%;

        .test-notice-content-text{
          .el-link{
            font-size: 19px;
          }
        }
      }
    }
  }

  .entrance{
    width: 390px;
    height: 525px;

    .entrance-header{
      width: 100%;
      height: 60px;
      background-color: #d9ecff;
      border-bottom: 2px solid #79bbff;

      .entrance-header-title{
        font-size: 35px;
        margin-top: 2px;
        font-weight: bold;
        margin-left: 15px;
      }
    }

    .entrance-main{
      height: 450px;
      width: 100%;

      .entrance-main-content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 15px;

        .entrance-main-content-provinces-button{
          width: 25%;
          padding: 8px 7px 8px 7px;
          height: 52px;

          .entrance-main-content-provinces-content{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #79bbff;
          }

          .entrance-main-content-provinces-content::after{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3); /* 这是一个半透明的黑色遮罩，你可以根据需要调整颜色和透明度 */
            opacity: 0;
            transition: opacity 0.3s ease; /* 这会使得遮罩的出现和消失有一个过渡效果 */
          }

          .entrance-main-content-provinces-content:hover::after{
            opacity: 1; /* 当鼠标悬停时，使得遮罩完全不透明 */
          }
        }
      }
    }
  }
}
</style>