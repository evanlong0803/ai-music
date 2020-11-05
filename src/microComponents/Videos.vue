<template>
    <div class="videos">
        <el-row :gutter="30" type="flex" style="flex-flow: row wrap;">
            <el-col :span="6" v-for="(item, index) in video" class="video" :key="index">
                <div class="videos-box" @click="goDetail(item.vid || item.id)">
                    <el-image :src="item.coverUrl || item.cover" fit="cover"></el-image>
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ Number(item.playTime) || Number(item.playCount) | playCount }}</el-tag>
                    <div class="box-bottom">
                        <div class="bottom-name">{{ item.artistName || null }}</div>
                        <div class="bottom-time">{{ item.durationms || item.duration | playTime }}</div>
                    </div>
                </div>
                <div class="videos-title">{{ item.title || item.name }}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['video'],
    methods: {
        // 跳转详情页
        goDetail(id) {
            this.$router.push(`/videodetail?id=${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.videos {
    width: 100%;
    .video {
        margin-bottom: 30px;
        .videos-box {
            height: 175px;
            background: wheat;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;
            border-radius: 5px;
            // 图片
            .el-image {
                position: absolute;
                top: 0;
                bottom: 0;
                border-radius: 5px;
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
            // 播放时间
            .box-bottom {
                width: 100%;
                height: 30px;
                position: absolute;
                bottom: 0;
                border-radius: 0 0 5px 5px;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 15px;
                .bottom-name {
                    font-size: 14px;
                    color: white;
                }
                .bottom-time {
                    font-size: 14px;
                    color: white;
                }
            }
        }
        // 标题
        .videos-title {
            font-size: 14px;
            color: #4a4a4a;
        }
    }
}
</style>
