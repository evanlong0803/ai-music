import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import request from '@/utils/request';

interface playerState {
  audio: HTMLAudioElement;
  playState: boolean;
  mutedState: boolean;
  playListState: boolean;
  playList: any[];
  playInfo: any;
  songListDetail: any;
}

export default defineStore('player', {
  state: (): playerState => ({
    audio: new Audio(),
    playState: false,
    mutedState: false,
    playListState: false,
    playInfo: {},
    playList: [],
    songListDetail: {},
  }),
  getters: {
    getTime: state => {
      console.log(state);
    },
  },
  actions: {
    // 获取歌单详情
    async getSongListDetail(id: string): Promise<void> {
      const { data } = await request.get('/playlist/detail', { params: { id } });
      this.songListDetail = data;
    },
    // 获取歌单所有歌曲
    async getAllSongList(id: string): Promise<void> {
      const { data } = await request.get('/playlist/track/all', { params: { id } });
      this.playList = data.songs;
    },
    // 获取音乐URL
    async getUrl(id: string): Promise<void> {
      const {
        data: { data },
      } = await request.get('/song/url', { params: { id } });
      // 寻找当前播放的信息
      this.playInfo = this.playList.filter(x => x.id === id)[0];
      // 预备播放
      this.audio.src = data[0].url;
      // 获取总时间
      // 获取当前时间
    },
    // 播放
    playAudio() {
      if (!this.audio.src) return;
      this.audio.play();
      this.audio.src && (this.playState = true);
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
