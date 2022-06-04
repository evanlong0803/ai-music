<script lang="ts" setup>
import { playerUseStore, homeUseStore } from '@/store';
const playerStore = playerUseStore();
const homeStore = homeUseStore();

defineProps<{
  title: string;
  lists: any[];
}>();

// 播放歌单
const playSongList = async (): Promise<void> => {
  // 获取歌单URL
  await playerStore.getUrl(playerStore.playList[0].id);
  playerStore.playAudio();
};
</script>

<template>
  <div class="space-y-10">
    <div class="text-2xl font-bold">{{ title }}</div>
    <div class="flex gap-x-10">
      <div class="flex-1 w-1/1 h-60 relative overflow-hidden rounded-2xl">
        <img class="rounded-2xl" :src="lists[0]?.picUrl" :alt="lists[0]?.name" />
        <div
          class="grid grid-cols-2 gap-7 text-6xl text-white font-bold absolute top-1/2 left-10 transform -translate-y-1/2"
        >
          <div>每</div>
          <div>日</div>
          <div>新</div>
          <div>歌</div>
        </div>
        <div class="" @click="playSongList">
          <!-- <icon-play-arrow-fill class="play-button-icon" /> -->
        </div>
      </div>
      <div class="flex-1">
        <!-- <img
        class=""
        src="https://p3.music.126.net/20i3iOypDSK_4hEKmYj2mg==/109951165975751486.jpg?param=512y512"
      /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-song-list {
  @keyframes coverAnimation {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

  .left-play-cover {
    animation: coverAnimation 30s ease-in-out 1s infinite alternate;
  }
}
</style>
