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
    <LayoutFooter />
    <Transition name="lyric">
      <lyric-panel v-if="playerStore.showLyric" />
    </Transition>
  </a-layout>
</template>

<style lang="less" scoped>
.lyric-enter-active {
  animation: lyric-in 0.3s ease-in-out;
}
.lyric-leave-active {
  animation: lyric-in 0.3s ease-in-out reverse;
}
@keyframes lyric-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
