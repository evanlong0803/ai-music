<template>
    <div class="player">
        <transition name="el-fade-in-linear">
            <aplayer ref="aplayer" fixed :audio="list" theme="#409EFF" v-if="list.length" showLrc @error="err" :lrcType="1" />
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
        // 接收当前单曲歌词
        this.$root.$on('getSingle', Single => {
            // 如果单歌曲已经添加到列表就停止
            for (const i in this.list) {
                if (this.list[i].id === Single.id) {
                    return this.$message.success('列表已存在')
                }
            }
            this.list.push(Single)
            this.$message.success('已添加到歌曲列表中')
        })

        // 接收当前歌单所有歌曲
        this.$root.$on('getAllSong', allSong => {
            this.list = allSong
        })
    },
    methods: {
        // 当播放出现错误的回调
        err() {
            return this.$message.error('当前歌曲链接无效，请切换其他歌曲')
        }
    },
    watch: {
        list() {}
    }
}
</script>
