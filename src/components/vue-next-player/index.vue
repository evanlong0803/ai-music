<script lang="ts" setup>
const vueAudio = new Audio();
vueAudio.src = '';
console.log(vueAudio);
</script>
<template>
  <div class="audio">123123</div>
</template>
<style lang="less" scoped>
.audio {
  width: 100%;
  height: 64px;
  position: absolute;
  bottom: 0;
  background-color: #ffffff0d;
  backdrop-filter: blur(20px);
}
</style>
