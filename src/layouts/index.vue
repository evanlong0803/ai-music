<script lang="ts" setup>
import LayoutHeader from '@/layouts/layoutHeader/index.vue';
import LayoutMain from '@/layouts/LayoutMain/index.vue';
import LayoutFooter from '@/layouts/layoutFooter/index.vue';

// 统一加载othen数据
import searchUseStore from '@/store/modules/search';
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <a-layout>
    <LayoutHeader />
    <LayoutMain />
    <lyric-panel v-if="playerStore.showLyric" />
    <LayoutFooter />
  </a-layout>
</template>
