<template>
    <div class="player">
        <aplayer autoplay :music="music" showLrc theme="pic" :list="list" />
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
Aplayer.disableVersionBadge = true
export default {
    components: {
        Aplayer
    },
    data() {
        return {
            music: {
                title: '桃花酒',
                artist: '胜屿',
                src: 'http://m10.music.126.net/20201029002949/4f5a668d70ba5c061c6781478680dd5b/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3',
                pic: 'http://p1.music.126.net/GI5v3O6A7IjzxqnGNNIK1w==/109951164127239077.jpg'
            },
            list: [
                {
                    title: '再见曲中人',
                    artist: '丁文涛',
                    src: 'http://m10.music.126.net/20201029001827/84eb8ff3ed1af4527efc19ecdbf2b9ac/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2470428796/372e/c983/0529/7acde67af7e207e40d7509d337f2a9ec.mp3',
                    pic: 'http://p1.music.126.net/qRvVYt0AlA190xZNM7mmsQ==/109951164975688110.jpg'
                },
                {
                    title: '桃花酒',
                    artist: '胜屿',
                    src: 'http://m10.music.126.net/20201029002949/4f5a668d70ba5c061c6781478680dd5b/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3',
                    pic: 'http://p1.music.126.net/GI5v3O6A7IjzxqnGNNIK1w==/109951164127239077.jpg'
                },
                {
                    title: '桃花酒',
                    artist: '胜屿',
                    src: 'http://m10.music.126.net/20201029002949/4f5a668d70ba5c061c6781478680dd5b/ymusic/050c/535a/0658/2f04f7fb7ad01b0775c012a7e962261f.mp3',
                    pic: 'http://p1.music.126.net/GI5v3O6A7IjzxqnGNNIK1w==/109951164127239077.jpg'
                }
            ]
        }
    },
    methods: {}
}
</script>

<style lang="less">
.player {
    width: 350px;
    position: fixed;
    top: 50%;
    z-index: 50;
}
</style>
