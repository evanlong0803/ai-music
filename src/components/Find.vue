<template>
    <div class="find">
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
        <el-row type="flex" :gutter="60" style="flex-flow: row wrap;" v-loading="!FeaturedSongList.length">
            <el-col :span="4" v-for="(item, index) in FeaturedSongList" :key="index">
                <div class="featured-songList" @click="goDetail(item.id)">
                    <!-- 播放统计 -->
                    <el-tag><i class="el-icon-caret-right"></i>{{ item.playCount | playCount }}</el-tag>
                    <el-image class="songList-img" :src="item.picUrl" fit="cover"></el-image>
                    <div class="songList-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>

        <!-- 推荐新歌曲 -->
        <div class="featured-title">推荐新歌曲</div>
        <el-row :gutter="30" v-loading="!newSong.length">
            <el-col :span="12" v-for="(item, index) in newSong" :key="index" style="margin-bottom: 20px;">
                <el-card shadow="always" body-style="padding: 15px 30px;" class="newSong-each">
                    <!-- 内容 -->
                    <div class="featured-newSong" @click="playNewSong(item)">
                        <!-- 播放按钮 -->
                        <div class="newSong-index">{{ (index + 1) | addZeros }}</div>
                        <el-image class="newSong-img" :src="item.picUrl" fit="cover"></el-image>
                        <div class="newSong-info">
                            <div class="newSong-name">{{ item.name }}</div>
                            <div class="newSong-singer">
                                <span v-for="(item2, index2) in item.song.artists" :key="index2">{{ item2.name }}</span>
                            </div>
                        </div>
                        <div class="newSong-record">{{ `《${item.song.album.name}》` }}</div>
                        <div class="newSong-time">{{ item.song.bMusic.playTime | playTime }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 推荐歌手 -->
        <div class="featured-title">热门歌手</div>
        <el-row :gutter="60" v-loading="!HotSinger.length">
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
            // 推荐歌单
            FeaturedSongList: [],
            // 推荐新歌
            newSong: [],
            // 热门歌手
            HotSinger: []
        }
    },
    created() {
        this.loadBanner()
        this.loadFeaturedSongList()
        this.loadHotSinger()
        this.loadFeaturedNewSong()
    },
    methods: {
        // 请求banner轮播图
        async loadBanner() {
            const { data: res } = await this.$axios.get('/banner')
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.banners = res.banners
        },
        // 请求推荐歌单
        async loadFeaturedSongList() {
            const { data: res } = await this.$axios.post('/personalized', { limit: 18 })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.FeaturedSongList = res.result
        },
        // 推荐新歌
        async loadFeaturedNewSong() {
            const { data: res } = await this.$axios.get('/personalized/newsong')
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.newSong = res.result
        },

        // 请求热门歌手
        async loadHotSinger() {
            const { data: res } = await this.$axios.post('/top/artists', { offset: 0, limit: 24 })
            if (res.code !== 200) {
                return this.$message.error('请求失败')
            }
            this.HotSinger = res.artists
        },
        // 播放新音乐
        async playNewSong(item) {
            // 请求新歌URL
            const { data: res } = await this.$axios.get(`/song/url?id=${item.id}`)
            if (res.code !== 200) {
                return this.$message.error('音乐URL请求失败')
            }
            let newSong = {
                id: item.id,
                name: item.name,
                artist: item.song.artists[0].name,
                cover: item.picUrl,
                url: res.data[0].url
            }
            // 传递当前单曲歌词和歌曲
            this.$root.$emit('getNewSong', newSong)
        },
        // 跳转详情页
        goDetail(id) {
            this.$router.push(`/detail?id=${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.find {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
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
        cursor: pointer;
        display: flex;
        align-items: center;
        // 播放按钮
        .newSong-play {
            width: 25px;
            position: absolute;
        }
        .newSong-index {
            width: 9%;
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
    // 热门歌手
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
    .newSong-each {
        &:active {
            opacity: 0.7;
        }
    }
}
</style>
