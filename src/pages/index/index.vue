<script lang="ts" setup>
import ForYou from './components/for-you.vue';
import { homeUseStore } from '@/store';

const homeStore = homeUseStore();
homeStore.getPlayLists();
homeStore.getNewSong();
homeStore.getRecommendRadioStation();
homeStore.getNewAlbums();
homeStore.getRankingList();
</script>
<template>
  <main>
    <song-typesetting title="推荐歌单" :lists="homeStore.playLists" routerName="Find" />
    <!-- <for-you title="For You" :lists="homeStore.recommendedSongList" /> -->
    <song-typesetting title="新专速递" :lists="homeStore.albumsList" />
    <song-typesetting title="排行榜" :lists="homeStore.rankingList" routerName="Find" />
  </main>
</template>
