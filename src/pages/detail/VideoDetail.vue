<template>
    <div class="detail">
        <el-row :gutter="20">
            <!-- 左侧 -->
            <el-col :span="17">
                <!-- 左侧卡片 -->
                <el-card class="left-card">
                    <!-- 视频 -->
                    <div class="left-video">
                        <video autoplay class="video" :src="videoDetail.url" type="video/mp4" controls></video>
                    </div>
                    <!-- 标题 -->
                    <div class="left-title">{{ videoDetail.title }}</div>
                    <!-- 时间 -->
                    <div class="left-time">
                        <span>发布：{{ videoDetail.publishTime | timeStampTwo }}</span>
                        <span>播放次数：{{ Number(videoDetail.playTime) || Number(videoDetail.playCount) | playCount }}</span>
                    </div>
                    <!-- 点赞转发评论 -->
                    <div class="left-relay">
                        <span>
                            <el-button plain round size="small" icon="el-icon-thumb">
                                {{ videoDetail.praisedCount || videoDetail.likedCount }}
                            </el-button>
                        </span>
                        <span>
                            <el-button plain round size="small" icon="el-icon-star-off">
                                {{ videoDetail.subscribeCount || videoDetail.subCount }}
                            </el-button>
                        </span>
                        <span>
                            <el-button plain round size="small" icon="el-icon-share">
                                {{ videoDetail.shareCount }}
                            </el-button>
                        </span>
                    </div>
                    <!-- 评论总数 -->
                    <div class="left-total">
                        <i class="el-icon-chat-dot-round"></i>Comments <el-divider direction="vertical"></el-divider>{{ videoComment.length }} 条评论
                    </div>
                    <!-- 分割线 -->
                    <el-divider></el-divider>
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
                    <div v-if="videoDetail.description">
                        <div class="right-author">
                            <el-avatar :size="40" :src="videoDetail.avatarUrl"></el-avatar>
                            <span>{{ ((videoDetail || {}).creator || {}).nickname }}</span>
                        </div>
                        <div class="right-description">{{ videoDetail.description }}</div>
                    </div>
                    <div v-else-if="videoDetail.desc" class="right-description">{{ videoDetail.desc }}</div>
                    <div v-else class="right-description">视频暂无简介</div>
                </el-card>
                <!-- 相关推荐 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">相关推荐</div>
                    <div class="recommend-video" v-for="(item, index) in relevantVideo" :key="index" @click="reload(item.vid || item.id)">
                        <el-image class="video-img" :src="item.coverUrl || item.cover" fit="cover"></el-image>
                        <div class="video-title">{{ item.title || item.name }}</div>
                        <span class="video-author" v-for="(item2, index2) in item.artists" :key="index2">
                            {{ (item2.creator || []).userName || item2.name }}
                        </span>
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
        if (this.videoId.length > 30) {
            // 加载视频详情
            this.loadVideoDetail()
        }
        // 加载MV详情
        this.loadMVDetail()
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
            this.videoComment = res.hotComments.concat(res.comments)
        },
        // 加载相关视频
        async loadRelevantVideo() {
            const { data: res } = await this.$axios.get(`/related/allvideo?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.relevantVideo = res.data
        },
        // 加载MV详情
        async loadMVDetail() {
            const { data: res } = await this.$axios.get(`/mv/detail?mvid=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('加载MV详情失败')
            }
            this.videoDetail = res.data
            // 加载MV URL
            this.loadMVURL()
            // 加载MV点赞转发评论数数据
            this.loadMVRelay()
            // 加载MV评论
            this.loadMVComment()
            // 加载相关MV
            this.loadRelevantMV()
        },
        // 加载MV URL
        async loadMVURL() {
            const { data: res } = await this.$axios.get(`/mv/url?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.$set(this.videoDetail, 'url', res.data.url)
        },
        // 加载MV点赞转发评论数数据
        async loadMVRelay() {
            const { data: res } = await this.$axios.get(`/mv/detail/info?mvid=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.$set(this.videoDetail, 'shareCount', res.shareCount)
            this.$set(this.videoDetail, 'likedCount', res.likedCount)
        },
        // 加载MV评论
        async loadMVComment() {
            const { data: res } = await this.$axios.get(`/comment/mv?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.videoComment = res.hotComments.concat(res.comments)
        },
        // 加载相关MV
        async loadRelevantMV() {
            const { data: res } = await this.$axios.get(`/simi/mv?mvid=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.relevantVideo = res.mvs
        },
        // 重新跳转详情
        reload(id) {
            // 防止出现路由冗余
            if (this.videoId === id) return
            this.videoId = id
            this.$router.push(`/videodetail?id=${id}`)
            if (this.videoId.length > 30) {
                // 加载视频详情
                this.loadVideoDetail()
            }
            // 加载MV详情
            this.loadMVDetail()
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
            margin: -20px -20px 20px -20px;
            .video {
                width: 100%;
                outline: none;
                border-radius: 5px 5px 0 0;
            }
        }
        .left-title {
            margin: 20px 0;
            font-weight: 600;
        }
        .left-time {
            font-size: 12px;
            color: #666;
            margin: 0 0 25px 5px;
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
