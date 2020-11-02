<template>
    <div class="home" :style="{ overflow: openLogin || showSearchBox ? 'hidden' : '' }">
        <!-- 回到顶部 -->
        <el-backtop :right="100" :bottom="100"></el-backtop>
        <el-container>
            <el-header height="70px">
                <el-row class="home-top" style="width: 1200px;" type="flex" align="middle">
                    <el-col :span="3">
                        <div class="home-logo" @click="goHome">
                            <img src="../assets/logo.png" />
                        </div>
                    </el-col>
                    <el-col>
                        <nav class="home-nav">
                            <!-- router-link默认被解析为a标签 -->
                            <router-link to="/" exact-active-class="click">发现音乐</router-link>
                            <router-link to="/rank" exact-active-class="click">排行榜</router-link>
                            <router-link to="/songlist" exact-active-class="click">歌单</router-link>
                            <router-link to="/vocalists" exact-active-class="click">歌手</router-link>
                            <router-link to="/video" exact-active-class="click">视频</router-link>
                            <router-link to="/mv" exact-active-class="click">MV</router-link>
                        </nav>
                    </el-col>
                    <el-col>
                        <div class="home-login">
                            <!-- 搜索图标 -->
                            <i class="el-icon-search" @click="showSearchBox = !showSearchBox"></i>
                            <!-- 分割线 -->
                            <el-divider direction="vertical"></el-divider>
                            <!-- 登录按钮 -->
                            <el-button type="primary" size="small" @click="openLogin = true" v-if="!loginStatus">登录</el-button>
                            <!-- 已经登录显示个人信息 -->
                            <el-dropdown trigger="click" v-else>
                                <span class="el-dropdown-link">
                                    <el-avatar :size="35" :src="userInfo.avatarUrl"></el-avatar>
                                    {{ userInfo.nickname }}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-user">个人主页</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                                    <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <!-- 展示内容 -->
                <router-view></router-view>
            </el-main>
            <el-footer height="240px">
                <div class="home-bottom">
                    <div class="bottom-title">曲奇云音乐</div>
                    <p>个人项目</p>
                </div>
                <div class="bottom-copyright">
                    <div class="copyright">
                        <span>Copyright © 2020</span>
                        <span> 曲奇云音乐 </span>
                        <span><a href="#">演示站</a></span>
                        <span>Designed by </span>
                        <span><a href="https://gitee.com/handsomewood/netease-music" target="_blank">123木头人</a></span>
                    </div>
                </div>
            </el-footer>
        </el-container>
        <!-- 登录 -->
        <Login :openLogin.sync="openLogin" @getUserInfo="getUserInfo" />
        <!-- 音乐播放器 -->
        <Player />
        <!-- 搜索框 -->
        <Search-Box :showSearchBox.sync="showSearchBox" />
    </div>
</template>

<script>
import Login from '../views/Login'
import Player from '../views/player'
import SearchBox from '../views/SearchBox'

export default {
    name: 'home', // 主组件名
    components: {
        Login,
        Player,
        SearchBox
    },
    data() {
        return {
            loginStatus: false,
            openLogin: false,
            userInfo: {},
            showSearchBox: false
        }
    },
    created() {
        // 页面刷新重新加载用户信息
        this.getUserInfo()
    },
    methods: {
        // 登录成功后，获取用户信息（Login组件登录后触发该函数）
        async getUserInfo() {
            let cookie = localStorage.getItem('cookie')
            // 取不到就停止
            if (!cookie) return
            // 获取登录状态，返回用户信息
            const { data: res } = await this.$axios.post('/login/status', { cookie })
            // 获取失败
            if (res.code !== 200) {
                return this.$message.error(res.msg)
            }
            // 获取成功后储存用户信息
            this.userInfo = res.profile
            this.loginStatus = true
        },
        // 退出登录
        async logout() {
            const { data: res } = await this.$axios.get('/logout')
            if (res.code !== 200) {
                return this.$message.error('退出失败')
            }
            localStorage.removeItem('cookie')
            this.userInfo = {}
            this.loginStatus = false
        },
        // 点击Logo跳转首页
        goHome() {
            if (this.$route.path === '/') return
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    // 头部
    .el-header {
        box-shadow: 0 1px 5px #ddd;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 99;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
        backdrop-filter: blur(15px);
        // 顶部栏
        .home-top {
            height: 100%;
            width: 100%;
            margin: 0 auto;
            color: #333;
            // logo
            .home-logo {
                display: flex;
                cursor: pointer;
                img {
                    height: 30px;
                }
            }
            // 导航
            .home-nav {
                margin-left: 40px;
                height: 100%;
                line-height: 70px;
                a {
                    color: #333;
                    text-decoration: none;
                    padding: 7px 20px;
                    border-radius: 3px;
                    font-size: 14px;
                }
                .click {
                    line-height: 70px;
                    box-sizing: border-box;
                    background: #333;
                    color: white;
                    transition: all 0.3s ease 0s;
                }
            }
            // 信息栏
            .home-login {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: #909399;
                // 分隔线
                .el-divider--vertical {
                    margin: 0 15px;
                }
                // 个人信息样式
                .el-dropdown-link {
                    cursor: pointer;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    .el-avatar {
                        margin-right: 10px;
                    }
                }
                // 搜索图标
                .el-icon-search {
                    cursor: pointer;
                }
            }
        }
    }
    // 内容
    .el-main {
        margin-top: 70px;
        padding: 0;
        overflow-x: hidden;
    }
    // 底部
    .el-footer {
        padding: 0;
        background: #161e27;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .home-bottom {
            width: 1200px;
            margin: 0 auto;
            .bottom-title {
                font-size: 14px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                color: white;
                padding-left: 10px;
                border-left: 3px solid #fa2800;
                margin-top: 35px;
            }
            p {
                font-size: 12px;
                margin: 15px 0;
                color: white;
            }
        }
        .bottom-copyright {
            color: white;
            border-top: 1px solid #232a31;
            .copyright {
                color: #6d7685;
                font-size: 12px;
                width: 1200px;
                margin: 0 auto;
                padding: 20px 0;
                a {
                    color: #6d7685;
                    text-decoration: none;
                    margin-right: 5px;
                    &:hover {
                        color: white;
                    }
                }
            }
        }
    }
}
</style>
