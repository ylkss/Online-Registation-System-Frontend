# online-register-system

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 项目前端框架依赖
项目中使用的所有前端框架依赖如下：

### Element-Plus
Element-Plus 是一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。

#### 安装
```shell
npm install element-plus --save
```

#### 完整引入
```javascript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

### vue-router
Vue Router 是 Vue.js 官方的路由管理器。结合 Vue.js，我们可以非常简单易用的构建单页应用程序。

#### 安装
```shell
npm install vue-router@4 --save
```

### el-icon
Element Plus 提供了一套常用的图标集合。

#### 安装
```shell
npm install @element-plus/icons-vue --save
```

#### 注册所有图标
您需要从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
```javascript
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```