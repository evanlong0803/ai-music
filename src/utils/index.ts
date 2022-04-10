export const playCount = (target: number) => {
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
