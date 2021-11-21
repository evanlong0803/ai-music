import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api/trans': {
        target: 'https://fanyi-api.baidu.com',
        changeOrigin: true,
      },
    },
  },
});
