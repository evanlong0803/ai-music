<template>
    <div class="player">
        <el-image class="player-img" :src="music.pic" fit="cover" @click="drawer = true" v-show="!drawer"></el-image>

        <el-drawer title="歌单" :visible.sync="drawer" direction="ltr" :before-close="handleClose">
            <aplayer autoplay :music="music" theme="#409EFF" :list="list" />
        </el-drawer>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
// 关闭播放器生产提示
Aplayer.disableVersionBadge = true
export default {
    components: {
        Aplayer
    },
    data() {
        return {
            drawer: false,
            music: {
                title: '桃花酒',
                artist: '胜屿',
                src: 'http://m10.music.126.net/20201029091342/9e51e595948460aae3a29523de3fce4d/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3',
                pic: 'http://p1.music.126.net/GI5v3O6A7IjzxqnGNNIK1w==/109951164127239077.jpg'
            },
            list: [
                {
                    title: '再见曲中人',
                    artist: '丁文涛',
                    src: 'http://m10.music.126.net/20201029090608/4e7b323a79d244dbf02c2ad9865b1029/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2470428796/372e/c983/0529/7acde67af7e207e40d7509d337f2a9ec.mp3',
                    pic: 'http://p1.music.126.net/qRvVYt0AlA190xZNM7mmsQ==/109951164975688110.jpg'
                },
                {
                    title: '桃花酒',
                    artist: '胜屿',
                    src: 'http://m10.music.126.net/20201029091342/9e51e595948460aae3a29523de3fce4d/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3',
                    pic: 'http://p1.music.126.net/GI5v3O6A7IjzxqnGNNIK1w==/109951164127239077.jpg'
                }
            ]
        }
    },
    methods: {
        handleClose(done) {
            done()
        }
    }
}
</script>

<style lang="less">
.player {
    position: fixed;
    top: 50%;
    z-index: 9999;
    .player-img {
        position: absolute;
        left: -40px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #999;
        &:active {
            opacity: 0.7;
        }
        
    }
}
</style>
