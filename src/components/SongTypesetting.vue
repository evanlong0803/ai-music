<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { playCount } from '@/utils';
import { ref, watch } from 'vue-demi';
const router = useRouter();

const props = defineProps({
  title: String,
  lists: Array,
  routerName: String,
});

const lists = ref<any>([]);

watch(
  () => props.lists,
  val => {
    lists.value = val?.map((item: any) => ({ ...item, playButtonState: false }));
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
  <a-row :gutter="[30, 30]">
    <a-col :span="4" v-for="item in lists as any" :key="item.id">
      <div class="song-sheet">
        <div
          class="image"
          @mouseenter="item.playButtonState = true"
          @mouseleave="item.playButtonState = false"
        >
          <img class="cover" :src="item.picUrl ?? item.coverImgUrl" :alt="item.name" />
          <div class="playButton" v-if="item.playButtonState">
            <icon-play-arrow-fill class="playButtonIcon" />
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="playCount" v-if="item.playCount">
          <icon-music style="margin-right: 5px" />
          {{ playCount(item.playCount) }}
        </div>
      </div>
    </a-col>
  </a-row>
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
    font-size: 17px;
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
