import URLS from "../../urls";
import api from "../../config";

// 获取轮播图
export const getBanner = () => api.get(URLS.banner)
// 获取推荐歌单
export const getSongList = () => api.get(URLS.songList, {
    params: { limit: 18 }
})
// 获取推荐新歌
export const getFeaturedNewSong = () => api.get(URLS.newSong)
// 获取热门歌手
export const getHotSinger = () => api.get(URLS.hotSinger, {
    params: { offset: 0, limit: 24 }
})