<script lang="ts" setup>
import { reactive } from 'vue-demi';

const vueAudio = new Audio();
vueAudio.src = '';
// vueAudio.volume = ran.value / 100;
console.log(vueAudio);
</script>
<template>
  <a-slider :default-value="0" class="progress" />
  <a-row class="audio">
    <a-col :span="8" class="left">
      <img
        src="https://p1.music.126.net/1gPM7tGeATM5LdKalyH5cg==/109951165309108733.jpg?param=224y224"
      />
      <div class="title">
        <div>Head & Heart (feat. MNEK)</div>
        <div>Loud Luxury , Brando</div>
      </div>
      <icon-heart class="icon" style="font-size: 20px" />
    </a-col>
    <a-col :span="8" class="center">
      <icon-skip-previous-fill class="icon" style="font-size: 35px" />
      <icon-play-arrow-fill class="icon" style="font-size: 35px; margin: 0 10px" />
      <!-- <icon-pause class="icon" style="font-size: 35px" /> -->
      <icon-skip-next-fill class="icon" style="font-size: 35px" />
    </a-col>
    <a-col :span="8" class="right">
      <a-space :size="10">
        <icon-select-all class="icon" style="font-size: 20px" />
        <icon-sound-fill class="icon" style="font-size: 20px" />
        <a-slider :default-value="50" :style="{ width: '100px' }" />
        <icon-up class="icon" style="font-size: 20px" />
      </a-space>
    </a-col>
    <icon-select-all />
  </a-row>
</template>
<style lang="less" scoped>
.progress {
  width: 100%;
  position: absolute;
  left: 0;
  top: -6px;
}
.audio {
  width: 100%;
  height: 100%;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    > img {
      width: 46px;
      height: 46px;
      border-radius: 5px;
    }
    .title {
      height: 100%;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: center;
      margin: 0 20px;
      > div {
        font-size: 12px;
        margin: 2px 0;
        &:nth-of-type(1) {
          font-size: 15px;
        }
        &:nth-of-type(2) {
          color: #7a7a7b;
        }
      }
    }
  }
  .center {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
