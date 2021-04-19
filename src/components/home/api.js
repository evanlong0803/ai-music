import api from '@/api/config';

// 获取轮播图
export const getBanner = () => api.get('/banner');

// 获取热搜
export const getHotSearch = () => api.get('/search/hot');

// 获取推荐歌单
export const getSongList = () =>
	api.get('/personalized', {
		params: { limit: 18 },
	});

// 获取推荐新歌
export const getFeaturedNewSong = () => api.get('/personalized/newsong');

// 获取热门歌手
export const getHotSinger = () =>
	api.get('/top/artists', {
		params: { offset: 0, limit: 24 },
	});

// 获取新音乐
export const getNewSong = (item) => api.get(`/song/url?id=${item.id}`);

// 获取排行榜
export const getRand = () => api.get('/toplist/detail');

// 获取歌单
export const getSongSheet = (songSheetParams) =>
	api.get('/top/playlist', {
		params: songSheetParams,
	});

// 获取歌手
export const getSinger = (singerParams) =>
	api.get('/artist/list', {
		params: singerParams,
	});

// 获取MV
export const getMV = (mvParams) =>
	api.get('/mv/all', {
		params: mvParams,
	});
