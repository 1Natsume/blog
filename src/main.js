import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'
import '@/assets/scss/global.scss'
import '@/assets/font/icon/iconfont.css'
import '@/assets/font/lol/fclol.css'
import "@/assets/css/reset.css"
import hljs from '@/assets/lib/highlight/highlight.index'
import blogUtils from "@/utils/BlogUtils";
import blogKit from "@/utils/BlogKit";
import blogShade from "@/utils/BlogShade";
import bus from '@/utils/mitt'

const app = createApp(App)
// 创建axios实例并配置
//app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = bus
app.use(router).use(store)
app.directive('highlight', function (el) {
    let pres = el.querySelectorAll('pre');
    pres.forEach((pre) => {
      blogUtils.initPreCodeCopyBtn(pre);
    })
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block, index) => {
      setTimeout(() => {
        if (!block.highInit) {
          block.highInit = true;
          hljs.initHighlighting();
        }
      }, index * 250);
    })
  })
app.mount('#app')