import { createApp } from 'vue';

// import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import '@/styles/index.css';
import 'virtual:windi-utilities.css';
import 'virtual:windi-devtools';

import App from './App.vue';
import router from '@/router';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

createApp(App).use(router).use(createPinia()).use(autoAnimatePlugin).mount('#app');
