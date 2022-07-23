<script lang="ts" setup>
import { EPlayerMode } from '@/types/enum';
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();

// 播放器音量
const volume = ref(50);

// 设置播放器默认值音量
playerStore.setVolume(volume.value);

watch(
  () => volume.value,
  val => {
    // 设置播放器音量
    playerStore.setVolume(val);
  },
);

// 当总时间被改变时
playerStore.audio.ondurationchange = e => {
  playerStore.durationTime = (<HTMLAudioElement>e.target).duration;
};

// 当时间更新时
playerStore.audio.ontimeupdate = e => {
  playerStore.currentTime = (<HTMLAudioElement>e.target).currentTime;
};

// 处理播放模式
const handlePlayMode = () => {
  switch (playerStore.playMode) {
    case EPlayerMode.sequence:
      playerStore.playNextAudio();
      break;
    case EPlayerMode.singleLoop:
      playerStore.playAudio();
      break;
    case EPlayerMode.random:
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
  <div class="w-1/1 z-99 fixed bottom-0 filter-blur">
    <v-progress />
    <!-- :model-value="playerStore.currentTime"
    :max="playerStore.durationTime"
    @change="val => (playerStore.audio.currentTime = val)"
    :format-tooltip="() => playerStore.getProgressTime" -->
    <div class="default-bg opacity-80">
      <div class="flex m-auto h-17 w-[80%] items-center">
        <div class="w-1/3 flex items-center space-x-5 text-left">
          <!-- 播放信息 -->
          <img class="aspect-square h-12 rounded shadow" :src="playerStore.playInfo?.al?.picUrl" />
          <div class="max-w-[70%] default-color text-sm space-y-1">
            <div class="text-xl font-bold truncate" :title="playerStore.playInfo?.name">
              {{ playerStore.playInfo?.name }}
            </div>
            <div class="truncate">
              {{ playerStore.playInfo?.ar[0]?.name }}
            </div>
          </div>
          <!-- 收藏 -->
          <ic-round-favorite-border
            class="icon text-2xl !text-red-500"
            v-if="!playerStore.collectState"
            @click="playerStore.collectState = !playerStore.collectState"
          />
          <ic-round-favorite
            class="icon text-2xl !text-red-600"
            v-else
            @click="playerStore.collectState = !playerStore.collectState"
          />
        </div>
        <div class="w-1/3 flex space-x-7 text-center justify-center items-center">
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
        <div class="w-1/3 flex text-right gap-x-5 items-center justify-end">
          <!-- 显示/隐藏播放列表 -->
          <ic-round-queue-music
            class="icon text-xl"
            @click="playerStore.playListState = !playerStore.playListState"
          />

          <!-- 播放模式 -->
          <cil-loop
            v-if="playerStore.playMode === EPlayerMode.sequence"
            class="icon text-xl"
            title="列表循环"
            @click="changeMode"
          />
          <cil-loop-1
            v-if="playerStore.playMode === 2"
            class="icon text-xl"
            title="单曲循环"
            @click="changeMode"
          />
          <cil-loop-circular
            v-if="playerStore.playMode === 3"
            class="icon text-xl"
            title="随机播放"
            @click="changeMode"
          />

          <!-- 声音控制 -->
          <ic-round-volume-up
            class="icon text-xl"
            v-if="!playerStore.mutedState"
            @click="playerStore.disableMute"
          />
          <ic-round-volume-off class="icon text-xl" @click="playerStore.enableMute" v-else />

          <!-- 声音进度条 -->
          <v-slider class="w-[100px]" v-model:value="volume" />

          <!-- 列出歌词 -->
          <ic-round-expand-less
            :class="[
              'icon text-2xl transition-all transform',
              playerStore.showLyric ? '-rotate-180' : 'rotate-0',
            ]"
            @click="playerStore.showLyric = !playerStore.showLyric"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 播放列表 -->
  <Transition name="play-list">
    <play-list />
  </Transition>

  <!-- 歌词面板 -->
  <Transition name="lyric">
    <lyric-panel v-if="playerStore.showLyric" :class="[playerStore.showLyric]" />
  </Transition>
</template>
<style scoped>
.play-list-enter-active {
  animation: play-list-in 0.5s ease-in-out;
}
.play-list-leave-active {
  animation: play-list-in 0.5s ease-in-out reverse;
}
@keyframes play-list-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
}

.lyric-enter-active {
  animation: lyric-in 0.5s ease-in-out;
}
.lyric-leave-active {
  animation: lyric-in 0.5s ease-in-out reverse;
}
@keyframes lyric-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
