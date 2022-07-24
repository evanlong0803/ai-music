import request from '@/utils/request';
import { SearchState } from '../model';

export default defineStore('search', {
  state: (): SearchState => ({
    keyWord: '',
    searching: false,
    searchResult: [],
  }),
  actions: {
    // 获取默认搜索关键词
    async getDefaultKeyWord() {
      const {
        data: { data },
      } = await request.get('/search/default');
      this.keyWord = data.showKeyword;
    },
    // 搜索
    async search(keyWord: string) {
      const {
        data: { result },
      } = await request.get('/cloudsearch', { params: { keywords: keyWord } });
      this.searchResult = result.songs;
    },
  },
});
