<script lang="ts" setup>
import { playerUseStore } from '@/store';
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
  // Notification.info({
  //   title: '播放提示',
  //   content: `《${playerStore.playInfo.name}》不能播放`,
  //   duration: 3000,
  //   closable: false,
  // });
  handlePlayMode();
};

// 改变模式
const changeMode = () => {
  if (playerStore.playMode === 3) return (playerStore.playMode = 1);
  playerStore.playMode = ++playerStore.playMode;
};
</script>
<template>
  <!-- <div
    class="progress"
    :model-value="playerStore.currentTime"
    :max="playerStore.duration"
    @change="val => (playerStore.audio.currentTime = val)"
    :format-tooltip="() => playerStore.getProgressTime"
  ></div> -->
  <div class="w-1/1 z-10 fixed bottom-0 filter-blur">
    <div class="default-bg opacity-80">
      <div class="flex m-auto h-17 w-[80%] items-center">
        <div class="flex-1 flex space-x-2 text-left">
          <!-- 播放信息 -->
          <img
            class="aspect-square h-12 mr-4 rounded shadow"
            :src="playerStore.playInfo?.al?.picUrl"
          />
          <div class="default-color">
            <div>{{ playerStore.playInfo?.name }}</div>
            <div>{{ playerStore.playInfo?.ar[0]?.name }}</div>
          </div>
        </div>
        <div class="flex-2 flex space-x-7 text-center justify-center items-center">
          <!-- 播放上一首 -->
          <ic-round-skip-previous class="icon" @click="playerStore.playUpperAudio" />
          <!-- 播放/暂停 -->
          <ic-round-play-arrow
            class="icon"
            @click="playerStore.playAudio"
            v-if="!playerStore.playState"
          />
          <ic-round-pause class="icon" @click="playerStore.suspendAudio" v-else />
          <!-- 播放下一首 -->
          <ic-round-skip-next class="icon" @click="playerStore.playNextAudio" />
        </div>
        <div class="flex flex-1 text-right gap-x-4 items-center justify-end">
          <!-- 收藏 -->
          <div class="icon" />
          <!-- 显示/隐藏播放列表 -->
          <mdi-playlist-music
            class="icon text-2xl"
            @click="playerStore.playListState = !playerStore.playListState"
          />

          <!-- 播放模式 -->
          <cil-loop
            v-if="playerStore.playMode === 1"
            class="icon text-2xl"
            title="列表循环"
            @click="changeMode"
          />
          <cil-loop-1
            v-if="playerStore.playMode === 2"
            class="icon text-2xl"
            title="单曲循环"
            @click="changeMode"
          />
          <cil-loop-circular
            v-if="playerStore.playMode === 3"
            class="icon text-2xl"
            title="随机播放"
            @click="changeMode"
          />

          <!-- 列出歌词 -->
          <ic-round-lyrics
            class="icon text-2xl"
            @click="playerStore.showLyric = !playerStore.showLyric"
          />

          <!-- 声音控制 -->
          <div class="icon" v-if="!playerStore.mutedState" @click="playerStore.disableMute" />
          <div class="icon" @click="playerStore.enableMute" v-else />

          <!-- 声音进度条 -->
          <div
            :style="{ width: '100px' }"
            :default-value="50"
            @change="val => (playerStore.audio.volume = val / 100)"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- 播放列表 -->
  <Transition name="play-list">
    <play-list />
  </Transition>
</template>
<style scoped>
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
          font-weight: 600;
        }
        &:nth-of-type(2) {
          width: 100%;
          color: #7a7a7b;
          font-weight: 600;
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
