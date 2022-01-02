<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue';
import PlayList from './PlayList.vue';
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();

// 播放完毕
playerStore.audio.onended = () => {
  playerStore.playState = false;
};

// 播放错误
playerStore.audio.onerror = () => {
  playerStore.playState = false;
  Notification.info({
    title: '播放提示',
    content: '该音乐有版权，暂时无法播放',
    duration: 3000,
    closable: false,
  });
};
</script>
<template>
  <a-slider :default-value="playerStore.audio.duration" class="progress" />
  <a-row class="audio">
    <a-col :span="8" class="left">
      <img :src="playerStore.playInfo?.al?.picUrl" />
      <div class="title">
        <div>{{ playerStore.playInfo?.name }}</div>
        <div>{{ playerStore.playInfo?.al?.name }}</div>
      </div>
      <icon-heart class="icon" style="font-size: 20px" />
    </a-col>
    <a-col :span="8" class="center">
      <!-- 播放上一首 -->
      <icon-skip-previous-fill
        class="icon"
        style="font-size: 35px"
        @click="playerStore.playUpperAudio"
      />
      <!-- 播放/暂停 -->
      <icon-play-arrow-fill
        class="icon"
        style="font-size: 35px; margin: 0 10px"
        @click="playerStore.playAudio"
        v-if="!playerStore.playState"
      />
      <icon-pause
        class="icon"
        style="font-size: 35px; margin: 0 10px"
        @click="playerStore.suspendAudio"
        v-else
      />
      <!-- <icon-pause class="icon" style="font-size: 35px" /> -->
      <!-- 播放下一首 -->
      <icon-skip-next-fill
        class="icon"
        style="font-size: 35px"
        @click="playerStore.playNextAudio"
      />
    </a-col>
    <a-col :span="8" class="right">
      <a-space :size="10">
        <icon-select-all class="icon" style="font-size: 20px" />
        <play-list />
        <icon-sound-fill
          class="icon"
          style="font-size: 20px"
          v-if="!playerStore.mutedState"
          @click="playerStore.disableMute"
        />
        <icon-mute class="icon" style="font-size: 20px" @click="playerStore.enableMute" v-else />
        <a-slider v-model:model-value="playerStore.audio.volume" :style="{ width: '100px' }" />
        <icon-up class="icon" style="font-size: 20px" />
      </a-space>
    </a-col>
    <icon-select-all />
  </a-row>
</template>
<style lang="less" scoped>
:deep(.arco-dropdown) {
  padding: 0;
  border: 0;
}
.progress {
  width: 100%;
  position: absolute;
  left: 0;
  top: -6px;
}
.audio {
  width: 100%;
  height: 100%;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    > img {
      width: 46px;
      height: 46px;
      border-radius: 5px;
    }
    .title {
      height: 100%;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: center;
      margin: 0 20px;
      > div {
        font-size: 12px;
        margin: 2px 0;
        &:nth-of-type(1) {
          font-size: 15px;
        }
        &:nth-of-type(2) {
          color: #7a7a7b;
        }
      }
    }
  }
  .center {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
