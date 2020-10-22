<template>
    <div class="home-login">
        <!-- 登录界面 -->
        <el-collapse-transition>
            <el-card class="box-card" v-show="openLogin">
                <i class="el-icon-close" @click="$emit('update:openLogin', false), close()"></i>
                <el-tabs v-model="activeName" stretch @tab-click="tabRemove">
                    <!-- 手机号登录 -->
                    <el-tab-pane label="手机号登录" name="phoneForm">
                        <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm">
                            <!-- 输入手机号 -->
                            <el-form-item prop="phone">
                                <el-input placeholder="请输入手机号" v-model.trim="phoneForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                            </el-form-item>
                            <!-- 输入手机账号密码 -->
                            <el-form-item prop="password">
                                <el-input
                                    placeholder="请输入账号密码"
                                    v-model.trim="phoneForm.password"
                                    show-password
                                    prefix-icon="el-icon-lock"
                                    @keyup.enter.native="submitForm('phoneForm')"
                                ></el-input>
                            </el-form-item>
                            <!-- 登录按钮 -->
                            <el-form-item>
                                <el-button type="primary" size="medium" @click="submitForm('phoneForm')" :loading="inLogin">
                                    {{ inLogin ? '正在登录' : '登 录' }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <!-- 邮箱登录 -->
                    <el-tab-pane label="邮箱登录" name="emailForm">
                        <el-form :model="emailForm" :rules="emailRules" ref="emailForm">
                            <!-- 输入邮箱 -->
                            <el-form-item prop="emailAccount">
                                <el-input placeholder="请输入网易邮箱账号" v-model.trim="emailForm.emailAccount" prefix-icon="el-icon-message"></el-input>
                            </el-form-item>
                            <!-- 输入密码 -->
                            <el-form-item prop="password">
                                <el-input placeholder="请输入账号密码" v-model.trim="emailForm.password" show-password prefix-icon="el-icon-lock"></el-input>
                            </el-form-item>
                            <!-- 登录按钮 -->
                            <el-form-item>
                                <el-button type="primary" size="medium" @click="submitForm('emailForm')">登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <!-- 手机号注册 -->
                    <el-tab-pane label="快速注册" name="registerForm">
                        <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
                            <!-- 输入用户名 -->
                            <el-form-item prop="nickName">
                                <el-input placeholder="注册用户名" v-model.trim="registerForm.nickName" prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                            <!-- 输入用户名密码 -->
                            <el-form-item prop="password">
                                <el-input placeholder="输入用户名密码" v-model.trim="registerForm.password" prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                            <!-- 输入手机号 -->
                            <el-form-item prop="phoneAccount">
                                <el-input placeholder="绑定手机号" v-model.trim="registerForm.phoneAccount" prefix-icon="el-icon-mobile-phone"></el-input>
                            </el-form-item>
                            <!-- 输入验证码 -->
                            <el-form-item prop="captcha">
                                <el-input placeholder="输入验证码" v-model.trim="registerForm.captcha">
                                    <el-button slot="append" @click="registerGetCaptcha" v-if="registerWait">{{ registerWait }}</el-button>
                                    <el-button slot="append" v-if="!registerWait">{{ `已发送 ${registerWaitTime}s` }}</el-button>
                                </el-input>
                            </el-form-item>
                            <!-- 注册按钮 -->
                            <el-form-item>
                                <el-button type="primary" size="medium" @click="submitForm('registerForm')">注 册</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-collapse-transition>
        <!-- 登录屏障 -->
        <transition name="el-fade-in-linear">
            <div class="login-barrier" v-show="openLogin"></div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inLogin: false,
            activeName: 'phoneForm',
            loginWait: '获取验证码',
            loginWaitTime: 59,
            registerWait: '获取验证码',
            registerWaitTime: 59,
            // 手机登录
            phoneForm: {
                phone: '',
                password: ''
            },
            phoneRules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ]
            },
            // 邮箱登录
            emailForm: {
                emailAccount: '',
                password: ''
            },
            emailRules: {
                emailAccount: [
                    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
                    { pattern: /^[A-Za-z]\w{5,17}@(vip\.(126|163|188)\.com|163\.com|126\.com|yeach\.net)/, message: '请输入正确的网易邮箱账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ]
            },
            // 注册
            registerForm: {
                nickName: '',
                password: '',
                phoneAccount: '',
                captcha: ''
            },
            registerRules: {
                nickName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '只含有汉字、数字、字母、下划线不能以下划线开头和结尾', trigger: 'blur' },
                    { min: 3, max: 16, message: '用户名长度应为3～16个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户名密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ],
                phoneAccount: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { pattern: /^\d{4}$/, message: '请输入4位数的验证码', trigger: 'blur' }
                ]
            }
        };
    },
    // 接收父组件的数据
    props: {
        openLogin: {
            type: Boolean
        }
    },
    methods: {
        // 登录获取验证码
        loginGetCaptcha() {
            // 提前进行部分校验
            this.$refs.phoneForm.validateField('phoneAccount', error => {
                if (!error) {
                    this.loginWait = '';
                    setInterval(() => {
                        if (this.loginWaitTime === 1) {
                            this.loginWaitTime = 59;
                            return (this.loginWait = '获取验证码');
                        }
                        this.loginWaitTime--;
                    }, 1000);
                }
            });
        },
        // 注册获取验证码
        registerGetCaptcha() {
            // 提前进行部分校验
            this.$refs.registerForm.validateField('phoneAccount', error => {
                if (!error) {
                    this.registerWait = '';
                    setInterval(() => {
                        if (this.registerWaitTime === 1) {
                            this.registerWaitTime = 59;
                            return (this.registerWait = '获取验证码');
                        }
                        this.registerWaitTime--;
                    }, 1000);
                }
            });
        },
        // 提交时的校验
        submitForm(formName) {
            switch (formName) {
                // 如果是手机登录
                case 'phoneForm':
                    this.$refs.phoneForm.validate(async valid => {
                        if (valid) {
                            // 手机登录
                            this.inLogin = true;
                            const { data: res } = await this.$axios.post('/login/cellphone', this.phoneForm);
                            // 登录失败
                            if (res.code !== 200) {
                                this.inLogin = false;
                                return this.$notify.error({
                                    title: '错误',
                                    message: res.msg
                                });
                            }
                            // 登录成功
                            this.inLogin = false;
                            // 永久存储cookie
                            localStorage.setItem('cookie', res.cookie);
                            // 关闭登录框
                            this.$emit('update:openLogin', false);
                            // 触发父组件自定义事件
                            this.$emit('getloginStatus');
                        } else {
                            return false;
                        }
                    });
                    break;
                // 如果是邮箱登录
                case 'emailForm':
                    this.$refs.emailForm.validate(valid => {
                        if (valid) {
                            alert('777');
                        } else {
                            this.$message.warning('xxxxxxxxxxxxxxx');
                            return false;
                        }
                    });
                    break;
                // 如果是账号注册
                case 'registerForm':
                    this.$refs.registerForm.validate(valid => {
                        if (valid) {
                            alert('888');
                        } else {
                            this.$message.warning('xxxxxxxxxxxxxxx');
                            return false;
                        }
                    });
                    break;
            }
        },
        // 切换标签页时重置当前表单
        tabRemove(tab) {
            this.$refs[tab.name].resetFields();
        },
        // 关闭登录框时重置所有表单
        close() {
            this.$refs.phoneForm.resetFields();
            this.$refs.emailForm.resetFields();
            this.$refs.registerForm.resetFields();
            this.activeName = 'phoneForm';
        }
    }
};
</script>

<style lang="less" scoped>
.home-login {
    // 登录窗口
    .box-card {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        z-index: 99;
        border-radius: 10px;
        i {
            float: right;
            cursor: pointer;
        }
        // 登录标签页
        .el-tabs {
            margin: 0 auto;
            width: 75%;
            margin-top: 15px;

            // 登录内容
            .el-tab-pane {
                margin-top: 15px;
            }

            // 按钮统一样式
            .el-button {
                width: 100%;
            }
        }
    }
    // 登录屏障
    .login-barrier {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 55;
        backdrop-filter: blur(15px);
    }
}
</style>
