<script setup lang="ts">
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();
</script>

<template>
  <footer>
    <Teleport to="body">
      <player v-if="playerStore.playInfo.name" />
    </Teleport>
  </footer>
</template>
