<script setup lang="ts">
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();
</script>

<template>
  <footer class="app-footer" v-if="playerStore.playInfo.name">
    <player />
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
