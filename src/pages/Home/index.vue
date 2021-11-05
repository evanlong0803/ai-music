<script lang="ts" setup>
import SongTypesetting from '@/components/SongTypesetting.vue';
import ForYou from './components/ForYou.vue';
import homeUseStore from '@/store/modules/home';
import { ref } from 'vue-demi';
const homeStore = homeUseStore();

homeStore.getPlayLists();
homeStore.getRecommendedSong();
homeStore.getNewAlbums();
homeStore.getRankingList();
</script>

<template>
  <div style="margin-bottom: 30px">
    <SongTypesetting title="推荐歌单" :lists="homeStore.playLists" routerName="Find" />
    <ForYou title="For You" :lists="homeStore.recommendedSongList" />
    <!-- <SongTypesetting title="For You" :lists="homeStore.recommendedSongList" routerName="Find" /> -->
    <SongTypesetting title="新专速递" :lists="homeStore.albumsList" />
    <SongTypesetting title="排行榜" :lists="homeStore.rankingList" />
  </div>
</template>
