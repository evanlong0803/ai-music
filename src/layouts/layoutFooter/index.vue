<script setup lang="ts">
import VueNextPlayer from '@/components/vue-next-player/index.vue';
</script>

<template>
  <footer class="app-footer">
    <div class="player">
      <vue-next-player />
    </div>
  </footer>
</template>

<style lang="less" scoped>
.app-footer {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: #6969690d;
  backdrop-filter: blur(20px);
}
.player {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
