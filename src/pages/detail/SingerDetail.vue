<template>
    <div class="detail">
        <!-- 上部分 -->
        <div class="detail-top">
            <div class="top-background"></div>
            <div class="top-avatar">
                <el-avatar :size="115" :src="singerInfo.img1v1Url"></el-avatar>
                <div>
                    <i v-if="userDetail.level" :class="`iconfont icon-icon-test${userDetail.level}`"></i>
                    {{ singerInfo.name }}
                    <i
                        :class="{
                            'el-icon-male': (userDetail.profile || {}).gender === 1,
                            'el-icon-female': (userDetail.profile || {}).gender === 2
                        }"
                    ></i>
                </div>
                <el-button round plain icon="el-icon-plus" size="medium" @click="follow()">关注ta</el-button>
            </div>
            <div class="top-profile">
                {{ singerInfo.briefDesc }}
            </div>
            <div class="top-info">
                <span>
                    <div class="info-num">{{ singerInfo.musicSize }}</div>
                    <div>单曲数</div>
                </span>
                <span>
                    <div class="info-num">{{ singerInfo.albumSize }}</div>
                    <div>专辑数</div>
                </span>
                <span>
                    <div class="info-num">{{ singerInfo.mvSize }}</div>
                    <div>MV</div>
                </span>
                <span v-if="(userDetail.profile || {}).followeds">
                    <div class="info-num">
                        {{ (userDetail.profile || {}).followeds | playCount }}
                    </div>
                    <div>粉丝</div>
                </span>
            </div>
            <img class="top-modification" src="../../assets/image/arrow-lr.5aa8d800.png" />
        </div>
        <div class="detail-bottom">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="作品" name="works">
                    <el-button class="single-allPlay" type="primary" round size="medium" icon="el-icon-caret-right" @click="allPlay">
                        播放全部
                    </el-button>
                    <!-- 播放列表 -->
                    <PlayList :single="single" v-loading="!single.length" />
                </el-tab-pane>
                <el-tab-pane label="专辑" name="album">
                    <Albums :album="album" v-loading="!album.length" />
                </el-tab-pane>
                <el-tab-pane label="MV" name="MV">
                    <Videos :video="video" v-loading="!video.length" v-if="video.length" />
                    <div v-else class="noMore">暂无MV</div>
                </el-tab-pane>
                <el-tab-pane label="歌手简介" name="profile">
                    <div class="bottom-profile">
                        <h2>歌手简介</h2>
                        <div>{{ profile.briefDesc }}</div>
                        <div v-for="(item, index) in profile.introduction" :key="index">
                            <h3>{{ item.ti }}</h3>
                            <pre>{{ item.txt }}</pre>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="相似歌手" name="similar">
                    <el-row :gutter="40" type="flex" style="flex-flow: row wrap" class="bottom-similar" v-if="singer.length">
                        <el-col :span="3" v-for="(item, index) in singer" :key="index">
                            <div class="com-singer" @click="reload(item.id)">
                                <el-image class="singer-img" :src="item.picUrl || item.img1v1Url" fit="cover">
                                    <div slot="placeholder" class="image-slot"></div>
                                    <div slot="error" class="image-slot"></div>
                                </el-image>
                                <div class="singer-name">{{ item.name }}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <div v-else class="noMore">暂无相似</div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import PlayList from '../../components/detail/PlayList'
