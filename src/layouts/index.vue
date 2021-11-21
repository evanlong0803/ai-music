<script lang="ts" setup>
import LayoutHeader from '@/layouts/layoutHeader/index.vue';
import LayoutMain from '@/layouts/LayoutMain/index.vue';
import LayoutFooter from '@/layouts/layoutFooter/index.vue';

// 统一加载othen数据
import searchUseStore from '@/store/modules/search';
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <a-layout>
    <LayoutHeader />
    <LayoutMain />
    <LayoutFooter />
  </a-layout>
</template>
