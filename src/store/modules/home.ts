import { defineStore } from 'pinia';
import request from '@/utils/request';

interface homeState {
  playLists: [];
  rankingList: [];
  albumsList: [];
  recommendedSongList: [];
  night: boolean;
}

export default defineStore('home', {
  state: (): homeState => ({
    playLists: [],
    rankingList: [],
    albumsList: [],
    recommendedSongList: [],
    night: false,
  }),
  actions: {
    // 获取推荐歌单
    async getPlayLists(): Promise<void> {
      const { data } = await request.get('/personalized', {
        params: { limit: 12 },
      });
      this.playLists = data.result;
    },
    // 获取新歌
    async getNewSong(): Promise<void> {
      const { data } = await request.get('/personalized/newsong');
      this.recommendedSongList = data.result;
    },
    // 获取新专辑
    async getNewAlbums(): Promise<void> {
      const { data: data } = await request.get('/album/new', {
        params: { area: 'all', limit: 12 },
      });
      this.albumsList = data.albums;
    },
    // 获取排行榜
    async getRankingList(): Promise<void> {
      const { data } = await request.get('/toplist');
      this.rankingList = data.list?.slice(0, 5);
    },
  },
});
