import { defineStore } from 'pinia';
import request from '@/utils/request';

export default defineStore('search', {
	state: () => ({
		keyWord: '',
	}),
	actions: {
		// 获取默认搜索关键词
		async getDefaultKeyWord() {
			const { data } = await request.get('/search/default');
			this.keyWord = data.showKeyword;
		},
	},
});
