<script lang="ts" setup>
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();

// 播放歌单
const playList = async (id: string): Promise<void> => {
  // 获取歌单URL
  await playerStore.getUrl(id);
  playerStore.playAudio();
};
</script>
<template>
  <a-list class="play-list" v-if="playerStore.playList.length">
    <a-list-item
      v-for="item in playerStore.playList"
      :key="item.id"
      style="cursor: pointer"
      @click="playList(item.id)"
    >
      <a-list-item-meta :title="item.name" :description="item?.al.name">
        <template #avatar>
          <a-avatar shape="square">
            <img alt="avatar" :src="item?.al.picUrl" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  <div class="play-list-one"></div>
</template>
<style lang="less" scoped>
.play-list-one {
  width: 450px;
  height: 400px;
  background-color: #bbb5b50d;
  backdrop-filter: blur(20px);
  position: fixed;
  top: 90px;
  right: 0;
}
.play-list {
  background-color: #bbb5b50d;
  border-radius: 4px;
  width: 450px;
  max-height: 400px;
  overflow-y: auto;
  position: fixed;
  bottom: 64px;
  right: 0;
  z-index: -1;
}
</style>
