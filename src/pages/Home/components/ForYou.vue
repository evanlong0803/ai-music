<script lang="ts" setup>
defineProps({
  title: String,
  lists: Array,
});
</script>

<template>
  <div class="title">{{ title }}</div>
  <a-row :gutter="30">
    <a-col :span="12">
      <div class="recommend">
        <img class="cover" :src="lists[0]?.picUrl" :alt="lists[0]?.name" />
        <div class="name">
          <span>每</span>
          <span>日</span>
          <span>推</span>
          <span>荐</span>
        </div>
        <div class="playButton">
          <icon-play-arrow-fill class="playButtonIcon" />
        </div>
      </div>
    </a-col>
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
  </a-row>
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

  .cover {
    width: 100%;
    animation: coverAnimation 30s ease-in-out 1s infinite alternate;
  }
  .name {
    color: #fff;
    font-weight: bold;
    font-size: 50px;
    line-height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 30px;
    user-select: none;
  }
  .playButton {
    cursor: pointer;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
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
</style>
