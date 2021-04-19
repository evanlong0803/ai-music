import api from '@/api/config';

/**
 * 专辑页
 * @param {*} albumId
 * @returns
 */

// 获取专辑
export const getAlbum = (albumId) => api.get(`/album?id=${albumId}`);

// 获取热门专辑
export const getHotAlbum = (item) => api.get(`/artist/album?id=${item}`);

// 获取评论
export const getComments = (item) => api.get(`/comment/album?id=${item}`);

// 获取歌曲详情
export const getSongDetail = (trackId) =>
	api.get(`/song/detail?ids=${trackId}`);

// 获取音乐URL
export const getMusicURL = (trackId) => api.get(`/song/url?id=${trackId}`);

// 获取喜欢歌单的人
export const getSubscribers = (songListId) =>
	api.get('/playlist/subscribers', {
		params: {
			id: songListId,
			limit: 30,
		},
	});

// 获取相关推荐
export const getFeatured = (songListId) =>
	api.get(`/related/playlist?id=${songListId}`);

// 获取精彩评论
export const getMarvellousComments = (songListId) =>
	api.get(`/comment/playlist?id=${songListId}`);

// 获取用户歌单
export const getUserSong = (cookie, userId) =>
	api.get('/user/playlist', {
		params: {
			uid: userId,
			cookie,
			timestamp: Date.now(),
		},
	});

// 收藏歌单
export const setFavorite = (ifFavorite, songListId, cookie) =>
	api.get('/playlist/subscribe', {
		params: {
			t: ifFavorite ? 1 : 2,
			id: songListId,
			cookie,
			timestamp: Date.now(),
		},
	});

// 获取歌单详情
export const getSongSheetDetail = (songListId) =>
	api.get(`/playlist/detail?id=${songListId}`);
