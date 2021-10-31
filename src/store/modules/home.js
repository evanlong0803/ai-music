import { defineStore } from 'pinia';
import request from '@/utils/request';

export default defineStore('home', {
	state: () => ({
		playLists: [],
	}),
	actions: {
		// 获取推荐歌单
		async getPlaylists() {
			const { result } = await request.get('/personalized', {
				params: { limit: 10 },
			});
			this.playLists = result;
		},
	},
});
