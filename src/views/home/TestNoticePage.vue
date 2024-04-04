<script setup>
import {useRoute} from "vue-router";
import {DArrowLeft} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const route = useRoute();
const id = route.query.id;
const text = `# 测试计划
dasda
 ## dasda dadad
 # online-register-system

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

\`\`\`sh
npm install
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
npm run dev
\`\`\`

### Compile and Minify for Production

\`\`\`sh
npm run build
\`\`\`

## 项目前端框架依赖
项目中使用的所有前端框架依赖如下：

### Element-Plus
Element-Plus 是一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。

#### 安装
\`\`\`shell
npm install element-plus --save
\`\`\`
 `
</script>

<template>
  <div class="test-notice">
    <el-card style="margin-top: 25px">
      <div class="test-notice-title">
        <div @click="router.push('/')" class="title-back"><el-icon size="12"><DArrowLeft /></el-icon>返回</div>
        <div class="title-main">
          <div class="title-content">测试计划</div>
          <div class="time">2024-02-12</div>
        </div>
      </div>
      <div class="test-notice-content">
        <v-md-preview :text="text"></v-md-preview>
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