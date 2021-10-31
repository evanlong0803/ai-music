import { createApp } from 'vue';
import naive from 'naive-ui';
import '@/styles/index.less';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

import App from './App.vue';
import router from '@/router';
import store from '@/store';

const app = createApp(App);

app.use(naive);
app.use(router);
app.use(store);
app.mount('#app');
