export default {
    install(Vue) {
        // 播放量单位换算
        Vue.filter('playCount', target => {
            let numStr = target.toString();
            // 1万以内直接返回
            if (numStr.length <= 4) {
                return target;
            }
            //大于8位数显示亿
            else if (numStr.length >= 9) {
                return Math.floor(target / 100000000).toFixed(0) + '亿';
            }
            //大于6位数显示万
            else if (numStr.length >= 5) {
                return Math.floor(target / 10000).toFixed(0) + '万';
            }
        });
        // 个位数补零
        Vue.filter('addZeros', target => {
            return target < 10 ? '0' + target : target;
        });
    }
};
