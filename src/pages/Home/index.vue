<script lang="ts" setup>
import SongTypesetting from '@/components/SongTypesetting.vue';
import homeUseStore from '@/store/modules/home';
import ForYou from './components/ForYou.vue';
const homeStore = homeUseStore();

homeStore.getPlayLists();
homeStore.getNewSong();
homeStore.getNewAlbums();
homeStore.getRankingList();
</script>

<template>
  <a-space direction="vertical" :size="30">
    <SongTypesetting title="推荐歌单" :lists="homeStore.playLists" routerName="Find" />
    <ForYou title="For You" :lists="homeStore.recommendedSongList" />
    <SongTypesetting title="新专速递" :lists="homeStore.albumsList" />
    <SongTypesetting title="排行榜" :lists="homeStore.rankingList" />
  </a-space>
</template>
