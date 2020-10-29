<template>
    <div class="player">
        <transition name="el-fade-in-linear">
            <aplayer ref="aplayer" fixed :audio="list" theme="#409EFF" v-if="list.length" />
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
    mounted() {
        // 接收首页新歌单曲
        this.$root.$on('getNewSong', newSong => {
            // 如果已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === newSong.id) {
                    return this.$notify({
                        title: '消息',
                        message: `《${newSong.name}》歌单列表中已存在`,
                        type: 'info',
                        position: 'top-left'
                    })
                }
            }
            this.list.push(newSong)
            this.$notify({
                title: '消息',
                message: `《${newSong.name}》已添加到歌单列表末尾`,
                type: 'success',
                position: 'top-left'
            })
        })

        // 接收详情页单曲
        this.$root.$on('getSingle', Single => {
            // 如果已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === Single.id) {
                    return this.$notify({
                        title: '消息',
                        message: `《${Single.name}》歌单列表中已存在`,
                        type: 'info',
                        position: 'top-left'
                    })
                }
            }
            this.list.push(Single)
            this.$notify({
                title: '消息',
                message: `《${Single.name}》已添加到歌单列表末尾`,
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
