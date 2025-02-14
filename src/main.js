import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "@/router/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";

// v-md-preview组件引入
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
// highlight.js
import highlight from 'highlight.js';

import {createPinia} from "pinia";

import print from 'vue3-print-nb'

VMdPreview.use(githubTheme, {
    Hljs: highlight,
});


axios.defaults.baseURL = 'http://127.0.0.1:8081'

const pinia = createPinia()

const app = createApp(App)


app.use(ElementPlus)
app.use(router)
app.use(VueMarkdownEditor)
app.use(VMdPreview)
app.use(print)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
