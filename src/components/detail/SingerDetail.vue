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
                    <i class="el-icon-female"></i>
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
                    <div class="info-num">{{ (userDetail.profile || {}).followeds | playCount }}</div>
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
                    <PlayList :single="single" />
                </el-tab-pane>
                <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
                <el-tab-pane label="MV" name="MV">MV</el-tab-pane>
                <el-tab-pane label="歌手简介" name="profile">歌手简介</el-tab-pane>
                <el-tab-pane label="相似歌手" name="similar">相似歌手</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import PlayList from '../../microComponents/PlayList';
export default {
    components: {
        PlayList
    },
    data() {
        return {
            activeName: 'works',
            // 用户详情
            userDetail: {},
            // 歌手信息
            singerInfo: {},
            // 歌手单曲
            single: []
        };
    },
    created() {
        let cookie = localStorage.getItem('cookie');
        // 加载用户详情
        this.loadUserDetail(cookie);

        // 加载歌手单曲
        this.loadSingerSingle();
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
                });
                if (res.code !== 200) {
                    return this.$message.error('请求失败');
                }
                this.userDetail = res;
            } catch (error) {
                return;
            }
        },
        // 加载歌手单曲
        async loadSingerSingle() {
            const { data: res } = await this.$axios.get('/artists', {
                params: {
                    id: this.$route.query.id
                }
            });
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.singerInfo = res.artist;
            this.single = res.hotSongs;
            // 定义音乐ID
            let singleID = res.hotSongs.map(item => {
                return item.id;
            });
            // 加载音乐URL
            this.loadMusicURL(singleID);
        },
        // 关注
        follow() {
            // 没有登录
            let cookie = localStorage.getItem('cookie');
            // 取不到就停止
            if (!cookie) {
                return this.$notify({
                    title: '消息',
                    message: '请先登录',
                    type: 'warning',
                    position: 'top-left'
                });
            }
        },
        handleClick(tab) {
            console.log(tab.name);
        },
        // 加载音乐URL
        async loadMusicURL(singleID) {
            const { data: res } = await this.$axios.get(`/song/url?id=${singleID.join(',')}`);
            if (res.code !== 200) {
                return this.$message.error('音乐URL请求失败');
            }
            // 储存每首音乐的RUL
            let musicURL = res.data.map(item => {
                return { url: item.url, id: item.id };
            });
            // 将每一个音乐URL放入对象属性中
            for (const i in musicURL) {
                for (const j in this.single) {
                    // 如果歌单与歌单URL的ID一致，就把URL加入到对应的歌单中
                    if (this.single[j].id === musicURL[i].id) {
                        this.$set(this.single[j], 'url', musicURL[i].url);
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
                };
            });
            // 传递当前歌单所有歌曲
            this.$root.$emit('updata:getAllSong', allSong);
        }
    }
};
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
                i {
                    color: #409eff;
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
        .el-tabs__header {
            left: 300px;
            .el-tabs__nav-scroll {
                width: 50%;
            }
        }
        // 单曲全部播放
        .single-allPlay {
            float: right;
            margin-bottom: 20px;
        }
    }
}
</style>
