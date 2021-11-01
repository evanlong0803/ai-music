<script lang="ts" setup>
import SongTypesetting from '@/components/SongTypesetting.vue';
import homeUseStore from '@/store/modules/home';

const homeStore = homeUseStore();
homeStore.getPlaylists();
</script>

<template>
  <n-space vertical style="margin: 30px 0">
    <SongTypesetting title="推荐歌单" :playLists="homeStore.playLists" routerName="Find" />
    <SongTypesetting title="新专速递" :playLists="homeStore.playLists" />
    <SongTypesetting title="排行榜" :playLists="homeStore.playLists" />
  </n-space>
</template>