import Albums from '../../components/detail/Albums'
import Videos from '../../components/detail/Videos'
export default {
    components: {
        PlayList,
        Albums,
        Videos
    },
    data() {
        return {
            activeName: 'works',
            singerId: null,
            // 用户详情
            userDetail: {},
            // 歌手信息
            singerInfo: {},
            // 歌手单曲
            single: [],
            // 歌手专辑
            album: [],
            // 歌手MV
            video: [],
            // 歌手简介
            profile: {},
            // 相似歌手
            singer: []
        }
    },
    created() {
        let cookie = localStorage.getItem('cookie')
        this.singerId = this.$route.query.id
        // 加载用户详情
        this.loadUserDetail(cookie)
        // 加载歌手单曲
        this.loadSingerSingle()
    },
    methods: {
        // 加载用户详情
        async loadUserDetail(cookie) {
            try {
                const { data: res } = await this.$axios.get('/user/detail', {
                    params: {
                        uid: this.$route.query.accountId,
                        cookie
                    }
                })
                if (res.code !== 200) {
                    return this.$message.error('请求失败')
                }
                this.userDetail = res
            } catch (error) {
                return
            }
        },
        // 加载歌手单曲
        async loadSingerSingle() {
            const { data: res } = await this.$axios.get('/artists', {
                params: {
                    id: this.singerId
                }
            })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.singerInfo = res.artist
            this.single = res.hotSongs
            // 定义音乐ID
            let singleID = res.hotSongs.map(item => {
                return item.id
            })
            // 加载音乐URL
            this.loadMusicURL(singleID)
        },
        // 加载歌手专辑
        async loadSingerAlbum() {
            const { data: res } = await this.$axios.get('/artist/album', {
                params: {
                    id: this.singerId,
                    limit: 30
                }
            })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.album = res.hotAlbums
        },
        // 加载歌手MV
        async loadSingerMV() {
            const { data: res } = await this.$axios.get('/artist/mv', {
                params: {
                    id: this.singerId
                }
            })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.video = res.mvs
        },
        // 加载歌手简介
        async loadSingerProfile() {
            const { data: res } = await this.$axios.get('/artist/desc', {
                params: {
                    id: this.singerId
                }
            })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.profile = res
        },
        // 加载相似歌手
        async loadSingerSimilar() {
            const { data: res } = await this.$axios.get('/simi/artist', {
                params: {
                    id: this.singerId
                }
            })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.singer = res.artists
        },
        // 关注
        follow() {
            // 没有登录
            let cookie = localStorage.getItem('cookie')
            // 取不到就停止
            if (!cookie) {
                return this.$notify({
                    title: '消息',
                    message: '请先登录',
                    type: 'warning',
                    position: 'top-left'
                })
            }
        },
        handleClick(tab) {
            switch (tab.name) {
                // 单曲
                case 'works':
                    this.loadSingerSingle()
                    break
                // 专辑
                case 'album':
                    this.loadSingerAlbum()
                    break
                // MV
                case 'MV':
                    this.loadSingerMV()
                    break
                // 歌手简介
                case 'profile':
                    // 加载歌手MV
                    this.loadSingerProfile()
                    break
                // 相似歌手
                case 'similar':
                    this.loadSingerSimilar()
                    break
            }
        },
        // 加载音乐URL
        async loadMusicURL(singleID) {
            const { data: res } = await this.$axios.get(`/song/url?id=${singleID.join(',')}`)
            if (res.code !== 200) {
                return this.$message.error('音乐URL请求失败')
            }
            // 储存每首音乐的RUL
            let musicURL = res.data.map(item => {
                return { url: item.url, id: item.id }
            })
            // 将每一个音乐URL放入对象属性中
            for (const i in musicURL) {
                for (const j in this.single) {
                    // 如果歌单与歌单URL的ID一致，就把URL加入到对应的歌单中
                    if (this.single[j].id === musicURL[i].id) {
                        this.$set(this.single[j], 'url', musicURL[i].url)
                    }
                }
            }
        },
        // 全部播放
        allPlay() {
            // 重新定义播放器对象结构
            let allSong = this.single.map(item => {
                return {
                    name: item.name,
                    artist: item.ar[0].name,
                    url: item.url,
                    cover: item.al.picUrl
                }
            })
            // 传递当前歌单所有歌曲
            this.$root.$emit('updata:getAllSong', allSong)
        },
        // 重新跳转详情
        reload(id) {
            // 防止出现路由冗余
            if (this.singerId === id) return
            this.singerId = id
            this.$router.push({ path: '/singerdetail', query: { id } })
            let cookie = localStorage.getItem('cookie')
            // 加载用户详情
            this.loadUserDetail(cookie)
            // 加载歌手单曲
            this.loadSingerSingle()
            this.activeName = 'works'
        }
    }
}
</script>

<style lang="less">
.detail {
    width: 100%;
    .detail-top {
        position: relative;
        z-index: 9;
        padding: 100px 0 50px 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        color: white;
        background: url('../../assets/image/top-bg.5c3d6989.jpg') no-repeat 50%;
        background-size: cover;
        // 暗色背景
        .top-background {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            z-index: -1;
            background: rgba(0, 0, 0, 0.6);
        }
        .top-avatar {
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            > div {
                margin: 20px 0;
                font-size: 20px;
                font-weight: 700;
                .iconfont {
                    color: #e49f39;
                    font-size: 20px;
                    margin-right: 5px;
                }

                .el-icon-male {
                    color: #409eff;
                    font-weight: bolder;
                }
                .el-icon-female {
                    color: #f56c6c;
                    font-weight: bolder;
                }
            }
            .el-avatar {
                border: 3px solid white;
                &:hover {
                    box-shadow: 0 0 15px white;
                    transition: all 0.5s ease 0s;
                }
            }
        }
        .top-profile {
            width: 750px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-indent: 2em;
            color: #c5c2c5;
            line-height: 1.7;
            font-size: 14px;
            text-align: center;
            margin-bottom: 20px;
        }
        .top-info {
            display: flex;
            color: #a29aa1;
            line-height: 1.7;
            font-size: 14px;
            margin-bottom: 50px;
            > span {
                margin: 0 50px;
                text-align: center;
            }
            .info-num {
                font-size: 24px;
                color: white;
            }
        }
        .top-modification {
            width: 100%;
            position: absolute;
            bottom: 0;
        }
    }
    .detail-bottom {
        width: 1200px;
        margin: 20px auto;
        // 标签页
        .el-tabs__header {
            left: 300px;
            margin-bottom: 40px;
            .el-tabs__nav-scroll {
                width: 50%;
            }
        }
        // 相似歌手
        .bottom-similar {
            cursor: pointer;
            text-align: center;
            .singer-img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: 1px solid #ccc;
                .image-slot {
                    width: inherit;
                    height: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: url('../../assets/image/rainbow.png') no-repeat;
                    background-size: cover;
                }
            }
            .singer-name {
                font-size: 14px;
                font-weight: bold;
                margin: 10px 0 30px 0;
            }
        }
        // 暂无更多
        .noMore {
            color: #909399;
            font-size: 14px;
            text-align: center;
            margin: 50px 0;
        }
        // 单曲全部播放
        .single-allPlay {
            float: right;
            margin-bottom: 20px;
        }
        // 歌手简介
        .bottom-profile {
            line-height: 2;
            font-size: 14px;
            h2 {
                display: inline-block;
                padding-bottom: 5px;
                border-bottom: 3px solid #f56c6c;
            }
            h3 {
                padding-bottom: 5px;
                border-bottom: 3px solid #409eff;
            }
            > :nth-child(2) {
                margin: 10px 0 20px 0;
            }
            pre {
                margin: 10px 0 20px 0;
                white-space: pre-wrap;
            }
        }
    }
}
</style>
