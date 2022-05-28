<script lang="ts" setup>
import LayoutHeader from '@/layouts/layout-header/index.vue';
import LayoutMain from '@/layouts/Layout-main/index.vue';
import LayoutFooter from '@/layouts/layout-footer/index.vue';

// 统一加载othen数据
import searchUseStore from '@/store/modules/search';
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <main class="light:(bg-gray-100) dark:(bg-gray-300)">
    <LayoutHeader />
    <LayoutMain class="m-auto py-20 w-[80%]" />
    <LayoutFooter />
    <Transition name="lyric">
      <lyric-panel v-if="playerStore.showLyric" />
    </Transition>
  </main>
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
