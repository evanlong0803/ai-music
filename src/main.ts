import { createApp } from 'vue';
import '@/styles/index.less';

// import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import 'virtual:windi.css';
import 'virtual:windi-devtools';

import App from './App.vue';
import router from '@/router';
import store from '@/store';

createApp(App).use(router).use(store).mount('#app');
