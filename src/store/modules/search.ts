import request from '@/utils/request';
import { SearchState } from '../model';

export default defineStore('search', {
  state: (): SearchState => ({
    keyWord: '',
  }),
  actions: {
    // 获取默认搜索关键词
    async getDefaultKeyWord() {
      const {
        data: { data },
      } = await request.get('/search/default');
      this.keyWord = data.showKeyword;
    },
  },
});
