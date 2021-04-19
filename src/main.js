import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from './api/index'; // Axios
import filters from '../src/utils/filters.js'; // 全局过滤器
import APlayer from '@moefe/vue-aplayer'; // 音乐播放器

import './plugins/element.js'; // ElementUI插件

import './assets/icon/iconfont.css'; // 阿里矢量图标
import 'nprogress/nprogress.css'; // 进度条样式
import './assets/css/global.css'; // 全局CSS样式

Vue.use(filters);
Vue.use(APlayer, {
	defaultCover: 'https://q1.qlogo.cn/g?b=qq&nk=1206993746&s=5', // 设置默认封面
	productionTip: false, // 关闭生产提示
});

// 将axios添加至Vue原型
Vue.prototype.$api = api;

// 关闭生产提示
Vue.config.productionTip = false;
// 关闭调试工具的版本提示
// Vue.config.devtools = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
