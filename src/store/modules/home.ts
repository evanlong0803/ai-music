import { defineStore } from 'pinia';
import request from '@/utils/request';

interface homeState {
  playLists: [];
  rankingList: [];
  albumsList: [];
  recommendedSongList: [];
}

export default defineStore('home', {
  state: (): homeState => ({
    playLists: [],
    rankingList: [],
    albumsList: [],
    recommendedSongList: [],
  }),
  actions: {
    // 获取推荐歌单
    async getPlayLists(): Promise<void> {
      const { result } = await request.get('/personalized', {
        params: { limit: 10 },
      });
      this.playLists = result;
    },
    // 获取新歌
    async getRecommendedSong(): Promise<void> {
      const { result } = await request.get('/personalized/newsong');
      this.recommendedSongList = result;
    },
    // 获取新专辑
    async getNewAlbums(): Promise<void> {
      const { albums } = await request.get('/album/new', {
        params: { area: 'all', limit: 10 },
      });
      this.albumsList = albums;
    },
    // 获取排行榜
    async getRankingList(): Promise<void> {
      const { list } = await request.get('/toplist');
      this.rankingList = list?.slice(0, 5);
    },
  },
});
