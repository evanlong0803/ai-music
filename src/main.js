import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';

// 全局CSS样式
import './css/global.css';

// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://musicapi.123mtr.top/';
Vue.prototype.$axios = axios;

// 全局过滤器（时间）
import filters from '../src/utils/filters.js';
Vue.use(filters);

// 关闭生产提示
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
