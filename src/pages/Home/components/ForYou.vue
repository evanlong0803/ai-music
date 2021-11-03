<script lang="ts" setup>
import { CaretSquareRight, Play } from '@vicons/fa';
defineProps({
  lists: Array,
  routerName: String,
  listNum: Number,
});
</script>

<template>
  <div class="head">
    <div class="title">For You</div>
  </div>
  <n-grid :x-gap="30" :y-gap="20" :cols="2">
    <n-grid-item>
      <div class="recommend">
        <img class="cover" :src="item.picUrl ?? item.coverImgUrl" :alt="item.name" />
        <div class="name">每日推荐</div>
        <div class="playButton" v-if="item.playButtonState">
          <n-icon class="playButtonIcon"><Play /></n-icon>
        </div>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="private-fm">
        <img class="cover" :src="item.picUrl ?? item.coverImgUrl" :alt="item.name" />
        <div class="name">{{ item.name }}</div>
        <div class="author">{{ item.name }}</div>
        <div>
          <n-icon><Play /></n-icon>
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
}

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
</style>
