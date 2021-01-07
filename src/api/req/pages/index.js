import URLS from '../../urls'
import api from '../../config'

// 获取轮播图
export const getBanner = () => api.get(URLS.banner)

// 获取推荐歌单
export const getSongList = () =>
    api.get(URLS.songList, {
        params: { limit: 18 }
    })

// 获取推荐新歌
export const getFeaturedNewSong = () => api.get(URLS.newSong)

// 获取热门歌手
export const getHotSinger = () =>
    api.get(URLS.hotSinger, {
        params: { offset: 0, limit: 24 }
    })

// 获取新音乐
export const getNewSong = item => api.get(`/song/url?id=${item.id}`)

// 获取排行榜
export const getRand = () => api.get(URLS.rand)

// 获取歌单
export const getSongSheet = songSheetParams =>
    api.get(URLS.songSheet, {
        params: songSheetParams
    })

// 获取歌手
export const getSinger = singerParams =>
    api.get(URLS.singer, {
        params: singerParams
    })

// 获取MV
export const getMV = mvParams =>
    api.get(URLS.mv, {
        params: mvParams
    })
