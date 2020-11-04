<template>
    <div class="song-sheets">
        <el-row type="flex" :gutter="50" style="flex-flow: row wrap;">
            <el-col :span="4" v-for="(item, index) in songSheet || FeaturedSongList || charaRand || globalMediaRand" :key="index">
                <div class="featured-songList" @click="goDetail(item.id)">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.coverImgUrl || item.picUrl" fit="cover"></el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['songSheet', 'FeaturedSongList', 'charaRand', 'globalMediaRand'],

    methods: {
        // 跳转详情页
        goDetail(id) {
            this.$router.push(`/songdetail?id=${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.song-sheets {
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
