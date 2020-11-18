import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';

// 全局过滤器
import filters from '../src/utils/filters.js';
Vue.use(filters);

// 阿里矢量图标
import './assets/icon/iconfont.css';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// axios
import axios from 'axios';

// 跨域请求时要使用凭证
// axios.defaults.withCredentials = true;

// 配置基础路径
axios.defaults.baseURL = 'http://120.27.1.91:3000/';

// axios开始拦截
axios.interceptors.request.use(config => {
    NProgress.start(); // 开启进度条
    return config;
});

// axios结束拦截
axios.interceptors.response.use(config => {
    NProgress.done(); // 关闭进度条
    return config;
});

// 将axios添加至Vue的原型中的
Vue.prototype.$axios = axios;

// 全局CSS样式
import './assets/css/global.css';

// 音乐播放器
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
    defaultCover: 'https://q1.qlogo.cn/g?b=qq&nk=1206993746&s=5', // 设置默认封面
    productionTip: false // 关闭生产提示
});

// 关闭生产提示
Vue.config.productionTip = false;
// 关闭调试工具的版本提示
// Vue.config.devtools = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
