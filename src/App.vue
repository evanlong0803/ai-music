<script lang="ts" setup>
import LayoutHeader from '@/layouts/layout-header/index.vue';
import LayoutFooter from '@/layouts/layout-footer/index.vue';

// 统一加载 other 数据
import { searchUseStore } from '@/store';
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <main class="default-bg">
    <LayoutHeader />
    <router-view class="m-auto py-10 w-[80%]" />
    <LayoutFooter />
  </main>
</template>
