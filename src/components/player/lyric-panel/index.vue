<script lang="ts" setup>
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();
</script>
<template>
  <div class="lyric">
    <div class="video-box">
      <video
        class="video-background"
        preload="auto"
        loop
        playsinline
        autoplay
        src="@/static/background.mp4"
        tabindex="-1"
        muted
      ></video>
      <div class="content" v-for="(item, index) in playerStore.lyric" :key="index">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.lyric {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow: auto;
}

.video-box {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-box::after {
  content: '';
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(40px);
}

.video-background {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
}
.content {
  line-height: 70px;
  position: relative;
  z-index: 15;
  top: -55vh;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  text-align: center;
}
</style>
