<script lang="ts" setup>
// import ForYou from './components/for-you.vue';
import { homeAPI } from '@/api';

interface IHomeState {
  /** 播放列表 */
  playLists: [];
  /** 排行榜 */
  rankingList: [];
  /** 新专速递 */
  albumsList: [];
  recommendedSongList: [];
  recommendedRadioStationList: [];
}

// 主页状态
const homeState = reactive<IHomeState>({
  playLists: [],
  rankingList: [],
  albumsList: [],
  recommendedSongList: [],
  recommendedRadioStationList: [],
});

homeState.playLists = await homeAPI.getPlayLists();
// homeState.recommendedSongList = await homeAPI.getNewSong();
// homeState.recommendedRadioStationList = await homeAPI.getRecommendRadioStation();
homeState.albumsList = await homeAPI.getNewAlbums();
homeState.rankingList = await homeAPI.getRankingList();
</script>

<template>
  <main>
    <song-typesetting title="推荐歌单" :lists="homeState.playLists" routerName="Find" />
    <!-- <for-you title="For You" :lists="homeStore.recommendedSongList" /> -->
    <song-typesetting title="新专速递" :lists="homeState.albumsList" />
    <song-typesetting title="排行榜" :lists="homeState.rankingList" routerName="Find" />
  </main>
</template>
