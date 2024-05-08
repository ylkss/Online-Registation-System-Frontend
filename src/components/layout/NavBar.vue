<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/store/index.js";

const activeTab = ref('home');

const userStore = useUserStore();

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

const handleTabClick = (tab) => {
  if(tab.paneName === activeTab.value) return;
  if(tab.paneName === 'signUp') {
    // 查看用户的ip来源访问地区  IP来源示例 -> 中国|山西省|太原市|移动
    const ip = userStore.user.ipSource;
    const ipSourceArray = ip.split('|');
    const processedArray = ipSourceArray.map(item => item.replace("省", "").replace("市", ""));
    // 如果用户的ip来源访问地区不在省份列表中，则跳转到首页
    router.push('/');
    // 遍历省份列表，如果用户的ip来源访问地区在省份列表中，则跳转到报名页面
    for(let i = 0; i < processedArray.length; i++) {
      if(provinces.includes(processedArray[i])) {
        router.push({name: tab.paneName, query: {province: processedArray[i]}});
        return;
      }
    }
    return;
  }
  router.push({name: tab.paneName});
}
</script>

<template>
  <div class="NavBar">
    <div class="tabs">
      <el-tabs v-model="activeTab" stretch @tab-click="handleTabClick">
        <el-tab-pane label="首页" name="home"></el-tab-pane>
        <el-tab-pane label="在线报名" name="signUp"></el-tab-pane>
        <el-tab-pane label="报名查询" name="registrationInfo"></el-tab-pane>
        <el-tab-pane label="准考证打印" name="ticketPrint"></el-tab-pane>
        <el-tab-pane label="成绩查询" name="scoreInquiry"></el-tab-pane>
        <el-tab-pane label="测前须知" name="testInstructions"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.NavBar{
  height: 55px;
  width: 1200px;
}
</style>