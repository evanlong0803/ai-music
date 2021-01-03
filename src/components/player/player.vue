<template>
  <div class="player">
    <transition name="el-fade-in-linear">
      <aplayer
        autoplay
        ref="aplayer"
        fixed
        :audio="list"
        theme="#409EFF"
        v-if="list.length"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 播放列表
      list: [],
    };
  },
  // 页面渲染前开始监听
  beforeMount() {
    // 接收首页新歌单曲
    this.getNewSong();
    // 接收详情页单曲
    this.getSingle();
    // 接收当前歌单所有歌曲
    this.getAllSong();
  },
  methods: {
    // 接收首页新歌单曲
    getNewSong() {
      this.$root.$on("updata:getNewSong", (newSong) => {
        for (const i in this.list) {
          // 如果在列表中发现有重复的歌曲名称
          if (this.list[i].name === newSong.name) {
            // 切换到对应名称的歌曲
            this.$refs.aplayer.switch(newSong.name);
            return this.$notify({
              title: "消息",
              message: `正在播放《${newSong.name}》`,
              type: "success",
              position: "top-left",
            });
          }
        }
        this.list.unshift(newSong);
        this.$notify({
          title: "消息",
          message: `列表已加入《${newSong.name}》`,
          type: "success",
          position: "top-left",
        });
      });
    },
    // 接收详情页单曲
    getSingle() {
      this.$root.$on("updata:getSingle", (Single) => {
        for (const i in this.list) {
          // 如果在列表中发现有重复的歌曲名称
          if (this.list[i].name === Single.name) {
            // 切换到对应名称的歌曲
            this.$refs.aplayer.switch(Single.name);
            return this.$notify({
              title: "消息",
              message: `正在播放《${Single.name}》`,
              type: "success",
              position: "top-left",
            });
          }
        }
        // 没有重复的歌曲
        this.list.unshift(Single);
        this.$nextTick(() => {
          this.$refs.aplayer.switch(0); // 切换到播放列表中的第一首歌
        });
        this.$notify({
          title: "消息",
          message: `正在播放《${Single.name}》`,
          type: "success",
          position: "top-left",
        });
      });
    },
    // 接收当前歌单所有歌曲
    getAllSong() {
      this.$root.$on("updata:getAllSong", (allSong) => {
        this.list = allSong;
        this.$nextTick(() => {
          this.$refs.aplayer.switch(0); // 切换到播放列表中的第一首歌
          // this.$refs.aplayer.play(); // 立即播放
        });
        this.$notify({
          title: "消息",
          message: `正在播放全部歌曲`,
          type: "success",
          position: "top-left",
        });
      });
    },
  },
};
</script>
