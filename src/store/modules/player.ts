import request from '@/utils/request';
import { EPlayerMode } from '@/types/enum';
import { PlayerState } from '../model';
import { handleLyric } from '@/utils';

export default defineStore('player', {
  state: (): PlayerState => ({
    audio: new Audio(),
    currentTime: 0,
    durationTime: 0,
    playState: false,
    mutedState: false,
    playListState: false,
    playInfo: {},
    playList: [],
    lyric: [],
    playMode: EPlayerMode.sequence,
    showLyric: false,
    volume: 50,
    currentLyricIndex: 0,
    collectState: false,
  }),
  getters: {
    getProgressTime: (state: PlayerState): string => {
      // 秒转换为分钟
      const min = Math.floor(state.currentTime / 60);
      const sec = Math.floor(state.currentTime % 60);
      return min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    },
  },
  actions: {
    // 获取歌单所有歌曲
    async getAllSongList(id: string) {
      const { data } = await request.get('/playlist/track/all', { params: { id } });
      this.playList = data.songs;
    },
    // 获取歌曲详情
    async getDetail(id: string) {
      const { data } = await request.get('/song/detail', { params: { ids: id } });
      this.playInfo = data.songs[0];
    },
    // 获取当前歌曲歌词
    async getLyric(id: string) {
      const { data } = await request.get('/lyric', { params: { id } });
      // 处理歌词
      this.lyric = handleLyric(data.lrc.lyric);
    },
    // 获取音乐URL
    async getUrl(id: string) {
      const {
        data: { data },
      } = await request.get('/song/url', { params: { id } });
      // 寻找当前播放的信息
      await this.getDetail(id);
      // 获取歌词
      await this.getLyric(id);
      // 预备播放
      this.audio.src = data[0].url;
    },
    // 播放
    playAudio() {
      if (!this.audio.src) return;
      this.audio.play();
      this.playState = true;
    },
    // 暂停播放
    suspendAudio() {
      this.audio.pause();
      this.playState = false;
    },
    // 播放上一首
    async playUpperAudio() {
      // 获取当前播放索引
      const index = this.playList.findIndex(x => x.id === this.playInfo.id);
      if (index === 0) {
        // return Notification.info({
        //   title: '播放提示',
        //   content: '已经是第一首了',
        //   duration: 3000,
        //   closable: false,
        // });
      }
      // 预备上一首
      await this.getUrl(this.playList[index - 1].id);
      this.playAudio();
    },
    // 播放下一首
    async playNextAudio() {
      // 获取当前播放索引
      const index = this.playList.findIndex(x => x.id === this.playInfo.id);
      if (this.playList.length - 1 === index) {
        // return Notification.info({
        //   title: '播放提示',
        //   content: '已经是最后一首了',
        //   duration: 3000,
        //   closable: false,
        // });
      }
      // 预备下一首
      await this.getUrl(this.playList[index + 1].id);
      this.playAudio();
    },
    async randomPlay() {
      const index = Math.floor(Math.random() * this.playList.length);
      await this.getUrl(this.playList[index].id);
      this.playAudio();
    },
    // 打开静音
    enableMute() {
      this.audio.muted = false;
      this.mutedState = false;
    },
    // 静音
    disableMute() {
      this.audio.muted = true;
      this.mutedState = true;
    },
    setVolume(volume: number) {
      this.audio.volume = volume / 100;
    },
  },
});
