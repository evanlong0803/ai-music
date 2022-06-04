<script lang="ts" setup>
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();

// 播放歌单
const onPlayList = async (id: string): Promise<void> => {
  // 获取歌单URL
  await playerStore.getUrl(id);
  playerStore.playAudio();
};
</script>

<template>
  <div class="play-card" v-if="playerStore.playListState">
    <div class="title">播放列表</div>
    <div
      class="icon"
      style="font-size: 20px"
      @click="playerStore.playListState = !playerStore.playListState"
    ></div>
    <div v-if="playerStore.playList.length">
      <template
        v-for="item in playerStore.playList"
        :key="item.id"
        :class="[playerStore.playInfo.id === item.id && 'current-play', 'song']"
        @click="onPlayList(item.id)"
      >
        <div>
          <img alt="avatar" :src="item?.al.picUrl" />
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item?.al.name }}</div>
          </div>
        </div>
        <div v-if="playerStore.playInfo.id === item.id">
          <!-- <icon-sound style="font-size: 20px" /> -->
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
:deep(.arco-list-item-meta-title) {
  font-weight: bold;
}

.play-card {
  background-color: #2e2d2d75;
  backdrop-filter: blur(20px);
  border-radius: 8px;
  width: 450px;
  height: 400px;
  position: absolute;
  bottom: 65px;
  right: 0;
  .title {
    font-weight: bold;
  }
  .song {
    cursor: pointer;
    &:hover {
      background-color: #5a56563f;
    }
  }
}
.current-play {
  background-color: #5a56563f;
}
</style>
