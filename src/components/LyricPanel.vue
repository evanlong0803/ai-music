<script lang="ts" setup>
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();
</script>
<template>
  <div class="lyric">
    <div class="content" v-for="(item, index) in playerStore.lyric" :key="index">
      {{ item.content }}
    </div>
  </div>
</template>
<style lang="less" scoped>
.lyric {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #423e3ee3;
  .content {
    height: 100vh;
    width: 100%;
    overflow-x: auto;
    font-size: 30px;
    font-weight: 600;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    color: #fff;
  }
}
</style>
