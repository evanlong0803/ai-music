import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [
    vue({
      // 可以使用 $ref() 来代替 ref()，好处是不用再写 xxx.value
      reactivityTransform: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/pages',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', 'pinia', '@vueuse/core'],
      dts: 'src/types/auto-import.d.ts',
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: 'src/types/components.d.ts', // path to d.ts file
      deep: true, // search for subdirectories
      allowOverrides: true, // allow override components
    }),

    WindiCSS(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api/trans': {
        target: 'https://fanyi-api.baidu.com',
        changeOrigin: true,
      },
    },
  },
});
