<template>
    <div class="find" style="width: 1200px;margin: 0 auto;">
        <!-- 幻灯片 -->
        <el-row>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <!-- 推荐歌单 -->
        <div class="featured-title">推荐歌单</div>
        <el-row :gutter="60">
            <el-col :span="4" v-for="item in 12" :key="item">
                <div class="featured-songList">
                    <div class="songList-img">
                        <!-- 播放统计 -->
                        <div class="songList-count">
                            <i class="el-icon-caret-right"></i>
                            <span>7000</span>
                        </div>
                    </div>
                    <div class="songList-name">2020年BBMA公告牌音乐奖获奖及表演曲目</div>
                </div>
            </el-col>
        </el-row>

        <!-- 推荐新歌曲 -->
        <div class="featured-title">推荐新歌曲</div>
        <el-row :gutter="30">
            <el-col :span="12" v-for="item in 10" :key="item" style="margin-bottom: 20px;">
                <el-card shadow="always" body-style="padding: 15px 30px;">
                    <!-- 内容 -->
                    <div class="featured-newSong">
                        <div class="newSong-index">01</div>
                        <img class="newSong-img" src="https://p2.music.126.net/2ztAT9l4eOZeEUfcsqmBkA==/109951165393210183.jpg?param=150y150" />
                        <div class="newSong-info">
                            <div class="newSong-name">Lonely</div>
                            <div>Justin Bieber /</div>
                        </div>
                        <div class="newSong-name">《Lonely》</div>
                        <div class="newSong-time">02:29</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 推荐歌手 -->
        <div class="featured-title">推荐歌手</div>
        <el-row :gutter="60">
            <el-col :span="3" v-for="item in 24" :key="item">
                <div class="featured-Vocalists">
                    <img class="Vocalists-img" src="https://p2.music.126.net/1tSJODTpcbZvNTCdsn4RYA==/109951165034950656.jpg?param=200y200" />
                    <div class="Vocalists-name">薛之谦</div>
                    <div class="Vocalists-songsNum">单曲数276</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
.find {
    .featured-title {
        text-align: left;
        font-weight: bold;
        margin: 20px 0;
    }
    // 推荐歌单
    .featured-songList {
        width: 150px;
        cursor: pointer;
        .songList-img {
            width: 150px;
            height: 150px;
            border-radius: 5px;
            background: #ccc;
            margin-bottom: 15px;
            // 播放总数
            .songList-count {
                margin: 10px 10px 0 0;
                float: right;
                padding: 0 5px;
                text-align: center;
                color: white;
                border-radius: 3px;
                background: #000;
            }
            .songList-count span,
            .songList-count i {
                font-size: 12px;
                line-height: 20px;
            }
        }
        .songList-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    }
    // 推荐新歌
    .featured-newSong {
        display: flex;
        align-items: center;
        .newSong-index {
            margin-right: 25px;
            cursor: pointer;
            font-weight: bold;
        }
        .newSong-img {
            width: 50px;
            height: 50px;
            margin-right: 25px;
            border-radius: 3px;
        }
        .newSong-info {
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            div {
                font-size: 14px;
            }
        }
        .newSong-name {
            margin-right: 70px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .newSong-time {
            font-size: 14px;
            font-weight: bold;
        }
    }
    // 推荐歌手
    .featured-Vocalists {
        width: 100px;
        text-align: center;
        .Vocalists-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #ccc;
        }
        .Vocalists-name {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
        }
        .Vocalists-songsNum {
            color: #fb2800;
            font-size: 12px;
            margin-bottom: 25px;
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
