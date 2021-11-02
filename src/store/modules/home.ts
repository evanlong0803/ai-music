import { defineStore } from 'pinia';
import request from '@/utils/request';

interface homeState {
  playLists: [];
  rankingList: [];
  albums: [];
}

export default defineStore('home', {
  state: (): homeState => ({
    playLists: [],
    rankingList: [],
    albums: [],
  }),
  actions: {
    // 获取推荐歌单
    async getPlayLists(listNum: number): Promise<void> {
      const { result } = await request.get('/personalized', {
        params: { limit: listNum },
      });
      this.playLists = result;
    },
    // 获取新专辑
    async getNewAlbums(listNum: number): Promise<void> {
      const { albums } = await request.get('/album/new', {
        params: { area: 'all', limit: listNum },
      });
      console.log(albums);
      this.albums = albums;
    },
    // 获取排行榜
    async getRankingList(): Promise<void> {
      const { list } = await request.get('/toplist');
      this.rankingList = list.slice(0, 5);
    },
  },
});
