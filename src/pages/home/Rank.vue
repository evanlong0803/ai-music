<template>
    <div class="rank" v-loading="!(charaRand && globalMediaRand).length">
        <div class="rank-title">云音乐特色榜</div>
        <SongSheets :charaRand="charaRand" />
        <div class="rank-title mediaRand">全球媒体榜</div>
        <SongSheets :globalMediaRand="globalMediaRand" />
    </div>
</template>

<script>
import SongSheets from '../../components/detail/SongSheets'

export default {
    components: {
        SongSheets
    },
    data() {
        return {
            // 特色榜
            charaRand: [],
            // 全球媒体榜
            globalMediaRand: []
        }
    },
    created() {
        this.loadAllRand()
    },
    methods: {
        // 加载所有榜单内容摘要
        async loadAllRand() {
            const { data: res } = await this.$axios.get('/toplist/detail')
            if (res.code !== 200) {
                return this.$message.error('精彩评论请求失败')
            }
            this.charaRand = res.list.splice(0, 4)
            this.globalMediaRand = res.list.splice(0)
        },
        // 跳转详情页
        goDetail(id) {
            this.$router.push(`/songdetail?id=${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.rank {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .rank-title {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
        padding-left: 15px;
        border-left: 3px solid #409eff;
        margin-bottom: 30px;
    }
    .mediaRand {
        margin-top: 30px;
    }
}
</style>
