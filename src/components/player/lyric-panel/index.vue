<script lang="ts" setup>
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();
</script>
<template>
  <div class="fixed z-10 top-17 bottom-17 left-0 right-0 filter-blur">
    <div class="h-1/1 default-bg opacity-80">
      <div
        class="w-1/1 h-1/1 overflow-auto py-15 space-y-10 absolute-center text-2xl default-color font-bold text-center"
      >
        <div v-for="(item, index) in playerStore.lyric" :key="index">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
