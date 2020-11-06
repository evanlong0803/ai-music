<template>
    <div class="song-sheets">
        <el-row type="flex" :gutter="50" style="flex-flow: row wrap;">
            <el-col :span="4" v-for="(item, index) in songSheet || charaRand || globalMediaRand || createdSongSheet || collectSongSheet" :key="index">
                <div class="featured-songList" @click="goDetail(item.id)">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.coverImgUrl || item.picUrl" fit="cover">
                        <div slot="placeholder" class="image-slot"></div>
                        <div slot="error" class="image-slot"></div>
                    </el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['songSheet', 'charaRand', 'globalMediaRand', 'createdSongSheet', 'collectSongSheet'],

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
            width: 100%;
            height: 100%;
            border-radius: 5px;
            background: #ccc;
            margin-bottom: 10px;
            .image-slot {
                width: 158px;
                height: 158px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url('../assets/image/rainbow.png') no-repeat;
                background-size: cover;
            }
        }
        // 播放总数
        .el-tag {
            position: absolute;
            z-index: 1;
            margin: 8px;
            height: 20px;
            padding: 0;
            line-height: 20px;
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
