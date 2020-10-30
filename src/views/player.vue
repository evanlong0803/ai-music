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
    // 页面渲染完成后开始监听
    mounted() {
        // 接收首页新歌单曲
        this.$root.$on('getNewSong', newSong => {
            // 如果已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === newSong.id) {
                    this.$refs.aplayer.switch(newSong.name)
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
            this.$refs.aplayer.play() // 开始播放
            this.$notify({
                title: '消息',
                message: `正在播放《${newSong.name}》`,
                type: 'success',
                position: 'top-left'
            })
        })

        // 接收详情页单曲
        this.$root.$on('getSingle', Single => {
            // 如果已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === Single.id) {
                    this.$refs.aplayer.switch(Single.name)
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
            this.$refs.aplayer.play() // 开始播放
            this.$notify({
                title: '消息',
                message: `正在播放《${Single.name}》`,
                type: 'success',
                position: 'top-left'
            })
        })

        // 接收当前歌单所有歌曲
        this.$root.$on('getAllSong', allSong => {
            this.list = allSong
        })
    }
}
</script>
