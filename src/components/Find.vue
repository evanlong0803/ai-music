<template>
    <div class="find" style="width: 1200px;margin: 0 auto;">
        <!-- 幻灯片 -->
        <el-row>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(banner, index) in banners" :key="index">
                    <el-image :src="banner.imageUrl" fit="cover"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <!-- 推荐歌单 -->
        <div class="featured-title">推荐歌单</div>
        <el-row type="flex" :gutter="60" style="flex-flow: row wrap;">
            <el-col :span="4" v-for="(item, index) in FeaturedSongList" :key="index">
                <div class="featured-songList">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.picUrl" fit="cover"></el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>

        <!-- 推荐新歌曲 -->
        <div class="featured-title">推荐新歌曲</div>
        <el-row :gutter="30">
            <el-col :span="12" v-for="(item, index) in newSong" :key="index" style="margin-bottom: 20px;">
                <el-card shadow="always" body-style="padding: 15px 30px;">
                    <!-- 内容 -->
                    <div class="featured-newSong">
                        <!-- 播放按钮 -->
                        <!-- <el-image class="newSong-play" :src="require('../assets/play.png')" fit="contain"></el-image> -->
                        <div class="newSong-index">{{ (index + 1) | addZeros }}</div>
                        <el-image class="newSong-img" :src="item.picUrl" fit="cover"></el-image>
                        <div class="newSong-info">
                            <div class="newSong-name">{{ item.name }}</div>
                            <div class="newSong-singer">
                                <span v-for="(item2, index2) in item.song.artists" :key="index2">{{ item2.name }}</span>
                            </div>
                        </div>
                        <div class="newSong-record">{{ `《${item.song.album.name}》` }}</div>
                        <div class="newSong-time">02:29</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 推荐歌手 -->
        <div class="featured-title">热门歌手</div>
        <el-row :gutter="60">
            <el-col :span="3" v-for="(item, index) in HotSinger" :key="index">
                <div class="featured-vocalists">
                    <el-image class="vocalists-img" :src="item.img1v1Url" fit="cover"></el-image>
                    <div class="vocalists-name">{{ item.name }}</div>
                    <div class="vocalists-songsNum">{{ `单曲数${item.musicSize}` }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 轮播图
            banners: [],
            // 推荐歌单数据
            FeaturedSongList: [],
            // 推荐新歌数据
            newSong: [],
            // 热门歌手数据
            HotSinger: []
        };
    },
    created() {
        this.loadBanner();
        this.loadFeaturedSongList();
        this.loadHotSinger();
        this.loadFeaturedNewSong();
    },
    methods: {
        // 请求banner轮播图
        async loadBanner() {
            const { data: res } = await this.$axios.get('banner');
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.banners = res.banners;
        },
        // 请求推荐歌单
        async loadFeaturedSongList() {
            const { data: res } = await this.$axios.get('/personalized', {
                params: {
                    limit: 18
                }
            });
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.FeaturedSongList = res.result;
        },
        // 推荐新歌
        async loadFeaturedNewSong() {
            const { data: res } = await this.$axios.get('/personalized/newsong');
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.newSong = res.result;
        },
        // 请求热门歌手
        async loadHotSinger() {
            const { data: res } = await this.$axios.get('/top/artists', {
                params: {
                    offset: 0,
                    limit: 24
                }
            });
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.HotSinger = res.artists;
        }
    }
};
</script>

<style lang="less" scoped>
.find {
    // 幻灯片
    .el-carousel__item {
        border-radius: 5px;
    }
    // 推荐标题
    .featured-title {
        text-align: left;
        font-weight: bold;
        margin: 20px 0;
    }
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
    // 推荐新歌
    .featured-newSong {
        display: flex;
        align-items: center;
        // 播放按钮
        .newSong-play {
            width: 100px;
            cursor: pointer;
        }
        .newSong-index {
            width: 10%;
            font-weight: bold;
            text-align: left;
        }
        .newSong-img {
            width: 10%;
            margin-right: 30px;
            border-radius: 3px;
        }
        .newSong-info {
            width: 30%;
            margin-right: 20px;
            .newSong-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: bold;
            }
            .newSong-singer {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                span {
                    margin-right: 5px;
                }
            }
        }

        .newSong-record {
            width: 20%;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .newSong-time {
            width: 20%;
            font-size: 14px;
            font-weight: bold;
            text-align: right;
        }
    }
    // 推荐歌手
    .featured-vocalists {
        cursor: pointer;
        width: 100px;
        text-align: center;
        .vocalists-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #ccc;
        }
        .vocalists-name {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
        }
        .vocalists-songsNum {
            color: #fb2800;
            font-size: 12px;
            margin-bottom: 25px;
        }
    }
}
</style>
