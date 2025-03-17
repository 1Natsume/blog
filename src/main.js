import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import '@/assets/font/icon/iconfont.css'
import '@/assets/font/lol/fclol.css'
import "@/assets/css/reset.css"
//import hljs from '@/assets/lib/highlight/highlight.index'
import blogUtils from "@/utils/BlogUtils";
import blogKit from "@/utils/BlogKit";
import blogShade from "@/utils/BlogShade";
import bus from '@/utils/mitt'
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljs from "highlight.js";
import "@/assets/scss/theme/style.scss";
import "@/assets/scss/theme/style0.scss";
import "@/assets/scss/theme/handsome.scss";
import "static/logo/logo.css";
import $ from "jquery";

const app = createApp(App)
// 创建axios实例并配置
//app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = bus
window.$ = window.jQuery = $

app.use(router).use(store)
app.directive('highlight', function (el) {
  let pres = el.querySelectorAll('pre');
  pres.forEach((pre) => {
    blogUtils.initPreCodeCopyBtn(pre);
  })
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block, index) => {
    
    hljs.highlightElement(block);
    block.removeAttribute('data-highlighted')
    // setTimeout(() => {
    //   if (!block.highInit) {
        
    //     block.highInit = true;
    //     hljs.initHighlighting();
        
    //     block.setAttribute('style', 'margin-top: 8px;');
    //     hljs.highlightBlock(block)
    //   }
    // }, index * 250);

  })
})

app.mount('#app')