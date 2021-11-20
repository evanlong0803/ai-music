<script setup lang="ts">
import VueNextPlayer from '@/components/vue-next-player/index.vue';
</script>

<template>
  <n-layout-footer position="absolute" style="height: 64px" bordered>
    <vue-next-player />
  </n-layout-footer>
</template>

<style lang="less" scoped>
.app-footer {
  // background-color: #ffffff0d !important;
  // backdrop-filter: blur(20px) !important;
}
</style>
