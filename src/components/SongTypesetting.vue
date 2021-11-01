<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Bars, CaretSquareRight, PlayCircle } from '@vicons/fa';
import { playCount } from '@/utils';
import { ref } from 'vue-demi';
const router = useRouter();

const playButtonState = ref<boolean>(false);

defineProps({
  title: String,
  playLists: Array,
  routerName: String,
});
</script>

<template>
  <div class="head">
    <div class="title">{{ title }}</div>
    <n-icon size="25" class="routing-control" @click="() => router.push({ name: routerName })">
      <Bars />
    </n-icon>
  </div>
  <n-grid :x-gap="30" :y-gap="8" :cols="5">
    <n-grid-item v-for="item in playLists as any" :key="item.id">
      <div class="song-sheet">
        <div class="image">
          <img class="cover" :src="item.picUrl" :alt="item.name" />
          <n-icon size="50" class="playButton" v-if="playButtonState">
            <PlayCircle />
          </n-icon>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="playCount">
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
    color: #ccc;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #ffffff0d;
    backdrop-filter: blur(15px);
    padding: 0 3px;
    border: 1px solid #ffffff0d;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
  .image {
    position: relative;
    .playButton {
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
