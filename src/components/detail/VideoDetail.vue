<template>
    <div class="detail">
        <el-row :gutter="20">
            <!-- 左侧 -->
            <el-col :span="17">
                <!-- 左侧卡片 -->
                <el-card class="left-card">
                    <!-- 视频 -->
                    <video class="left-video" :src="videoDetail.url" type="video/mp4" controls></video>
                    <!-- 标题 -->
                    <div class="left-title">{{ videoDetail.title }}</div>
                    <!-- 时间 -->
                    <div class="left-time">
                        <span>发布：{{ videoDetail.publishTime | timeStampTwo }}</span>
                        <span>播放次数：{{ videoDetail.playTime | playCount }}</span>
                    </div>
                    <!-- 点赞转发评论 -->
                    <div class="left-relay">
                        <span>
                            <el-button plain round size="small" icon="el-icon-thumb">{{ videoDetail.praisedCount }}</el-button>
                        </span>
                        <span>
                            <el-button plain round size="small" icon="el-icon-star-off">{{ videoDetail.subscribeCount }}</el-button>
                        </span>
                        <span>
                            <el-button plain round size="small" icon="el-icon-share">{{ videoDetail.shareCount }}</el-button>
                        </span>
                    </div>
                    <!-- 评论总数 -->
                    <div class="left-total">
                        <i class="el-icon-chat-dot-round"></i>Comments <el-divider direction="vertical"></el-divider>{{ videoComment.length }} 条评论
                    </div>

                    <!-- 精彩评论 -->
                    <div class="comments-title">精彩评论</div>
                    <div class="card-comments" v-for="(item, index) in videoComment" :key="index">
                        <!-- 左侧 -->
                        <div class="comments-left">
                            <el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
                        </div>
                        <!-- 右侧 -->
                        <div class="comments-right">
                            <div class="right-name">
                                {{ item.user.nickname }}
                                <span>{{ item.time | time }}</span>
                            </div>
                            <div class="right-content">{{ item.content }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="7">
                <!-- 视频简介 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">视频简介</div>
                    <!-- 取用户ID：videoDetail.creator.userId -->
                    <div class="right-author">
                        <el-avatar :size="40" :src="videoDetail.avatarUrl"></el-avatar>
                        <span>{{ ((videoDetail || {}).creator || {}).nickname }}</span>
                    </div>
                    <div class="right-description">{{ videoDetail.description }}</div>
                </el-card>
                <!-- 相关推荐 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">相关推荐</div>
                    <div class="recommend-video" v-for="(item, index) in relevantVideo" :key="index" @click="reload(item.vid)">
                        <el-image class="video-img" :src="item.coverUrl" fit="cover"></el-image>
                        <div class="video-title">{{ item.title }}</div>
                        <div class="video-author">By. {{ item.creator[0].userName }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 视频ID
            videoId: '',
            // 视频详情
            videoDetail: {},
            // 视频评论
            videoComment: [],
            // 相关视频
            relevantVideo: []
        }
    },
    created() {
        this.videoId = this.$route.query.id
        // 加载视频详情
        this.loadVideoDetail()
    },
    methods: {
        // 加载视频详情
        async loadVideoDetail() {
            const { data: res } = await this.$axios.get(`/video/detail?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.videoDetail = res.data
            // 加载视频播放地址
            this.loadVideoURL()
            // 加载视频点赞转发评论数数据
            this.loadVideoRelay()
            // 加载视频评论
            this.loadVideoComment()
            // 加载相关视频
            this.loadRelevantVideo()
        },
        // 加载视频播放地址
        async loadVideoURL() {
            const { data: res } = await this.$axios.get(`/video/url?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.$set(this.videoDetail, 'url', res.urls[0].url)
        },
        // 加载视频点赞转发评论数数据
        async loadVideoRelay() {
            const { data: res } = await this.$axios.get(`/video/detail/info?vid=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.$set(this.videoDetail, 'shareCount', res.shareCount)
        },
        // 加载视频评论
        async loadVideoComment() {
            const { data: res } = await this.$axios.get(`/comment/video?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.videoComment = res.hotComments
        },
        // 加载相关视频
        async loadRelevantVideo() {
            const { data: res } = await this.$axios.get(`/related/allvideo?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.relevantVideo = res.data
        },
        // 重新跳转详情
        reload(id) {
            // 防止出现路由冗余
            if (this.videoId === id) return
            this.videoId = id
            this.$router.push(`/videodetail?id=${id}`)
            // 加载视频详情
            this.loadVideoDetail()
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    // 左侧
    .left-card {
        width: 100%;
        .left-video {
            width: 100%;
            outline: none;
            border-radius: 5px;
        }
        .left-title {
            margin: 20px 0;
            font-weight: 600;
        }
        .left-time {
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
            span {
                margin-right: 20px;
            }
        }
        .left-relay {
            margin-bottom: 40px;
            span {
                margin-right: 15px;
            }
        }
        .left-total {
            font-size: 14px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            // 图标
            .el-icon-chat-dot-round {
                margin-right: 5px;
            }
        }
        // 评论标题
        .comments-title {
            margin-top: 15px;
            font-weight: 600;
        }
        // 精彩评论
        .card-comments {
            height: 100%;
            display: flex;
            margin-top: 30px;

            .comments-left {
                margin-right: 12px;
                cursor: pointer;
            }
            .comments-right {
                width: 100%;
                .right-name {
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    cursor: pointer;
                    span {
                        font-size: 12px;
                        font-weight: normal;
                        color: #999;
                        margin-left: 5px;
                    }
                }
                .right-content {
                    background: #f5f5f5;
                    border-radius: 5px;
                    font-size: 12px;
                    padding: 5px 10px;
                    line-height: 1.6;
                }
            }
        }
    }

    // 右边
    .right-card {
        border-radius: 10px;
        height: 100%;
        margin-bottom: 20px;
        .card-title {
            font-size: 15px;
            font-weight: bold;
            padding-left: 10px;
            border-left: 3px solid #409eff;
            margin-bottom: 20px;
        }
        .right-author {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #4a4a4a;
            margin-bottom: 15px;
            span {
                margin-right: 15px;
            }
        }
        .right-description {
            font-size: 14px;
            color: #4a4a4a;
        }

        // 视频推荐
        .recommend-video {
            width: 100%;
            cursor: pointer;
            margin-bottom: 20px;

            .video-img {
                width: 100%;
                border-radius: 5px;
            }
            .video-title {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                font-weight: bold;
                margin: 5px 0;
                color: #4a4a4a;
                &:hover {
                    color: #f56c6c;
                }
            }
            .video-author {
                font-size: 12px;
                color: #666;
            }
        }
    }
}
</style>
