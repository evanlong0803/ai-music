<script setup lang="ts">
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();
</script>

<template>
  <footer class="app-footer" v-if="playerStore.playInfo.name">
    <player />
  </footer>
</template>

<style lang="less" scoped>
.app-footer {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 10;
}
</style>
