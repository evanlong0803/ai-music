<template>
    <div class="detail">
        <el-row :gutter="20">
            <!-- 左侧 -->
            <el-col :span="17">
                <!-- 左侧卡片 -->
                <el-card class="left-card">
                    <!-- 视频 -->
                    <video
                        class="left-video"
                        src="http://vodkgeyttp9c.vod.126.net/cloudmusic/Lvx6vB4I_3153322915_shd.mp4?ts=1604391305&rid=47115DC667964F5C42BDE925D7219E80&rl=3&rs=RpAkaSmvogaExXGGEisIbWXMQkLGhQIK&sign=adca1617650aa7ec763ff48508305c93&ext=NnR5gMvHcZNcbCz592mDGUGuDOFN18isir07K1EOfL1IOAqt1di9xfMYh8FSV0jdpDvFHlvc6so%2B893WdKMkZBD36lH10vdl5Pk11AP7qy53yqYexWCadvO6kS7FuC12ezVYdhO6ASFzYdfND2L58mfls%2BaNlRpXZ2nxMfqQmpvlc6C07KR9Orv1EFCZSZSICXfQmn0rFZpXpgBGfh8syldcYP89c6jQRw055qmgBShyZTZ22JJ8TMen3noHmpkN"
                    ></video>
                    <!-- 标题 -->
                    <div class="left-title">《游京》-海伦，我走在长街中，听戏子唱京</div>
                    <!-- 时间 -->
                    <div class="left-time">
                        <span>发布：2020-10-09</span>
                        <span>播放次数：25.9万</span>
                    </div>
                    <!-- 点赞转发评论 -->
                    <div class="left-relay">
                        <span><el-button plain round size="small" icon="el-icon-thumb">1814</el-button></span>
                        <span><el-button plain round size="small" icon="el-icon-star-off">269</el-button></span>
                        <span><el-button plain round size="small" icon="el-icon-share">156</el-button></span>
                    </div>
                    <!-- 评论总数 -->
                    <div class="left-total">
                        <i class="el-icon-chat-dot-round"></i>Comments<el-divider direction="vertical"></el-divider>31 条评论
                    </div>

                    <!-- 精彩评论 -->
                    <div class="comments-title">精彩评论</div>
                    <div class="card-comments" v-for="(item, index) in 5" :key="index">
                        <!-- 左侧 -->
                        <div class="comments-left">
                            <el-avatar :size="40" src="https://p3.music.126.net/IVpiGu6aQTmniHIcCwY_2g==/109951163259121174.jpg"></el-avatar>
                        </div>
                        <!-- 右侧 -->
                        <div class="comments-right">
                            <div class="right-name">
                                黔colourful
                                <span>3周前</span>
                            </div>
                            <div class="right-content">真正能显出大唐盛世长安城的电影我觉得只有妖猫传没有之一</div>
                        </div>
                    </div>
                    <el-pagination class="paging" background layout="prev, pager, next" :total="15"> </el-pagination>
                </el-card>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="7">
                <!-- 视频简介 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">视频简介</div>
                    <div class="right-author">
                        <el-avatar :size="40" src="http://p1.music.126.net/yBnM8TAREa09piL__XO7pQ==/109951165341110651.jpg"></el-avatar>
                        <span>兔子群里一只虎</span>
                    </div>
                    <div class="right-description">《游京》-海伦，我走在长街中，听戏子唱京城</div>
                </el-card>
                <!-- 相关推荐 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">相关推荐</div>
                    <div class="recommend-video" v-for="(item, index) in 5" :key="index">
                        <el-image
                            class="video-img"
                            src="http://p1.music.126.net/NlMkkJsxEPQFK7zlsx_4TQ==/109951163573034535.jpg"
                            fit="cover"
                        ></el-image>
                        <div class="video-title">s.h.e 15周年 - 三人合唱版《小幸運》，满满的青春回忆</div>
                        <div class="video-author">By. 赏乐朝天</div>
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
            videoDetail: {}
        }
    },
    created() {
        this.videoId = this.$route.query.id
        // 加载视频详情
        this.loadVideoDetail()
    },
    methods: {
        async loadVideoDetail() {
            const { data: res } = await this.$axios.get(`/video/detail?id=${this.videoId}`)
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.videoDetail = res.data
            console.log(res)
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
        // 分页
        .paging {
            text-align: center;
            margin-top: 30px;
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
