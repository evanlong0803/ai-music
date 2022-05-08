// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

import routes from '~pages';

import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes,
});
