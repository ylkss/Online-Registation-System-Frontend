<script setup>

import {Collection, Tickets} from "@element-plus/icons-vue";
import {ref} from "vue";

const activeItem = ref(0);

const isActive = (itemId) => {
  if(itemId === 1){
    return activeItem.value === 0 ? '-active' : '';
  }
  if(itemId === 2){
    return activeItem.value === 1 ? '-active' : '';
  }
};

const handleActive = () => {
  if (activeItem.value === 0) {
    activeItem.value = 1;
  } else {
    activeItem.value = 0;
  }
}

// 测试内容
const testContent = `# 测试内容
## 一、测试的名称、性质、方式
本测试名为“普通话水平测试”（PUTONGHUA SHUIPING CESHI，缩写为PSC)。

普通话水平测试测查应试人的普通话规范程度、熟练程度，认定其普通话水平等级，属于标准参照性考试。本大纲规定测试的内容、范围、题型及评分系统

普通话水平测试以口试方式进行。
## 二、测试内容和范围
普通话水平测试的内容包括普通话语音、词汇和语法。

普通话水平测试的范围是国家测试机构编制的《普通话水平测试用普通话词语表》《普通话水平测试用普通话与方言词语对照表》《普通话水平测试用普通话与方言常见语法差异对照表》《普通话水平测试用朗读作品》《普通话水平测试用话题》。

## 三、试卷构成和评分
目前，国内大部分地区测试的试卷由4个部分组成，满分为100分。

### (一)读单音节字词 普通话水平测试单音共有100个音节（不包括轻声、儿化音节），限时3.5分钟，共10分。

1. 目的：

测查应试人声母、韵母、声调读音标准程度。

2. 要求：

（1）100个音节中，70%选自《普通话水平测试用普通话词语表》“表一”，30%选自“表二”。

（2）100个音节中，每个声母出现次数一般不少于3次，每个韵母出现次数一般不少于2次，4个声调出现次数大致均衡。

（3）音节的排列要避免同一测试要素连续出现。

3. 评分：

（1）语音错误，每个音节扣0.1分；

（2）语音缺陷，每个音节扣0.05分；

（3）超时1分钟以内，扣0.5分，超时1分钟以上（含1分钟），扣1分。

### (二)读多音节词语

普通话水平测试多音字共有100个音节，限时2.5分钟，共20分。

1. 目的：

测试应试人声母、韵母、声调和变调、轻声、儿化读音的标准程度。

2. 要求：

（1）词语的70%选自《普通话水平测试用普通话词语表》“表一”，30%选自“表二”。

（2）声母、韵母、声调出现的次数与读单音节字词的要求相同。

（3）上声与上声相连的词语不少于3个，上声与非上声相连的词语不少于4个，轻声不少于3个，儿化不少于4个（应为不同的儿化韵母）。

（4）词语的排列要避免同一测试要素连续出现。

3. 评分：

（1）语音错误，每个音节扣0.2分。

（2）语音缺陷，每个音节扣0.1分。

（3）超时1分钟以内，扣0.5分，超时1分钟以上（含1分钟），扣1分。

### (三)朗读短文

普通话水平测试短文1篇，400个音节，限时4分钟，共30分。

1. 目的：

测试应试人使用普通话朗读书面作品的水平。在测查声母、韵母、声调、读音标准程度的同时，重点测查连续语流音变，停连、语调以及流畅程度。

2. 要求：

（1）短文从《普通话水平测试用朗读作品》中选取。

（2）评分以朗读作品的前400个音节（不含标点符号和括注的音节）为限。

3. 评分：

（1）每错1个音节，扣0.1分；漏读或增读1个音节，扣0.1分。

（2）声母或韵母的系统性语音缺陷，视程度扣0.5分、1分。

（3）语调偏误，视程度扣0.5分、1分、2分。

（4）停连不当，视程度扣0.5分、1分、2分。

（5）朗读不流畅（包括回读），视程度扣0.5分、1分、2分。

（6）超时扣1分。

### (四)命题说话

命题说话限时3分钟，共40分。

1. 目的：

测试应试人在无文字凭借的情况下说普通话的水平，重点测查语音标准程度，词汇语法规范程度和自然流畅程度。

2. 要求：

（1）说话话题从《普通话水平测试用话题》中选取，由应试人从给定的两个话题中选定1个话题,连续说一段话。

（2）应试人单向说话。如发现应试人有明显背稿、离题、说话难以继续等表现时，主试人应及时提示或引导

3. 评分：

（1）语音标准程度，共25分。分六档：

一档：语音标准，或极少有失误。扣0分、1分、2分。

二档：语音错误在10次以下，有方音但不明显。扣3分、4分。

三档：语音错误在10次以下，但方音比较明显；或语音错误在10次-15次，有方音但不明显。扣5分、6分。

四档：语音错误在10次-15次，方音比较明显。扣7分、8分。

五档：语音错误超过15次，方音明显。扣9分、10分、11分。

六档：语音错误多，方音重。扣12分、13分、14分。

（2）词汇语法规范程度，共10分。分三档：

一档：词汇、语法规范。扣0分。

二档：词汇、语法偶有不规范的情况。扣1分、2分。

三档：词汇、语法屡有不规范的情况。扣3分、4分。

（3）自然流畅度，共5分。分三档：

一档：语言自然流畅。扣0分。

二档：语言基本流畅，口语化较差，有背稿子的表现。扣0.5分、1分。

三档：语言不连贯，语调生硬。扣2分、3分。

（4）缺时扣分

说话不足3分钟，酌情扣分；

缺时1分钟以内（含1分钟），扣1分、2分、3分；

缺时1分钟以上，扣4分、5分、6分；说话不满30秒（含30秒），计0分。
`;
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="margin-top: 25px">
      <div class="card-main">
        <div style="border-right: #e6e6e6 solid 1px;">
          <div class="card-nav">
            <div @click="handleActive" :class="`card-nav-item` + isActive(1)">
              <el-icon style="margin-right: 10px"><Collection /></el-icon>
              <el-link :underline="false">报名流程</el-link>
            </div>
            <div @click="handleActive" :class="`card-nav-item` + isActive(2)">
              <el-icon style="margin-right: 10px"><Tickets /></el-icon>
              <el-link :underline="false">测试内容</el-link>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div v-show="activeItem === 0">
            <el-image style="width: 575px; height: 663px" src="public/images/bmlc.6f6047f4.png"/>
          </div>
          <div v-show="activeItem === 1">
          <v-md-preview :text="testContent"/>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-main{
  width: 100%;
  min-height: 780px;
  display: flex;

  .card-nav{
    width: 240px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;

    .card-nav-item{
      position: relative;
      width: 100%;
      font-size: 20px;
      display: flex;
      margin-bottom: 35px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .el-link{
        font-size: 20px;
        text-align: center;
      }

      .el-link:hover{
        background-color: transparent;
        font-size: 22px;
      }
    }

    .card-nav-item-active{
      position: relative;
      width: 100%;
      font-size: 22px;
      display: flex;
      margin-bottom: 35px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #4285f3;
      background-color: #ebf2fe;

      .el-link{
        font-size: 22px;
        text-align: center;
        color: #4285f3;
      }

      .el-link:hover{
        background-color: transparent;
      }
    }
  }

  .card-content{
    width: calc(100% - 240px);
    margin-top: 40px;
    padding: 0 20px 20px;
  }
}
</style>