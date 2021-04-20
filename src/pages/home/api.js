import api from '@/api/config';

// 获取轮播图
export const getBanner = () => api.get('/banner');

// 获取推荐歌单
export const getSongList = () =>
	api.get('/personalized', { params: { limit: 18 } });

// 获取推荐新歌
export const getFeaturedNewSong = () => api.get('/personalized/newsong');

// 获取热门歌手
export const getHotSinger = () =>
	api.get('/top/artists', { params: { offset: 0, limit: 24 } });

// 获取新音乐
export const getNewSong = (item) => api.get(`/song/url?id=${item.id}`);

// 获取排行榜
export const getRand = () => api.get('/toplist/detail');

// 获取歌单
export const getSongSheet = (songSheetParams) =>
	api.get('/top/playlist', { params: songSheetParams });

// 获取歌手
export const getSinger = (singerParams) =>
	api.get('/artist/list', { params: singerParams });

// 获取MV
export const getMV = (mvParams) => api.get('/mv/all', { params: mvParams });

// -------------------------

// 获取音乐URL
export const getMusicURL = (trackId) => api.get(`/song/url?id=${trackId}`);

// 搜索单曲
export const searchSingle = (keywords) =>
	api.get('/cloudsearch', { params: { keywords } });

// 搜索歌手
export const searchSinger = (keywords) =>
	api.get('/cloudsearch', { params: { keywords, type: 100 } });

// 搜索专辑
export const searchAlbum = (keywords) =>
	api.get('/cloudsearch', { params: { keywords, type: 10 } });

// 搜索视频
export const searchVideo = (keywords) =>
	api.get('/cloudsearch', { params: { keywords, type: 1014 } });

// 搜索歌单
export const searchSongSheet = (keywords) =>
	api.get('/cloudsearch', { params: { keywords, type: 1000 } });
