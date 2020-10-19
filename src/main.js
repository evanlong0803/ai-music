import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';

// 全局CSS样式
import './css/global.css';

// 关闭生产提示
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');