<script lang="ts" setup>
import SongTypesetting from '@/components/SongTypesetting.vue';
import homeUseStore from '@/store/modules/home';
import { ref } from 'vue-demi';
const homeStore = homeUseStore();

const listNum = ref<number>(10);

homeStore.getPlayLists(listNum.value);
homeStore.getNewAlbums(listNum.value);
homeStore.getRankingList();
</script>

<template>
  <div style="margin-bottom: 30px">
    <SongTypesetting
      title="推荐歌单"
      :lists="homeStore.playLists"
      routerName="Find"
      :listNum="listNum"
    />
    <SongTypesetting title="新专速递" :lists="homeStore.albums" :listNum="listNum" />
    <SongTypesetting title="排行榜" :lists="homeStore.rankingList" :listNum="listNum" />
  </div>
</template>
