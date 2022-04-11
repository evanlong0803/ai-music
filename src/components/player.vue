<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue';
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();

// 设置默认值音量
playerStore.audio.volume = 0.5;

// 当总时间被改变时
playerStore.audio.ondurationchange = e => {
  const el = e.target as HTMLAudioElement;
  playerStore.duration = el.duration;
};

// 当时间更新时
playerStore.audio.ontimeupdate = e => {
  const el = e.target as HTMLAudioElement;
  playerStore.currentTime = el.currentTime;
};

// 处理播放模式
const handlePlayMode = () => {
  switch (playerStore.playMode) {
    // 顺序播放
    case 1:
      playerStore.playNextAudio();
      break;
    // 单曲循环
    case 2:
      playerStore.playAudio();
      break;
    // 随机播放
    case 3:
      playerStore.randomPlay();
      break;
    default:
      playerStore.playNextAudio();
  }
};

// 播放完毕
playerStore.audio.onended = () => {
  playerStore.playState = false;
  handlePlayMode();
};

// 播放错误
playerStore.audio.onerror = () => {
  playerStore.suspendAudio();
  Notification.info({
    title: '播放提示',
    content: `《${playerStore.playInfo.name}》不能播放`,
    duration: 3000,
    closable: false,
  });
  handlePlayMode();
};

// 改变模式
const changeMode = () => {
  if (playerStore.playMode === 3) return (playerStore.playMode = 1);
  playerStore.playMode = ++playerStore.playMode;
};
</script>
<template>
  <a-slider
    class="progress"
    :model-value="playerStore.currentTime"
    :max="playerStore.duration"
    @change="val => (playerStore.audio.currentTime = val)"
    :format-tooltip="() => playerStore.getProgressTime"
  />
  <div class="player">
    <a-row class="audio">
      <a-col :span="8" class="left">
        <!-- 播放信息 -->
        <img :src="playerStore.playInfo?.al?.picUrl" />
        <div class="title">
          <a-typography-paragraph :ellipsis="{ rows: 1, showTooltip: true }">
            <div>{{ playerStore.playInfo?.name }}</div>
          </a-typography-paragraph>
          <a-typography-paragraph :ellipsis="{ rows: 1, showTooltip: true }">
            <div>{{ playerStore.playInfo?.ar[0]?.name }}</div>
          </a-typography-paragraph>
        </div>
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
        <!-- 播放下一首 -->
        <icon-skip-next-fill
          class="icon"
          style="font-size: 35px"
          @click="playerStore.playNextAudio"
        />
      </a-col>
      <a-col :span="8" class="right">
        <a-space :size="10">
          <!-- 收藏 -->
          <icon-heart class="icon" style="font-size: 20px" />
          <!-- 显示/隐藏播放列表 -->
          <mdi-playlist-music
            class="icon"
            style="font-size: 20px"
            @click="playerStore.playListState = !playerStore.playListState"
          />

          <!-- 播放模式 -->
          <cil-loop
            v-if="playerStore.playMode === 1"
            class="icon"
            style="font-size: 20px"
            @click="changeMode"
          />
          <cil-loop-1
            v-if="playerStore.playMode === 2"
            class="icon"
            style="font-size: 20px"
            @click="changeMode"
          />
          <cil-loop-circular
            v-if="playerStore.playMode === 3"
            class="icon"
            style="font-size: 20px"
            @click="changeMode"
          />

          <!-- 列出歌词 -->
          <ic-round-lyrics
            class="icon"
            style="font-size: 20px"
            @click="playerStore.showLyric = !playerStore.showLyric"
          />

          <!-- 声音控制 -->
          <icon-sound-fill
            class="icon"
            style="font-size: 20px"
            v-if="!playerStore.mutedState"
            @click="playerStore.disableMute"
          />
          <icon-mute class="icon" style="font-size: 20px" @click="playerStore.enableMute" v-else />

          <!-- 声音进度条 -->
          <a-slider
            :style="{ width: '100px' }"
            :default-value="50"
            @change="val => (playerStore.audio.volume = val / 100)"
          />
        </a-space>
      </a-col>
    </a-row>
  </div>
  <!-- 播放列表 -->
  <Transition name="play-list">
    <play-list />
  </Transition>
</template>
<style lang="less" scoped>
.play-list-enter-active {
  animation: play-list-in 0.3s ease-in-out;
}
.play-list-leave-active {
  animation: play-list-in 0.3s ease-in-out reverse;
}
@keyframes play-list-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

:deep(.arco-dropdown) {
  padding: 0;
  border: 0;
}
.progress {
  width: 100%;
  position: absolute;
  left: 0;
  top: -6px;
  z-index: 99;
}
.player {
  width: 100%;
  height: 100%;
  background-color: #6969690d;
  backdrop-filter: blur(20px);
}
.audio {
  margin: 0 auto;
  width: 80%;
  height: 100%;

  .left {
    width: 100%;
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
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: center;
      margin: 0 20px;
      > div {
        font-size: 12px;
        margin: 2px 0;
        &:nth-of-type(1) {
          width: 100%;
          font-size: 15px;
        }
        &:nth-of-type(2) {
          width: 100%;
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
