import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue';
// createApp().use(router).use(store).mount('#app')
console.log(1)
const app = createApp(App)

// 创建axios实例并配置
app.config.globalProperties.$axios = axios
app.use(router)
    .use(store)
    .mount('#app')