<template>
    <div class="personal">
        <div class="personal-background"></div>
        <!-- 上部分 -->
        <div class="personal-top"></div>
        <div class="personal-bottom">
            <el-row :gutter="30" class="personal-container">
                <el-col :span="16">
                    <el-card class="personal-left">
                        <!-- 创建的歌单 -->
                        <div class="created-song">
                            <div class="title">我创建的歌单</div>
                            <SongSheets :createdSongSheet="createdSongSheet" />
                        </div>
                        <el-divider></el-divider>
                        <!-- 收藏的歌单 -->
                        <div class="collect-song">
                            <div class="title">我收藏的歌单</div>
                            <SongSheets :collectSongSheet="collectSongSheet" />
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="personal-right">
                        <!-- 上部分 -->
                        <div class="right-top"></div>
                        <!-- 下部分 -->
                        <div class="right-bottom">
                            <div class="bottom-header">
                                <el-avatar shape="square" :size="60" :src="squareUrl"></el-avatar>
                                <span class="title">梦想与期望</span>

                                <el-button type="primary" size="mini" round>签到</el-button>
                            </div>
                            <ul class="bottom-info">
                                <li>等级：7级</li>
                                <li>年龄： 00后 - 魔羯座</li>
                                <li>地区：-</li>
                            </ul>
                            <div class="bottom-trend">
                                <span>
                                    <div>动态</div>
                                    <div>0</div>
                                </span>
                                <span>
                                    <div>关注</div>
                                    <div>3</div>
                                </span>
                                <span>
                                    <div>粉丝</div>
                                    <div>4</div>
                                </span>
                            </div>
                            <div class="bottom-button">
                                <el-button type="danger" size="medium">个人设置</el-button>
                                <el-button type="danger" size="medium">我的等级</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.personal {
    width: 100%;
    // 背景
    .personal-background {
        margin-top: 70px;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -10;
        background: url('../assets/image/Searchbackgroun.jpg') no-repeat;
        background-size: cover;
    }
    // 上部分
    .personal-top {
        background: wheat;
        height: 300px;
    }
    // 下部分
    .personal-bottom {
        background: white;
        display: flex;
        justify-content: center;
        // 内容
        .personal-container {
            width: 1200px;
            // 左边
            .personal-left {
                width: 100%;
                .title {
                    border-left: 3px solid #409eff;
                    padding-left: 15px;
                    font-size: 15px;
                    font-weight: bold;
                }
            }
            // 右边
            .personal-right {
                margin-top: -50px;
                background: url('http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg') no-repeat;
                background-size: 100% 100%;

                .right-top {
                    height: 120px;
                    width: 100%;
                }
                .right-bottom {
                    background: white;
                    margin: 0 -20px -20px -20px;
                    .bottom-header {
                        padding: 0 20px;
                        font-size: 15px;
                        font-weight: bold;
                        display: flex;
                        align-items: flex-end;
                        position: relative;
                        top: -20px;
                        .el-button {
                            position: absolute;
                            right: 20px;
                        }
                        .el-avatar {
                            margin-right: 15px;
                        }
                    }
                    .bottom-info {
                        padding: 0 20px 20px 20px;
                        li {
                            list-style-type: none;
                            font-size: 14px;
                            line-height: 1.7;
                            &::before {
                                content: '💎';
                                color: #409eff;
                                margin-right: 5px;
                                font-size: 14px;
                            }
                        }
                    }
                    .bottom-trend {
                        display: flex;
                        justify-content: space-evenly;
                        text-align: center;
                        font-size: 14px;
                        color: #666;
                    }
                    .bottom-button {
                        padding: 20px;
                        text-align: center;
                        .el-button {
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
