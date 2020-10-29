<template>
    <div class="player">
        <aplayer autoplay :music="list[0]" theme="#409EFF" :list="list" :showLrc="true" listMaxHeight="400px" repeat="repeat-all" controls />
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
            autoplay: true,
            list: []
        }
    },
    created() {
        this.list[0] = {
            title: '再见曲中人',
            artist: '丁文涛',
            src: 'http://m10.music.126.net/20201029145711/8049864f823e116d0fd7c40bb60d286b/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2470428796/372e/c983/0529/7acde67af7e207e40d7509d337f2a9ec.mp3',
            pic: 'http://p1.music.126.net/qRvVYt0AlA190xZNM7mmsQ==/109951164975688110.jpg'
        }
    },
    mounted() {
        // 接收当前单曲歌词
        this.$root.$on('getSingle', Single => {
            // 如果单歌曲已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === Single.id) {
                    return this.$message.success('列表已存在')
                }
            }
            this.list.unshift(Single)
        })

        // 接收当前歌单所有歌曲
        this.$root.$on('getAllSong', allSong => {
            // allSong.forEach(item => {
            //     this.list.push(item)
            // })
            this.list = allSong
        })
    }
}
</script>

<style lang="less">
.player {
    position: fixed;
    bottom: 0;
    width: 320px;
}
</style>
