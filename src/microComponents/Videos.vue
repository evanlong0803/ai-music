<template>
    <div class="videos">
        <el-row :gutter="30" type="flex" style="flex-flow: row wrap;">
            <el-col :span="6" v-for="(item, index) in video" class="video" :key="index">
                <div class="videos-box">
                    <el-image :src="item.coverUrl" fit="cover"></el-image>
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playTime | playCount }}</el-tag>
                    <div class="box-bottom">
                        <div class="play-time">{{ item.durationms | playTime }}</div>
                    </div>
                </div>
                <div class="videos-title">{{ item.title }}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['video'],
    created() {
        console.log(this.video)
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
                .play-time {
                    line-height: 30px;
                    text-align: right;
                    font-size: 14px;
                    padding: 0 10px;
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
