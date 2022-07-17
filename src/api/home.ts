import request from '@/utils/request';

/** 获取推荐歌单 */
export const getPlayLists = async () => {
  const { data } = await request.get('/personalized', {
    params: { limit: 10 },
  });
  return data.result;
};

/** 获取新歌 */
export const getNewSong = async () => {
  const { data } = await request.get('/personalized/newsong');
  return data.result;
};

/** 获取推荐电台 */
export const getRecommendRadioStation = async () => {
  const { data } = await request.get('/personalized/djprogram');
  return data.result;
};

/** 获取新专辑 */
export const getNewAlbums = async () => {
  const { data: data } = await request.get('/album/new', {
    params: { area: 'all', limit: 10 },
  });
  return data.albums;
};

/** 获取排行榜 */
export const getRankingList = async () => {
  const { data } = await request.get('/toplist');
  return data.list?.slice(0, 5);
};
