import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import request from '@/utils/request';

interface playerState {
  audio: HTMLAudioElement;
  currentTime: number;
  duration: number;
  playState: boolean;
  mutedState: boolean;
  playListState: boolean;
  playList: any[];
  playInfo: any;
  lyric: string;
}

export default defineStore('player', {
  state: (): playerState => ({
    audio: new Audio(),
    currentTime: 0,
    duration: 0,
    playState: false,
    mutedState: false,
    playListState: false,
    playInfo: {},
    playList: [],
    lyric: '',
  }),
  getters: {
    getProgressTime: (state: playerState): string => {
      // 秒转换为分钟
      const min = Math.floor(state.currentTime / 60);
      const sec = Math.floor(state.currentTime % 60);
      return min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    },
  },
  actions: {
    // 获取歌单所有歌曲
    async getAllSongList(id: string): Promise<void> {
      const { data } = await request.get('/playlist/track/all', { params: { id } });
      this.playList = data.songs;
    },
    // 获取歌曲详情
    async getDetail(id: string): Promise<void> {
      const { data } = await request.get('/song/detail', { params: { ids: id } });
      this.playInfo = data.songs[0];
    },
    // 获取当前歌曲歌词
    async getLyric(id: string): Promise<void> {
      const { data } = await request.get('/lyric', { params: { id } });
      this.lyric = data.lrc;
      // console.log(data.lrc);
    },
    // 获取音乐URL
    async getUrl(id: string): Promise<void> {
      const {
        data: { data },
      } = await request.get('/song/url', { params: { id } });
      // 如果歌曲不能被播放
      if (data[0].code !== 200) {
        console.log('123');
      }
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
        return Notification.info({
          title: '播放提示',
          content: '已经是第一首了',
          duration: 3000,
          closable: false,
        });
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
        return Notification.info({
          title: '播放提示',
          content: '已经是最后一首了',
          duration: 3000,
          closable: false,
        });
      }
      // 预备下一首
      await this.getUrl(this.playList[index + 1].id);
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
  },
});
