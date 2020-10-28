<template>
    <div class="player">
        <div class="info-player">
            <el-image class="player-img" src="https://p1.music.126.net/1xeJa4fE4N4YVM68FJ69lQ==/109951165403024844.jpg" fit="cover"></el-image>
            <div class="player-song">
                <div class="song-name">致明日的舞</div>
                <div class="song-singers">陈奕迅</div>
            </div>
        </div>
        <AudioPlayer :audio-list="audioList" :before-play="onBeforePlay" show-progress-bar :progressInterval="500" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            audioList: ['http://m10.music.126.net/20201028224249/a1b83bdf3d6062b8aae13e05ad70eeea/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3']
        }
    },
    methods: {
        // 播放前做的事
        onBeforePlay(next) {
            console.log('这里可以做一些事情...')
            next() // 开始播放
        }
    }
}
</script>

<style lang="less">
.player {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 70px;
    background: white;
    z-index: 99;
    display: flex;
    padding: 0 50px;
    box-shadow: 5px 0 1px #666;
    .info-player {
        display: flex;
        align-items: center;
        margin-right: 50px;
        // 歌曲头像
        .player-img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-right: 20px;
        }
        .song-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .song-singers {
            font-size: 12px;
            color: #666;
        }
    }

    // 播放器
    .audio-player {
        .audio__btn-wrap {
            position: absolute;
            top: 15px;
            // 图标
            .audio__play__icon {
                color: #444;
                &:active {
                    opacity: 0.7;
                }
            }
        }
        .audio__time-wrap {
            width: 900px;
            position: relative;
            left: 180px;
            top: 18px;
            // 现在时间
            .audio__current-time {
                font-size: 14px;
            }
            // 总时间
            .audio__duration {
                font-size: 14px;
            }
        }
        // 进度条
        .audio__progress-wrap {
            margin: 0;
            width: 85%;
            position: relative;
            left: 245px;
            top: 35px;
            // 进度条圆点
            .audio__progress-point {
                -webkit-box-shadow: none;
                box-shadow: none;
                background: #409eff;
            }
        }
    }
}
</style>
