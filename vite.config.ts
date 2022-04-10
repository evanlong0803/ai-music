import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/pages',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        'pinia',
        // '@vueuse/core',
      ],
      dts: 'src/types/auto-import.d.ts',
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [ArcoResolver()],
      dts: 'src/types/components.d.ts',
    }),
  ],
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
