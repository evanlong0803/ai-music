<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Bars, CaretSquareRight, Play } from '@vicons/fa';
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
  <div class="head">
    <div class="title">{{ title }}</div>
    <n-icon size="25" class="routing-control" @click="() => router.push({ name: routerName })">
      <Bars />
    </n-icon>
  </div>
  <n-grid :x-gap="30" :y-gap="20" :cols="5">
    <n-grid-item v-for="item in lists as any" :key="item.id">
      <div class="song-sheet">
        <div
          class="image"
          @mouseenter="item.playButtonState = true"
          @mouseleave="item.playButtonState = false"
        >
          <img class="cover" :src="item.picUrl ?? item.coverImgUrl" :alt="item.name" />
          <div class="playButton" v-if="item.playButtonState">
            <n-icon class="playButtonIcon">
              <Play />
            </n-icon>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="playCount" v-if="item.playCount">
          <n-icon size="16" style="margin-right: 5px">
            <CaretSquareRight />
          </n-icon>
          {{ playCount(item.playCount) }}
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 14px;
  }
  .routing-control {
    padding: 5px;
    transition: all 0.3s;
    border-radius: 5px;
    &:hover {
      background: #cccc;
      transition: all 0.3s;
    }
    &:active {
      transform: scale(0.9);
      transition: all 0.3s;
    }
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
  }
  .playCount {
    color: #fff;
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ffffff0d;
    backdrop-filter: blur(15px);
    padding: 0 5px;
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
        padding: 15px;
        padding-left: 17px;
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
