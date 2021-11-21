<script setup lang="ts">
import VueNextPlayer from '@/components/vue-next-player/index.vue';
</script>

<template>
  <a-layout-footer class="app-footer">
    <div class="player">
      <vue-next-player />
    </div>
  </a-layout-footer>
</template>

<style lang="less" scoped>
.app-footer {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: #bbbbbb0d;
  backdrop-filter: blur(40px);
}
.player {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
