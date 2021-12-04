import { defineStore } from 'pinia';
// import request from '@/utils/request';

interface playerState {
  keyWord: string;
}

export default defineStore('player', {
  state: (): playerState => ({
    keyWord: '',
  }),
  actions: {
    // 获取默认搜索关键词
    // async getDefaultKeyWord() {
    //   const {
    //     data: { data },
    //   } = await request.get('/search/default');
    //   this.keyWord = data.showKeyword;
    // },
  },
});
