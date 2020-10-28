import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 阿里矢量图标
import './assets/icon/iconfont.css'

// 全局过滤器（时间）
import filters from '../src/utils/filters.js'
Vue.use(filters)

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios
import axios from 'axios'

axios.defaults.baseURL = 'https://musicapi.123mtr.top'

// axios.defaults.withCredentials = true;

// axios开始拦截
axios.interceptors.request.use(config => {
    NProgress.start() // 开启进度条
    return config
})

// axios结束拦截
axios.interceptors.response.use(config => {
    NProgress.done() // 关闭进度条
    return config
})

Vue.prototype.$axios = axios

// 全局CSS样式
import './assets/css/global.css'

// 播放器
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
Vue.use(AudioPlayer)

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
