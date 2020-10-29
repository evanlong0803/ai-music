<template>
    <div class="detail">
        <el-row class="goBack">
            <el-col :span="24">
                <el-page-header @back="goBack" content="歌单详情"></el-page-header>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 左侧 -->
            <el-col :span="17">
                <!-- 左侧卡片 -->
                <el-card class="left-card">
                    <!-- 左侧上部分 -->
                    <el-row class="card-top">
                        <el-col :span="7">
                            <el-image class="top-left-img" :src="detail.coverImgUrl" fit="cover"></el-image>
                        </el-col>
                        <el-col :span="17">
                            <div class="top-right">
                                <h2 class="top-right-title">{{ detail.name }}</h2>
                                <div class="top-right-userInfo">
                                    <el-image class="userInfo-avatar" :src="creator.avatarUrl" fit="cover"></el-image>
                                    <div class="userInfo-name">{{ creator.nickname }}</div>
                                    <div class="userInfo-time">更新时间：{{ detail.updateTime | timeStamp }}</div>
                                </div>
                                <div class="top-right-tag">
                                    标签：
                                    <el-tag v-for="(item, index) in detail.tags" :key="index">{{ item }}</el-tag>
                                </div>
                                <div class="top-right-description">{{ detail.description }}</div>
                                <el-link type="danger" :underline="false" @click="descriptionDialog = true">全部<i class="el-icon-arrow-right"></i></el-link>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 左侧下部分 -->
                    <div class="card-bottom">
                        <div class="bottom-button">
                            <el-button type="primary" round size="medium" icon="el-icon-caret-right">播放全部</el-button>
                            <el-button round size="medium" icon="el-icon-star-off">收藏</el-button>
                        </div>
                        <!-- 播放歌单 -->
                        <div class="bottom-song">
                            <el-table :data="songDetail" v-loading="!songDetail.length" size="medium" stripe :header-cell-style="{ background: '#FAFAFA', color: '#606266' }" @row-click="rowClick">
                                <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="70"> </el-table-column>
                                <el-table-column label="歌曲" width="220" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <div class="songName">
                                            <el-avatar shape="square" :size="35" :src="scope.row.al.picUrl"></el-avatar>
                                            <div>{{ scope.row.name }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="歌手" width="150" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-for="(item, index) in scope.row.ar" :key="index">
                                            {{ item.name }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="al.name" label="专辑" width="180" show-overflow-tooltip></el-table-column>
                                <el-table-column label="时长" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.dt | playTime }}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="7">
                <!-- 喜欢歌单 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">喜欢这个歌单的伙伴</div>
                    <el-row class="card-users" :gutter="15" type="flex" v-loading="!subscribers.length">
                        <el-col :span="4" v-for="(item, index) in subscribers" :key="index">
                            <el-tooltip effect="dark" :content="item.nickname" placement="top" :open-delay="260">
                                <el-image class="users-avatar" :src="item.avatarUrl" fit="cover"></el-image>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <div></div>
                </el-card>
                <!-- 相关推荐 -->
                <el-card class="right-card" shadow="hover" v-loading="!featured.length">
                    <div class="card-title">相关推荐</div>
                    <div class="card-featured" v-for="(item, index) in featured" :key="index">
                        <div class="featured-left">
                            <el-image class="featured-avatar" :src="item.coverImgUrl" fit="cover"></el-image>
                        </div>
                        <div class="featured-right">
                            <div class="featured-title">{{ item.name }}</div>
                            <div class="featured-name">By. {{ item.creator.nickname }}</div>
                        </div>
                    </div>
                </el-card>
                <!-- 精彩评论 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">精彩评论</div>
                    <div class="card-comments" v-for="(item, index) in hotComments" :key="index">
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

            <!-- 查看全部描述对话框 -->
            <el-dialog :title="detail.name" :visible.sync="descriptionDialog" width="30%">
                <div class="dialog-content">{{ detail.description }}</div>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'detail',
    data() {
        return {
            // 歌单ID
            songListId: '',
            // 歌单详情
            detail: {},
            creator: {},
            // 喜欢歌单的伙伴
            subscribers: [],
            // 相关评论
            featured: [],
            // 精彩评论
            hotComments: [],
            // 歌曲详情
            songDetail: [],
            // 音乐URL
            musicURL: [],
            // 查看全部描述对话框
            descriptionDialog: false,
            // 自定义索引
            indexMethod(index) {
                return index + 1 < 10 ? '0' + (index + 1) : index + 1
            }
        }
    },
    created() {
        this.songListId = this.$route.query.id
        this.loadDetail()
        this.loadSubscribers()
        this.loadFeatured()
        this.loadComments()
    },
    methods: {
        // 加载歌单详情
        async loadDetail() {
            const { data: res } = await this.$axios.get(`/playlist/detail?id=${this.songListId}`)
            if (res.code !== 200) {
                return this.$message.error('歌单详情请求失败')
            }
            this.detail = res.playlist
            this.creator = res.playlist.creator
            // 储存音乐ID
            let trackIds = res.playlist.trackIds.map(item => {
                return item.id
            })
            this.loadSongDetail(trackIds)
        },
        // 加载喜欢歌单的人
        async loadSubscribers() {
            const { data: res } = await this.$axios.post('/playlist/subscribers', {
                id: this.songListId,
                limit: 30
            })
            if (res.code !== 200) {
                return this.$message.error('歌单收藏的用户请求失败')
            }
            this.subscribers = res.subscribers
        },
        // 加载相关推荐
        async loadFeatured() {
            const { data: res } = await this.$axios.get(`/related/playlist?id=${this.songListId}`)
            if (res.code !== 200) {
                return this.$message.error('相关推荐请求失败')
            }
            this.featured = res.playlists
        },
        // 加载精彩评论
        async loadComments() {
            const { data: res } = await this.$axios.get(`/comment/playlist?id=${this.songListId}`)
            if (res.code !== 200) {
                return this.$message.error('精彩评论请求失败')
            }
            // 如果没有精彩评论就给普通评论，统一12条
            this.hotComments = res.hotComments.length === 0 ? res.comments.splice(0, 12) : res.hotComments
        },
        // 加载歌曲详情
        async loadSongDetail(trackIds) {
            const { data: res } = await this.$axios.get(`/song/detail?ids=${trackIds.join(',')}`)
            if (res.code !== 200) {
                return this.$message.error('歌曲详情请求失败')
            }
            this.songDetail = res.songs
            this.loadMusicURL(trackIds)
        },
        // 加载音乐URL
        async loadMusicURL(trackIds) {
            const { data: res } = await this.$axios.get(`/song/url?id=${trackIds.join(',')}`)
            if (res.code !== 200) {
                return this.$message.error('音乐URL请求失败')
            }
            // 储存每首音乐的RUL
            let musicURL = res.data.map(item => {
                return { url: item.url, id: item.id }
            })
            // 将每一个音乐URL放入对象属性中
            for (const i in musicURL) {
                for (const j in this.songDetail) {
                    if (this.songDetail[j].id === musicURL[i].id) {
                        this.$set(this.songDetail[j], 'url', musicURL[i].url)
                    }
                }
            }
        },
        // 当某一行被点击时
        rowClick(row) {
            console.log(row)
        },
        // 返回上一级
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.songName {
    .el-table .cell.el-tooltip {
        display: flex;
    }
}
.detail {
    width: 1200px;
    margin: 0 auto;
    // 左边
    .left-card {
        height: 100%;
        border-radius: 10px;
        // 左侧上部分
        .card-top {
            .top-left-img {
                width: 200px;
                height: 200px;
                border-radius: 8px;
                box-shadow: 5px 5px 5px #999;
            }

            .top-right {
                height: 200px;
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;
                justify-content: space-between;
                .top-right-title {
                    color: #4a4a4a;
                }

                .top-right-userInfo {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: flex-start;
                    .userInfo-avatar {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    .userInfo-name {
                        font-size: 14px;
                        margin-right: 20px;
                    }
                    .userInfo-time {
                        font-size: 14px;
                        color: #999;
                    }
                }

                .top-right-tag {
                    font-size: 14px;
                    .el-tag {
                        height: 25px;
                        line-height: 23px;
                        padding: 0 15px;
                        margin-right: 10px;
                        border-radius: 20px;
                    }
                }

                .top-right-description {
                    width: 70%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        // 左侧下部分
        .card-bottom {
            .bottom-button {
                margin: 20px 0;
                text-align: right;
            }
            .bottom-song {
                width: 100%;
                height: 100%;
                // 歌曲样式
                .songName {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    div {
                        width: 70%;
                        margin-left: 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
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

        // 喜欢这个歌单的人
        .card-users {
            flex-flow: row wrap;
            .users-avatar {
                border-radius: 5px;
                margin: 5px 0;
                cursor: pointer;
            }
        }

        // 相关推荐
        .card-featured {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            margin-top: 20px;

            // 左边
            .featured-left {
                width: 50px;
                height: 100%;
                margin-right: 20px;
                .featured-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
            // 右边
            .featured-right {
                cursor: pointer;
                width: 220px;
                .featured-title {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    &:hover {
                        color: #f56c6c;
                    }
                }
                .featured-name {
                    font-size: 12px;
                    color: #999;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
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

    // 对话框内容
    .dialog-content {
        border-radius: 8px;
        margin-bottom: 20px;
        color: #666;
    }
}
.goBack {
    margin-bottom: 20px;
}
</style>
