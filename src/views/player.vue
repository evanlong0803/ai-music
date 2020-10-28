<template>
    <div class="player">
        <AudioPlayer :audio-list="audioList" :before-play="onBeforePlay" show-progress-bar :isLoop="true" :progressInterval="2000" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            audioList: [
                'http://m10.music.126.net/20201028175618/14024fe66b59f5e70cce3873bc9797f8/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2470428796/372e/c983/0529/7acde67af7e207e40d7509d337f2a9ec.mp3',
                'http://m10.music.126.net/20201028175821/aae8d9f9996b9adf542a0fe60b6c6131/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3'
            ]
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
    background: wheat;
    z-index: 99;
    display: flex;
    // 播放器
    .audio-player {
        display: flex;
        align-items: center;
        .audio__btn-wrap {
            margin-right: 30px;
        }
        .audio__time-wrap {
            margin: 0;
        }
        .audio__time-wrap {
            width: 600px;
        }
        .audio__progress-wrap {
            margin: 0;
        }
    }
}
</style>
