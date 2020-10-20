export default {
    install(Vue) {
        // 播放量
        Vue.filter('playCount', target => {
            let numStr = target.toString();
            // 1万以内直接返回
            if (numStr.length < 6) {
                return numStr;
            }
            //大于8位数是亿
            // else if (numStr.length > 8) {
            //     let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
            //     return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
            // }
            //大于6位数是十万 (以10W分割 10W以下全部显示)
            // else if (numStr.length > 5) {
            //     let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
            //     return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
            // }
        });
        // 个位数补零
        Vue.filter('addZeros', target => {
            return target < 10 ? '0' + target : target;
        });
    }
};
