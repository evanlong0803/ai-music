<script lang="ts" setup>
import playerUseStore from '@/store/modules/player';
import homeUseStore from '@/store/modules/home';
const playerStore = playerUseStore();
const homeStore = homeUseStore();

defineProps<{
  title: string;
  lists: any[];
}>();
</script>

<template>
  <div class="title">{{ title }}</div>
  <a-row :gutter="30">
    <a-col :span="12">
      <div class="recommend-song-list">
        <img class="left-play-cover" :src="lists[0]?.picUrl" :alt="lists[0]?.name" />
        <div class="left-play-title">
          <span>每</span>
          <span>日</span>
          <span>新</span>
          <span>歌</span>
        </div>
        <div class="left-play-button">
          <icon-play-arrow-fill class="play-button-icon" />
        </div>
      </div>
    </a-col>
    <a-col :span="12">
      <div class="recommend-song">
        <img
          src="https://p3.music.126.net/20i3iOypDSK_4hEKmYj2mg==/109951165975751486.jpg?param=512y512"
        />
        <div class="song-right">
          <div class="right-play-info">
            <a-typography-paragraph
              :ellipsis="{ rows: 1, showTooltip: true }"
              style="margin-bottom: 10px"
            >
              {{
                '青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷青石巷'
              }}
            </a-typography-paragraph>
            <a-typography-paragraph :ellipsis="{ rows: 1, showTooltip: true }">
              {{ '魏琮霏' }}
            </a-typography-paragraph>
          </div>
          <div class="right-play-button">
            <!-- 播放/暂停 -->
            <icon-play-arrow-fill
              class="icon"
              style="font-size: 35px; margin: 0 10px"
              @click="playerStore.playAudio"
              v-if="!playerStore.playState"
            />
            <icon-pause
              class="icon"
              style="font-size: 35px; margin: 0 10px"
              @click="playerStore.suspendAudio"
              v-else
            />
            <!-- 播放下一首 -->
            <icon-skip-next-fill
              class="icon"
              style="font-size: 35px"
              @click="playerStore.playNextAudio"
            />
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
.title {
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 14px;
}

.recommend-song-list {
  height: 260px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  @keyframes coverAnimation {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

  .left-play-cover {
    width: 100%;
    animation: coverAnimation 30s ease-in-out 1s infinite alternate;
  }
  .left-play-title {
    color: #fff;
    font-weight: bold;
    font-size: 60px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 45px;
    user-select: none;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: auto auto;
  }
  .left-play-button {
    cursor: pointer;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
  }
}

.recommend-song {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 10px;
  > img {
    height: 260px;
    border-radius: 10px;
  }
  .song-right {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-self: center;
    padding: 20px 30px;
    border-radius: 0 10px 10px 0;
    background-color: #6969690d;
    backdrop-filter: blur(20px);
    border: 1px solid #6969690d;
    border-left-width: 0;
    .right-play-info {
      height: 100%;
      width: 100%;
      > div {
        &:nth-of-type(1) {
          width: 100%;
          font-weight: bold;
          font-size: 28px;
        }
        &:nth-of-type(2) {
          width: 100%;
          color: #7a7a7b;
          font-size: 18px;
        }
      }
    }
    .right-play-button {
      margin: 40px 0 0 -10px;
    }
  }
}
</style>
