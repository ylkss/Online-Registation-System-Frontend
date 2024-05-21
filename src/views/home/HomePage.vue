<script setup>

import {ArrowRight, ChatDotRound, DArrowRight, DocumentCopy, Printer, User} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {onMounted, reactive, ref} from "vue";
import {getTestNoticeList} from "@/net/userApi/testNotice/index.js";


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

const searchForm = reactive({
  pageNum: 1,
  pageSize: 6
})

const tableData = reactive({
  rows: [],
  total: 0
})
const showTestNotice = ref(false)

const handleGetTestNotice = () => {
  getTestNoticeList(searchForm, (data) => {
    tableData.rows = data.rows
    tableData.total = data.total
    showTestNotice.value = true
  })
}

onMounted(() => {
  handleGetTestNotice()
})
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
                <div class="hover-cursor" @click="router.push('/test-notice-more')">
                  更多 <el-icon><DArrowRight /></el-icon>
                </div>
              </div>
            </div>
          </el-header>
          <el-main>
            <div class="test-notice-main" v-show="showTestNotice">
              <div v-for="item in tableData.rows"  :key="item.id" class="test-notice-content">
                <div class="test-notice-content-text">
                  <el-link
                      @click="router.push({ path:'/test-notice', query: { id: item.id } })"
                      :icon="ArrowRight"
                      :underline="false">
                    {{ item.title }}
                  </el-link>
                </div>
                <div class="test-notice-content-time">
                  <el-text type="info" size="large">{{ item.formattedCreateTime }}</el-text>
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
              <div class="entrance-main-content-provinces-content" @click="router.push({path: '/sign-up', query: {province : province}})">{{ province }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--      考生服务-->
    <div class="service">
      <div class="service-header">
        <div class="service-header-title">
          考生服务
        </div>
      </div>
      <div class="service-main">
        <div @click="router.push('/registration-info')" class="service-main-item-4">
          <div class="regImg"><el-icon color="#6981a8" size="60"><Search /></el-icon></div>
          <div class="service-main-item-content">
            报名查询
          </div>
        </div>
        <div @click="router.push('/ticket-print')" class="service-main-item-5">
          <div class="regImg"><el-icon color="#6981a8" size="60"><Printer /></el-icon></div>
          <div class="service-main-item-content">
            准考证打印
          </div>
        </div>
        <div class="service-main-item-4">
          <div class="regImg"><el-icon color="#6981a8" size="60"><DocumentCopy /></el-icon></div>
          <div class="service-main-item-content">
            成绩查询
          </div>
        </div>
        <div @click="router.push({ path:'/test-instructions', query:{activeItem:2} })" class="service-main-item-5">
          <div class="regImg"><el-icon color="#6981a8" size="60"><User /></el-icon></div>
          <div class="service-main-item-content">
            联系测试站
          </div>
        </div>
        <div class="service-main-item-4">
          <div class="regImg"><el-icon color="#6981a8" size="60"><ChatDotRound /></el-icon></div>
          <div class="service-main-item-content">
            在线咨询
          </div>
        </div>
      </div>
    </div>

<!--    相关连接-->
    <div class="link">
      <div class="link-header">
        <div class="link-header-title">
          相关连接
        </div>
      </div>
      <div class="link-main">
        <div class="link-main-content">
          <div class="link-main-content-item">
            <el-link :underline="false"  href="http://www.china-language.edu.cn/" target="_blank">中国语言文字网</el-link>
          </div>
          <div class="link-main-content-item">
            <el-link :underline="false"  href="http://www.cltt.org/" target="_blank">国家普通话水平测试网</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-cursor:hover {
  cursor: pointer;
}
.el-link:hover{
  background-color: transparent;
}
.el-main{
  padding: 0;
}
.el-header{
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
            cursor: pointer;
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

.service{
  width: 100%;
  height: 193px;

  .service-header{
    height: 63px;
    background-color: #fde2e2;
    border-bottom: 2px solid #f89898;

    .service-header-title{
      margin-top: 2px;
      font-size: 35px;
      font-weight: bold;
      margin-left: 15px;
    }
  }

  .service-main{
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: space-between;
    padding: 30px 12px 40px;

    .service-main-item-4{
      width: 188px;
      height: 100%;
      display: flex;
      cursor: pointer;

      .regImg{
        width: 60px;
        height: 60px;
        margin-right: 16px;
      }

      .service-main-item-content{
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: bold;
        color: #6981a8;
      }
    }

    .service-main-item-5{
      width: 216px;
      height: 100%;
      display: flex;
      cursor: pointer;

      .regImg{
        width: 60px;
        height: 60px;
        margin-right: 16px;
      }

      .service-main-item-content{
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: bold;
        color: #6981a8;
      }
    }
  }
}

.link{
  width: 100%;
  height: 167px;

  .link-header {
    height: 63px;
    background-color: #faecd8;
    border-bottom: 2px solid #eebe77;

    .link-header-title {
      margin-top: 2px;
      font-size: 35px;
      font-weight: bold;
      margin-left: 15px;
    }
  }

  .link-main-content{
    width: 100%;
    height: 104px;
    padding: 30px 0;
    display: flex;

    .link-main-content-item{
      width: 200px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-link {
        font-size: 18px;
      }
    }
  }
}
</style>