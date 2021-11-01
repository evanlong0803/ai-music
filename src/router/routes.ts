import Home from '@/pages/Home/index.vue';
// import About from '@/pages/About.vue';
import NotFound from '@/pages/Error/NotFound.vue';

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: '首页' } },
  {
    name: 'Find',
    path: '/find',
    meta: { title: '发现' },
    component: () => import('@/pages/Find/index.vue'),
  },
  {
    name: 'Library',
    path: '/library',
    meta: { title: '音乐库' },
    component: () => import('@/pages/Library/index.vue'),
  },
  { path: '/:path(.*)', component: NotFound },
];
