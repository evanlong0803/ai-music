<script lang="ts" setup>
import { playCount } from '@/utils';
import request from '@/utils/request';

import playerUseStore from '@/store/modules/player';
import homeUseStore from '@/store/modules/home';
const playerStore = playerUseStore();

const homeStore = homeUseStore();

const props = defineProps<{
  title: string;
  lists: any[];
  routerName?: string;
}>();

const router = useRouter();

const lists = ref<any>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const songListDetail = ref({});

// 播放歌单
const playSongList = async (id: string): Promise<void> => {
  // 获取歌单所有歌曲
  await playerStore.getAllSongList(id);
  // 获取歌单URL
  await playerStore.getUrl(playerStore.playList[0].id);
  playerStore.playAudio();
};

// 获取歌单详情
const getSongListDetail = async (id: string): Promise<void> => {
  const { data } = await request.get('/playlist/detail', { params: { id } });
  songListDetail.value = data;
};

watch(
  () => props.lists,
  val => {
    if (val) {
      lists.value = val.map((item: any) => ({ ...item, playButtonShow: false }));
    }
  },
);
</script>

<template>
  <!-- 头部 -->
  <div class="head">
    <div class="title">{{ title }}</div>
    <icon-align-right
      class="icon"
      style="font-size: 25px"
      @click="() => router.push({ name: routerName })"
    />
  </div>

  <a-grid :cols="5" :colGap="30" :rowGap="30">
    <a-grid-item v-for="item in lists" :key="item.id">
      <a-skeleton animation>
        <a-space direction="vertical" :size="10" style="width: 100%">
          <a-skeleton-shape />
          <a-skeleton-line :rows="1" />
        </a-space>
      </a-skeleton>

      <div class="song-sheet">
        <!-- 歌单图片容器 -->
        <div
          class="image"
          @mouseenter="item.playButtonShow = true"
          @mouseleave="item.playButtonShow = false"
        >
          <img
            class="cover"
            :src="item.picUrl ?? item.coverImgUrl"
            :alt="item.name"
            v-if="item.picUrl ?? item.coverImgUrl"
          />

          <!-- 播放按钮 -->
          <div class="playButton" v-if="item.playButtonShow" @click="playSongList(item.id)">
            <icon-play-arrow-fill class="playButtonIcon" />
          </div>
        </div>

        <!-- 歌单名称 -->
        <div class="name">{{ item.name }}</div>

        <!-- 播放数量 -->
        <div class="playCount" v-if="item.playCount">
          <icon-music style="margin-right: 5px" />
          {{ playCount(item.playCount) }}
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 14px;
  }
}

.song-sheet {
  position: relative;
  .cover {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .name {
    font-weight: bold;
    font-size: 18px;
    margin-top: 5px;
  }
  .playCount {
    color: #fff;
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ffffff0d;
    backdrop-filter: blur(15px);
    padding: 3px 5px;
    border: 1px solid #ffffff0d;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
  .image {
    width: 100%;
    height: 100%;
    position: relative;
    .playButton {
      cursor: pointer;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s;
      .playButtonIcon {
        font-size: 25px;
        padding: 10px;
        background: #0000000d;
        backdrop-filter: blur(15px);
        border: 1px solid #ffffff0d;
        border-radius: 50%;
        transition: all 0.3s;
        &:hover {
          background: #ffffff0d;
          transition: all 0.3s;
        }
        &:active {
          background: #0000000d;
          transition: all 0.1s;
        }
      }
    }
  }
}
</style>
