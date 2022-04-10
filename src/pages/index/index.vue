<script lang="ts" setup>
import ForYou from './components/ForYou.vue';
import homeUseStore from '@/store/modules/home';
const homeStore = homeUseStore();
homeStore.getPlayLists();
homeStore.getNewSong();
homeStore.getRecommendRadioStation();
homeStore.getNewAlbums();
homeStore.getRankingList();
</script>
<template>
  <a-space direction="vertical" :size="30" style="margin: 30px 0">
    <song-typesetting title="推荐歌单" :lists="homeStore.playLists" routerName="Find" />
    <for-you title="For You" :lists="homeStore.recommendedSongList" />
    <song-typesetting title="新专速递" :lists="homeStore.albumsList" />
    <song-typesetting title="排行榜" :lists="homeStore.rankingList" routerName="Find" />
  </a-space>
</template>
