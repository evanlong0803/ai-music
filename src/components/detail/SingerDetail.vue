<template>
    <div class="detail">
        <!-- 上部分 -->
        <div class="detail-top">
            <div class="top-background"></div>
            <div class="top-avatar">
                <el-avatar :size="115" :src="circleUrl"></el-avatar>
                <div>华晨宇 <i class="el-icon-female"></i></div>
                <el-button round plain icon="el-icon-plus" size="medium">关注ta</el-button>
            </div>
            <div class="top-introduce">
                华晨宇，1990年2月7日生于湖北十堰 ，中国男歌手，毕业于武汉音乐学院。 2013年，参加湖南卫视《快乐男声》获年度总冠军出道
                。2014年1月，首登央视春晚舞台。9月6日-7日，在北京万事达中心连开两场“火星”演唱会 ，随后首张个...
            </div>
            <div class="top-info">
                <span>
                    <div class="info-num">218</div>
                    <div>单曲数</div>
                </span>
                <span>
                    <div class="info-num">35</div>
                    <div>专辑数</div>
                </span>
                <span>
                    <div class="info-num">52</div>
                    <div>MV</div>
                </span>
                <span>
                    <div class="info-num">6041705</div>
                    <div>粉丝</div>
                </span>
            </div>
            <img src="../../assets/image/arrow-lr.5aa8d800.png" />
        </div>
        <div class="detail-bottom">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="作品" name="作品">作品</el-tab-pane>
                <el-tab-pane label="专辑" name="专辑">专辑</el-tab-pane>
                <el-tab-pane label="MV" name="MV">MV</el-tab-pane>
                <el-tab-pane label="歌手简介" name="歌手简介">歌手简介</el-tab-pane>
                <el-tab-pane label="相似歌手" name="相似歌手">相似歌手</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '作品'
        };
    },
    methods: {
        handleClick(tab) {
            console.log(tab.name);
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
            > div {
                margin: 15px 0;
                font-size: 20px;
                font-weight: 700;
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
        .top-introduce {
            width: 750px;
            height: 50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-indent: 2em;
            color: #c5c2c5;
            line-height: 1.7;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .top-info {
            display: flex;
            color: #c5c2c5;
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
        img {
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
    }
}
</style>
