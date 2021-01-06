import api from "../../config";

// 获取新音乐
export const getNewSong = item => api.get(`/song/url?id=${item.id}`)