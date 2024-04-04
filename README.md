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

### axios
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

#### 安装
```shell
npm install axios --save
```

### v-md-preview 进阶版
v-md-preview 进阶版可以简单实现前端markdown语法展示和编辑。
进阶版编辑器左侧编辑区域使用 CodeMirror (opens new window)实现。

优点：

- 可以根据 CodeMirror 提供的 Api 来自定义扩展编辑区域功能，提高编辑体验。

缺点：

- 文件体积远大于轻量版

#### 编辑器引入
```javascript
import { createApp } from 'vue';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(/*...*/);

app.use(VMdEditor);
```

#### 使用编辑器
```vue
<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
};
</script>
```

#### 预览组件安装
```shell
# use npm
npm i @kangc/v-md-editor -S

# use yarn
yarn add @kangc/v-md-editor
```

#### 预览组件导入
```javascript
import { createApp } from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(/*...*/);

app.use(VMdPreview);
```
#### 预览组件使用
```vue
<template>
  <v-md-preview :text="text"></v-md-preview>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      };
    },
  };
</script>
```