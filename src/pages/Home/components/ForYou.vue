<script lang="ts" setup>
import { ref, watch } from 'vue-demi';

// import { Play } from '@vicons/fa';
defineProps({
  title: String,
  lists: Array,
});
</script>

<template>
  <div class="title">{{ title }}</div>
  <n-grid :x-gap="30" :y-gap="20" :cols="2">
    <n-grid-item>
      <div class="recommend">
        <img class="cover" :src="lists[1].picUrl" :alt="lists[0]?.name" />
        <div class="name">
          <n-grid :x-gap="20" :y-gap="20" :cols="2">
            <n-grid-item>每</n-grid-item>
            <n-grid-item>日</n-grid-item>
            <n-grid-item>推</n-grid-item>
            <n-grid-item>荐</n-grid-item>
          </n-grid>
        </div>
        <div class="playButton">
          <n-icon class="playButtonIcon"><Play /></n-icon>
        </div>
      </div>
    </n-grid-item>
    <!-- <n-grid-item>
      <div class="private-fm">
        <img class="cover" :src="item.picUrl ?? item.coverImgUrl" :alt="item.name" />
        <div class="name">{{ item.name }}</div>
        <div class="author">{{ item.name }}</div>
        <div>
          <n-icon><Play /></n-icon>
        </div>
      </div>
    </n-grid-item> -->
  </n-grid>
</template>

<style lang="less" scoped>
.title {
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 14px;
}
.recommend {
  height: 200px;
  position: relative;
  .cover {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 10px;
    cursor: pointer;
  }
  .name {
    color: #fff;
    font-weight: bold;
    font-size: 60px;
    line-height: 60px;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    padding: 30px;
  }
  .playButton {
    cursor: pointer;
    color: #fff;
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 10;
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
</style>
