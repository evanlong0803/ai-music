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
        <el-row class="featured" type="flex" justify="space-between">
            <div class="featured-songList" v-for="item in 14" :key="item">
                <!-- 播放统计 -->
                <div class="songList-packaging">
                    <div class="songList-count">
                        <i class="el-icon-caret-right"></i>
                        <span>7000</span>
                    </div>
                </div>
                <div class="songList-name">2020年BBMA公告牌音乐奖获奖及表演曲目</div>
            </div>
        </el-row>

        <!-- 推荐新歌曲 -->
        <div class="featured-title">推荐新歌曲</div>
        <el-row class="featured" type="flex" justify="space-between">
            <div class="featured-songList" v-for="item in 14" :key="item">
                <div class="songList-packaging"></div>
                <div class="songList-name">2020年BBMA公告牌音乐奖获奖及表演曲目</div>
            </div>
        </el-row>
    </div>
</template>

<style lang="less">
.find {
    .featured-title {
        text-align: left;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .featured {
        width: 100%;
        flex-flow: row wrap;
        .featured-songList {
            width: 150px;
            margin-right: 1px;
            cursor: pointer;
            .songList-packaging {
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
