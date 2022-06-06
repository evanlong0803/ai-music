<script lang="ts" setup>
import LayoutHeader from '@/layouts/layout-header/index.vue';
import LayoutFooter from '@/layouts/layout-footer/index.vue';

// 统一加载 other 数据
import { searchUseStore, playerUseStore } from '@/store';
const playerStore = playerUseStore();
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <main class="default-bg">
    <LayoutHeader />
    <router-view class="m-auto py-25 w-[80%]" />
    <LayoutFooter />
    <Transition name="lyric">
      <lyric-panel v-if="playerStore.showLyric" />
    </Transition>
  </main>
</template>

<style scoped>
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
