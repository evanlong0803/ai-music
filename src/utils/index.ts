import test from 'node:test';

export const handlePlayCount = (target: number) => {
  const numStr = target.toString();
  // 4位数以内直接返回
  if (numStr.length <= 4) return target + '+';
  // 大于8位数显示亿
  else if (numStr.length >= 9) {
    return Math.floor(target / 100000000).toFixed(0) + '亿';
  }
  // 大于6位数显示万
  else if (numStr.length >= 5) {
    return Math.floor(target / 10000).toFixed(0) + '万';
  }
};

/**
 * @description:延迟|等待函数
 * @param {number} time 延迟时间
 * @return: Promise
 */
export const delay = (time: number | undefined): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, time));

// 将时间戳转换为年月日
export const formatDate = (time: number) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

// 处理歌词
export const handleLyric = (lyric: string) => {
  const lyricArr = lyric.split('\n');
  return lyricArr
    .map((item: string) => {
      const time = item.match(/\d*:\d*.\d*/);
      if (time?.input) {
        // 切割时间为：分：秒.毫秒
        const timeArr: string[] = time[0].split(':');
        // 将时间转换为秒
        const timeSec = Number(timeArr[0]) * 60 + parseInt(timeArr[1], 10);
        // 歌词
        const content = item.replace(/\[\d*:\d*.\d*\]/, '').trim();
        return { timeSec, content };
      }
      return { timeSec: 0, content: item };
    })
    .filter(item => item.content);
};
