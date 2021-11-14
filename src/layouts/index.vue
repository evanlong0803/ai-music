<script lang="ts" setup>
import { useLoadingBar, useNotification } from 'naive-ui';
import LayoutHeader from '@/layouts/layoutHeader/index.vue';
import LayoutMain from '@/layouts/LayoutMain/index.vue';
import LayoutFooter from '@/layouts/layoutFooter/index.vue';
globalThis.$loadingBar = useLoadingBar();
globalThis.$notification = useNotification();

// 统一加载othen数据
import searchUseStore from '@/store/modules/search';
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <n-layout style="height: 100vh">
    <LayoutHeader />
    <LayoutMain />
    <LayoutFooter />
  </n-layout>
</template>
