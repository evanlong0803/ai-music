/**
 * PlayerMode 播放模式
 * @param {number} sequence - 顺序播放 - 1
 * @param {number} singleLoop - 随机播放 - 2
 * @param {number} random - 单曲循环 - 3
 */
export enum EPlayerMode {
  /**
   * @description 顺序播放
   */
  sequence = 1,
  /**
   * @description 单曲循环
   */
  singleLoop = 2,
  /**
   * @description 随机播放
   */
  random = 3,
}
