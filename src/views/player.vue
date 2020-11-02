<template>
    <div class="player">
        <transition name="el-fade-in-linear">
            <aplayer autoplay ref="aplayer" fixed :audio="list" theme="#409EFF" v-show="list.length" />
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 播放列表
            list: []
        }
    },
    // 一定是在页面渲染完成后开始监听
    mounted() {
        this.$nextTick(() => {
            // 接收首页新歌单曲
            this.getNewSong()
            // 接收详情页单曲
            this.getSingle()
            // 接收当前歌单所有歌曲
            this.getAllSong()
        })
    },
    methods: {
        // 接收首页新歌单曲
        getNewSong() {
            this.$root.$on('getNewSong', newSong => {
                for (const i in this.list) {
                    // 如果在列表中发现有重复的歌曲ID
                    if (this.list[i].id === newSong.id) {
                        // 切换到对应名称的歌曲
                        this.$refs.aplayer.switch(newSong.name)
                        // 立即播放
                        this.$refs.aplayer.play()
                        return this.$notify({
                            title: '消息',
                            message: `正在播放《${newSong.name}》`,
                            type: 'success',
                            position: 'top-left'
                        })
                    }
                }
                this.list.unshift(newSong)
                this.$refs.aplayer.switch(0) // 切换到播放列表中的第一首歌
                // this.$refs.aplayer.play() // 立即播放
                this.$notify({
                    title: '消息',
                    message: `正在播放《${newSong.name}》`,
                    type: 'success',
                    position: 'top-left'
                })
            })
        },
        // 接收详情页单曲
        getSingle() {
            this.$root.$on('getSingle', Single => {
                for (const i in this.list) {
                    // 如果在列表中发现有重复的歌曲ID
                    if (this.list[i].id === Single.id) {
                        // 切换到对应名称的歌曲
                        this.$refs.aplayer.switch(Single.name)
                        // 立即播放
                        this.$refs.aplayer.play()
                        return this.$notify({
                            title: '消息',
                            message: `正在播放《${Single.name}》`,
                            type: 'success',
                            position: 'top-left'
                        })
                    }
                }
                this.list.unshift(Single)
                this.$refs.aplayer.switch(0) // 切换到播放列表中的第一首歌
                // this.$refs.aplayer.play() // 立即播放
                this.$notify({
                    title: '消息',
                    message: `正在播放《${Single.name}》`,
                    type: 'success',
                    position: 'top-left'
                })
            })
        },
        // 接收当前歌单所有歌曲
        getAllSong() {
            this.$root.$on('getAllSong', allSong => {
                this.list = allSong
                // this.$refs.aplayer.switch(0) // 切换到播放列表中的第一首歌
                this.$notify({
                    title: '消息',
                    message: `正在播放全部歌曲`,
                    type: 'success',
                    position: 'top-left'
                })
            })
        }
    }
}
</script>
