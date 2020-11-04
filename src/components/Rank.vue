<template>
    <div class="rank">
        <div class="rank-title">云音乐特色榜</div>
        <el-row type="flex" :gutter="50" style="flex-flow: row wrap;margin-bottom: 20px;">
            <el-col :span="4" v-for="(item, index) in charaRand" :key="index">
                <div class="featured-songList" @click="goDetail(item.id)">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.coverImgUrl" fit="cover"></el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>
        <div class="rank-title">全球媒体榜</div>
        <el-row type="flex" :gutter="50" style="flex-flow: row wrap;">
            <el-col :span="4" v-for="(item, index) in globalMediaRand" :key="index">
                <div class="featured-songList" @click="goDetail(item.id)">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.coverImgUrl" fit="cover"></el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            allRand: [],
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
        font-size: 17px;
        font-weight: bold;
        padding-left: 15px;
        border-left: 3px solid #409eff;
        margin-bottom: 20px;
    }
    // 推荐歌单
    .featured-songList {
        cursor: pointer;
        .songList-img {
            border-radius: 5px;
            background: #ccc;
            margin-bottom: 10px;
        }
        // 播放总数
        .el-tag {
            position: absolute;
            z-index: 1;
            margin: 8px;
            height: 20px;
            padding: 0;
            line-height: 18px;
            padding: 0 3px;
            text-align: center;
            background: black;
            color: white;
        }
        .songList-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 25px;
        }
    }
}
</style>
