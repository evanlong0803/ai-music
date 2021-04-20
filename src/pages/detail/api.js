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

/**
 * 专辑页
 * @param {*} songListId
 * @returns
 */

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

//-------------------------------------

/**
 * 歌手详情页
 * @param {*} uid
 * @param {*} cookie
 * @returns
 */

// 获取歌单详情
export const getUserDetail = (uid, cookie) =>
	api.get('/user/detail', { params: { uid, cookie } });

// 获取歌手单曲
export const getSingerSingle = (singerId) => api.get(`/artists?id=${singerId}`);

// 获取歌手专辑
export const getSingerAlbum = (id) =>
	api.get('/artist/album', { params: { id, limit: 30 } });

// 获取歌手MV
export const getSingerMV = (singerId) => api.get(`/artist/mv?id=${singerId}`);

// 获取歌手简介
export const getSingerProfile = (singerId) =>
	api.get(`/artist/desc?id=${singerId}`);

// 获取相似歌手
export const getSingerSimilar = (singerId) =>
	api.get(`/simi/artist?id=${singerId}`);

// -------------------------------------

// 获取视频播放地址
export const getVideoURL = (videoId) => api.get(`/video/url?id=${videoId}`);

// 获取视频点赞转发评论数数据
export const getVideoRelay = (videoId) =>
	api.get(`/video/detail/info?vid=${videoId}`);

// 获取视频评论
export const getVideoComment = (videoId) =>
	api.get(`/comment/video?id=${videoId}`);

// 获取相关视频
export const getRelevantVideo = (videoId) =>
	api.get(`/related/allvideo?id=${videoId}`);

// 获取MV详情
export const getMVDetail = (videoId) => api.get(`/mv/detail?mvid=${videoId}`);

// 获取MVURL
export const getMVURL = (videoId) => api.get(`/mv/url?id=${videoId}`);

// 获取MV点赞转发评论数数据
export const getMVRelay = (videoId) =>
	api.get(`/mv/detail/info?mvid=${videoId}`);

// 获取MV评论
export const getMVComment = (videoId) => api.get(`/comment/mv?id=${videoId}`);

// 获取相关MV
export const getRelevantMV = (videoId) => api.get(`/simi/mv?mvid=${videoId}`);
