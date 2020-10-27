export default {
    install(Vue) {
        // 播放量单位换算
        Vue.filter('playCount', target => {
            let numStr = target.toString()
            // 4位数以内直接返回
            if (numStr.length <= 4) return target
            // 大于8位数显示亿
            else if (numStr.length >= 9) {
                return Math.floor(target / 100000000).toFixed(0) + '亿'
            }
            // 大于6位数显示万
            else if (numStr.length >= 5) {
                return Math.floor(target / 10000).toFixed(0) + '万'
            }
        })
        // 个位数补零
        Vue.filter('addZeros', target => {
            return target < 10 ? '0' + target : target
        })

        // 毫秒转换为分钟
        Vue.filter('playTime', target => {
            let min = Math.floor(target / 1000 / 60)
            let sec = Math.floor((target / 1000) % 60)
            return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        })

        // 时间戳转换
        Vue.filter('timeStamp', target => {
            let time = new Date(target)
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let date = time.getDate()
            let hour = time.getHours()
            let minute = time.getMinutes()
            let second = time.getSeconds()
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`
        })

        // 时间戳转换多少月前
        Vue.filter('time', target => {
            // 今天的时间
            let newTime = new Date()
            // 获取时间差
            let res = newTime - target
            return Math.floor(res / (1000 * 60 * 60 * 24 * 30)) + '月前'
        })
    }
}
