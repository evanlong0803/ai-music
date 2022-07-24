import { EPlayerMode } from '@/types/enum';

/**
 * 播放器状态
 * @param {HTMLAudioElement} audio - 播放器元素
 * @param {number} currentTime - 当前播放时间
 * @param {number} durationTime - 播放总时间/播放区间
 * @param {any[]} lyric - 歌词
 * @param {number} currentLyricIndex - 当前歌词索引
 *
 * @param {any} playInfo - 当前播放歌曲信息
 * @param {boolean} collectState - 收藏状态
 *
 * @param {boolean} playState - 播放状态
 * @param {any[]} playList - 播放列表
 *
 * @param {boolean} playListState - 是否显示歌单
 * @param {EPlayerMode} playMode - 播放模式
 * @param {boolean} mutedState - 静音状态
 * @param {number} volume - 音量
 * @param {boolean} showLyric - 是否显示歌词
 */
export interface PlayerState {
  /**
   * @description 播放器元素
   */
  audio: HTMLAudioElement;
  /**
   * @description 当前播放时间
   */
  currentTime: number;
  /**
   * @description 播放总时间/播放区间
   */
  durationTime: number;
  /**
   * @description 歌词
   */
  lyric: any[];
  /**
   * @description 当前歌词索引
   */
  currentLyricIndex: number;
  /**
   * @description 当前播放歌曲信息
   */
  playInfo: any;
  /**
   * @description 收藏状态
   */
  collectState: boolean;
  /**
   * @description 播放状态
   */
  playState: boolean;
  /**
   * @description 播放列表
   */
  playList: any[];
  /**
   * @description 是否显示歌单
   */
  playListState: boolean;
  /**
   * @description 播放模式
   */
  playMode: EPlayerMode;
  /**
   * @description 静音状态
   */
  mutedState: boolean;
  /**
   * @description 音量
   */
  volume: number;
  /**
   * @description 是否显示歌词
   */
  showLyric: boolean;
}

// 搜索状态
interface SearchState {
  keyWord: string;
  searching: boolean;
  searchResult: any[];
}
