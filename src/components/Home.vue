<template>
    <div class="home" :style="{ overflow: openLogin ? 'hidden' : '' }">
        <!-- 回到顶部 -->
        <el-backtop :right="100" :bottom="100"></el-backtop>
        <el-container>
            <el-header height="70px">
                <el-row class="home-top" style="width: 1200px;" type="flex" align="middle">
                    <el-col :span="3">
                        <div class="home-logo">
                            <img src="../assets/logo.png" />
                            <span>曲奇云音乐</span>
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <nav class="home-nav">
                            <!-- router-link默认被解析为a标签 -->
                            <router-link to="/find" exact-active-class="click">发现音乐</router-link>
                            <router-link to="/rank" exact-active-class="click">排行榜</router-link>
                            <router-link to="/songlist" exact-active-class="click">歌单</router-link>
                            <router-link to="/vocalists" exact-active-class="click">歌手</router-link>
                            <router-link to="/video" exact-active-class="click">视频</router-link>
                            <router-link to="/mv" exact-active-class="click">MV</router-link>
                        </nav>
                    </el-col>
                    <el-col :span="loginStatus ? 4 : 2">
                        <div class="home-login">
                            <a href="#"><i class="el-icon-search"></i></a>
                            <el-divider direction="vertical"></el-divider>
                            <el-button type="primary" size="small" @click="openLogin = true" v-if="!loginStatus">登录</el-button>
                            <!-- 已经登录显示个人信息 -->
                            <el-dropdown trigger="click" @command="handleCommand" v-else>
                                <span class="el-dropdown-link">
                                    <el-avatar :size="35" :src="userInfo.avatarUrl"></el-avatar>
                                    {{ userInfo.nickname }}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-user" command="Personal Home">个人主页</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-medal" command="My Rank">我的等级</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-setting" command="personal setting">个人设置</el-dropdown-item>
                                    <el-dropdown-item divided icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <keep-alive>
                    <!-- 展示内容 -->
                    <router-view></router-view>
                </keep-alive>
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
                        <span><a href="https://123mtr.top" target="_blank">123木头人</a></span>
                    </div>
                </div>
            </el-footer>
        </el-container>
        <Login :openLogin.sync="openLogin" @login="login" @register="register" />
    </div>
</template>

<script>
import Login from '../views/Login';

export default {
    name: 'home', // 主组件名
    components: {
        Login
    },
    data() {
        return {
            loginStatus: false,
            openLogin: false,
            ownCookie: '',
            userInfo: {}
        };
    },
    created() {
        // 页面刷新重新加载用户信息
        this.login();
    },
    methods: {
        // 登录（Login组件触发该函数）
        async login() {
            let cookie = localStorage.getItem('cookie');
            // 取不到就停止
            if (!cookie) return;
            // 获取登录状态，返回用户信息
            const { data: res } = await this.$axios.post('/login/status', { cookie });
            // 获取失败
            if (res.code !== 200) {
                return this.$message.error(res.msg);
            }
            // 获取成功后储存用户信息
            this.userInfo = res.profile;
            this.loginStatus = true;
        },

        // 注册（Login组件触发该函数）
        register() {
            console.log('父组件已接收注册');
        },

        handleCommand(command) {
            switch (command) {
                // 如果选择是退出登录
                case 'logout':
                    localStorage.clear();
                    this.userInfo = {};
                    this.loginStatus = false;
                    break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    // 头部
    .el-header {
        background: white;
        box-shadow: 0 1px 5px #ddd;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 50;
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
                width: 100%;
                display: flex;
                align-items: center;
                img {
                    height: 30px;
                }
                span {
                    color: #505050;
                    font-weight: bold;
                    margin-left: 5px;
                }
            }
            // 导航
            .home-nav {
                a {
                    color: #333;
                    text-decoration: none;
                    padding: 7px 20px;
                    border-radius: 3px;
                    font-size: 14px;
                }
                .click {
                    background: #333;
                    color: white;
                    transition: all 0.3s ease 0s;
                }
            }
            // 信息栏
            .home-login {
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #909399;
                a {
                    color: #999;
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
            }
        }
    }
    // 内容
    .el-main {
        margin-top: 80px;
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
