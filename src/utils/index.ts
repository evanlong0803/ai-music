// 播放量单位换算
export const playCount = target => {
  let numStr = target.toString();
  // 4位数以内直接返回
  if (numStr.length <= 4) return target;
  // 大于8位数显示亿
  else if (numStr.length >= 9) {
    return Math.floor(target / 100000000).toFixed(0) + '亿';
  }
  // 大于6位数显示万
  else if (numStr.length >= 5) {
    return Math.floor(target / 10000).toFixed(0) + '万';
  }
};
