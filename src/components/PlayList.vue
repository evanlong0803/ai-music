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
  <a-card class="play-card" :body-style="{ padding: 0 }" v-if="playerStore.playListState">
    <template #title>
      <div class="title">播放列表</div>
    </template>
    <template #extra>
      <icon-to-right
        class="icon"
        style="font-size: 20px"
        @click="playerStore.playListState = !playerStore.playListState"
      />
    </template>
    <a-list :max-height="355" :bordered="false" v-if="playerStore.playList.length">
      <a-list-item
        v-for="item in playerStore.playList"
        :key="item.id"
        :class="[playerStore.playInfo.id === item.id && 'current-play', 'song']"
        @click="playList(item.id)"
      >
        <a-list-item-meta :title="item.name" :description="item?.al.name">
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="item?.al.picUrl" />
            </a-avatar>
          </template>
        </a-list-item-meta>
        <template #extra v-if="playerStore.playInfo.id === item.id">
          <icon-sound style="font-size: 20px" />
        </template>
      </a-list-item>
    </a-list>
    <a-empty class="empty" v-else />
  </a-card>
</template>
<style lang="less" scoped>
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
