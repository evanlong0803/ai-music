<template>
    <div class="detail">
        <el-row :gutter="20">
            <!-- 左侧 -->
            <el-col :span="17">
                <!-- 左侧卡片 -->
                <el-card class="left-card" shadow="hover">
                    <!-- 左侧上部分 -->
                    <el-row class="card-top">
                        <el-col :span="7">
                            <el-image class="top-left-img" src="http://p1.music.126.net/_PXjlu7VMgWRiLgEMAr5Wg==/109951165007536195.jpg?param=200y200" fit="cover"></el-image>
                        </el-col>
                        <el-col :span="17">
                            <div class="top-right">
                                <h2 class="top-right-title">闻香寻味｜时光沉淀后方感深邃</h2>
                                <div class="top-right-userInfo">
                                    <el-image class="userInfo-avatar" src="http://p1.music.126.net/4Th0M0Qp6ttM4sOfQbNyyg==/109951165262707714.jpg?param=100y100" fit="cover"></el-image>
                                    <div class="userInfo-name">52赫兹共振</div>
                                    <div class="userInfo-time">2020-05-09创建</div>
                                </div>
                                <div class="top-right-tag">
                                    标签：
                                    <el-tag>欧美</el-tag>
                                    <el-tag type="success">民谣</el-tag>
                                    <el-tag type="info">爵士</el-tag>
                                </div>
                                <div class="top-right-description">再好闻的香水，都没有时间沉淀出来的气息。</div>
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
                        <div class="bottom-song">
                            <el-table :data="tableData" height="600" style="width: 100%" size="medium" stripe :header-cell-style="{ background: '#FAFAFA', color: '#606266' }">
                                <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="70"> </el-table-column>
                                <el-table-column prop="date" label="歌曲" width="220" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="name" label="歌手" width="150" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="address" label="专辑" width="180" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="date" label="时长" align="center"> </el-table-column>
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
                    <el-row class="card-users" :gutter="10">
                        <el-col :span="4" v-for="(item, index) in 30" :key="index">
                            <el-image class="users-avatar" src="http://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg?param=150y150" fit="cover"></el-image>
                        </el-col>
                    </el-row>
                    <div></div>
                </el-card>
                <!-- 相关推荐 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">相关推荐</div>
                    <div class="card-featured" v-for="(item, index) in 5" :key="index">
                        <div class="featured-left">
                            <el-image class="featured-avatar" src="http://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg?param=150y150" fit="cover"></el-image>
                        </div>
                        <div class="featured-right">
                            <div class="featured-title">小语种民歌丨淳朴又感情的曲调</div>
                            <div class="featured-name">By. 音乐大师师</div>
                        </div>
                    </div>
                </el-card>
                <!-- 精彩评论 -->
                <el-card class="right-card" shadow="hover">
                    <div class="card-title">精彩评论</div>
                    <div class="card-comments" v-for="(item, index) in 10" :key="index">
                        <!-- 左侧 -->
                        <div class="comments-left">
                            <el-avatar :size="50" src="http://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg?param=150y150"></el-avatar>
                        </div>
                        <!-- 右侧 -->
                        <div class="comments-right">
                            <div class="right-name">
                                曲清酌
                                <span>4月前</span>
                            </div>
                            <div class="right-content">
                                哪有什么侧颜 阳光 白衬衫 对于普通家庭 普通学生 普通中学的我们青春的烦恼更多的是拿着不及格的试卷的不知所措 体育课800米后的汗液 班主任无意间的羞辱
                                坐在教室的角落里望着嬉闹的他们
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <!-- 查看全部描述对话框 -->
            <el-dialog title="闻香寻味｜时光沉淀后方感深邃" :visible.sync="descriptionDialog" width="25%">
                <div class="dialog-content" v-for="(item, index) in 5" :key="index">再好闻的香水，都没有时间沉淀出来的气息。</div>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'detail',
    data() {
        return {
            descriptionDialog: false,
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            // 自定义索引
            indexMethod(index) {
                return index + 1 < 10 ? '0' + (index + 1) : index + 1;
            }
        };
    }
};
</script>

<style lang="less" scoped>
.detail {
    width: 1200px;
    margin: 0 auto;
    // 左边
    .left-card {
        height: 100%;
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
                        line-height: 25px;
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
            }
        }
    }
    // 右边
    .right-card {
        height: 100%;
        margin-bottom: 20px;
        .card-title {
            font-size: 14px;
            font-weight: bold;
            padding-left: 10px;
            border-left: 3px solid #409eff;
            margin-bottom: 10px;
        }

        // 喜欢这个歌单的人
        .card-users {
            .users-avatar {
                border-radius: 5px;
                margin: 5px 0;
                cursor: pointer;
            }
        }

        // 相关推荐
        .card-featured {
            height: 60px;
            display: flex;
            align-items: center;
            margin-top: 15px;
            // 左边
            .featured-left {
                height: 100%;
                margin-right: 10px;
                .featured-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
            // 右边
            .featured-right {
                cursor: pointer;

                .featured-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    &:hover {
                        color: #f56c6c;
                    }
                }
                .featured-name {
                    font-size: 12px;
                    color: #999;
                }
            }
        }

        // 精彩评论
        .card-comments {
            height: 100%;
            display: flex;
            margin-top: 20px;
            .comments-left {
                margin-right: 12px;
            }
            .comments-right {
                .right-name {
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 10px;
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
</style>
