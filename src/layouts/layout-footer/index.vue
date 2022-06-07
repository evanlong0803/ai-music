<script setup lang="ts">
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();
</script>

<template>
  <footer v-auto-animate>
    <player v-if="playerStore.playInfo.name" />
  </footer>
</template>
