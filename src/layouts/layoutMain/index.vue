<template>
  <n-layout-content position="absolute" style="top: 64px; bottom: 64px">
    <div class="app-main">
      <router-view />
    </div>
  </n-layout-content>
</template>

<style lang="less" scoped>
.app-main {
  width: 80%;
  margin: 0 auto;
}
</style>
