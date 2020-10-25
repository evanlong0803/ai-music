<template>
    <div class="home-login">
        <!-- 登录界面 -->
        <el-collapse-transition>
            <el-card class="box-card" v-show="openLogin">
                <i class="el-icon-close" @click="close"></i>
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
                            <el-form-item prop="email">
                                <el-input placeholder="请输入邮箱账号" v-model.trim="emailForm.email" prefix-icon="el-icon-message">
                                    <template slot="append">@163.com</template>
                                </el-input>
                            </el-form-item>
                            <!-- 输入密码 -->
                            <el-form-item prop="password">
                                <el-input
                                    placeholder="请输入账号密码"
                                    v-model.trim="emailForm.password"
                                    show-password
                                    prefix-icon="el-icon-lock"
                                    @keyup.enter.native="submitForm('emailForm')"
                                ></el-input>
                            </el-form-item>
                            <!-- 登录按钮 -->
                            <el-form-item>
                                <el-button type="primary" size="medium" @click="submitForm('emailForm')" :loading="inLogin">
                                    {{ inLogin ? '正在登录' : '登 录' }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <!-- 手机号注册 -->
                    <el-tab-pane label="手机号注册" name="registerForm">
                        <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
                            <!-- 输入用户名 -->
                            <el-form-item prop="nickname">
                                <el-input placeholder="注册用户名" v-model.trim="registerForm.nickname" prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                            <!-- 输入用户名密码 -->
                            <el-form-item prop="password">
                                <el-input placeholder="输入用户名密码" v-model.trim="registerForm.password" show-password prefix-icon="el-icon-lock"></el-input>
                            </el-form-item>
                            <!-- 输入手机号 -->
                            <el-form-item prop="phone">
                                <el-input placeholder="绑定手机号" v-model.trim="registerForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
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
                                <el-button type="primary" size="medium" @click="submitForm('registerForm')" :loading="inRegister">
                                    {{ inRegister ? '正在注册' : '注 册' }}
                                </el-button>
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
            inRegister: false,
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
                    { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ]
            },
            // 邮箱登录
            emailForm: {
                email: '',
                password: ''
            },
            emailRules: {
                email: [
                    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
                    { pattern: /^[A-Za-z]\w{5,17}/, message: '请输入正确的网易邮箱账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ]
            },
            // 注册
            registerForm: {
                nickname: '',
                password: '',
                phone: '',
                captcha: ''
            },
            registerRules: {
                nickname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '只含有汉字、数字、字母、下划线不能以下划线开头和结尾', trigger: 'blur' },
                    { min: 3, max: 16, message: '用户名长度应为3～16个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户名密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度应为6～16个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
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
            this.$refs.phoneForm.validateField('phone', error => {
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
            this.$refs.registerForm.validateField('phone', async error => {
                if (!error) {
                    // 验证手机号是否被注册
                    const { data: verifyPhone } = await this.$axios.get('/cellphone/existence/check', {
                        params: {
                            phone: this.registerForm.phone,
                            timestamp: new Date().getTime()
                        }
                    });
                    console.log(verifyPhone);

                    if (verifyPhone.exist === 1) {
                        return this.$message.warning('该手机号已被注册');
                    }
                    // 发送验证码
                    try {
                        const { data: getCaptcha } = await this.$axios.post('/captcha/sent', {
                            phone: this.registerForm.phone
                        });
                        if (getCaptcha.code !== 200) return;
                        this.$message.success('验证码已发送，请查收');

                        // 倒计时60秒
                        this.registerWait = '';
                        let interval = setInterval(() => {
                            if (this.registerWaitTime === 1) {
                                this.registerWait = '获取验证码';
                                this.registerWaitTime = 59;
                                return clearInterval(interval);
                            }
                            this.registerWaitTime--;
                        }, 1000);
                    } catch (error) {
                        return this.$notify({
                            title: '提示',
                            message: '该手机号一天只能收5条验证码',
                            type: 'warning'
                        });
                    }
                }
            });
        },
        // 提交时的校验
        submitForm(formName) {
            switch (formName) {
                // 手机登录
                case 'phoneForm':
                    this.$refs.phoneForm.validate(async valid => {
                        if (valid) {
                            try {
                                this.inLogin = true;
                                const { data: res } = await this.$axios.get('/login/cellphone', {
                                    params: this.phoneForm
                                });
                                // 登录失败
                                if (res.code !== 200) {
                                    this.inLogin = false;
                                    return this.$notify.error({
                                        title: '登录失败',
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
                                this.$emit('getUserInfo');
                                // 提示
                                this.$notify({
                                    title: '登录成功',
                                    message: `欢迎${res.profile.nickname}回家`,
                                    type: 'success'
                                });
                            } catch (error) {
                                this.inLogin = false;
                                return this.$notify.error({
                                    title: '登录失败',
                                    message: '登录太频繁，请5分钟后再试'
                                });
                            }
                        } else {
                            return false;
                        }
                    });
                    break;
                // 邮箱登录
                case 'emailForm':
                    this.$refs.emailForm.validate(async valid => {
                        if (valid) {
                            this.inLogin = true;
                            const { data: res } = await this.$axios.post('/login', {
                                email: this.emailForm.email + '@163.com',
                                password: this.emailForm.password
                            });
                            // 登录失败
                            if (res.code !== 200) {
                                this.inLogin = false;
                                return this.$notify.error({
                                    title: '失败',
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
                            this.$emit('getUserInfo');
                            // 提示
                            this.$notify({
                                title: '登录成功',
                                message: `欢迎${res.profile.nickname}回家`,
                                type: 'success'
                            });
                        } else {
                            return false;
                        }
                    });
                    break;
                // 账号注册
                case 'registerForm':
                    this.$refs.registerForm.validate(async valid => {
                        if (valid) {
                            // 开始验证验证码
                            try {
                                const { data: verify } = await this.$axios.post('/captcha/verify', {
                                    phone: this.registerForm.phone,
                                    captcha: this.registerForm.captcha
                                });
                                if (verify.code !== 200) {
                                    return this.$message.error('验证码无效，请重新获取');
                                }
                                console.log(verify);

                                this.$message.success('验证通过');
                                this.inRegister = true;
                            } catch (error) {
                                return this.$message.error('验证码无效，请重新获取');
                            }

                            // 开始注册
                            const { data: res } = await this.$axios.post('/register/cellphone', this.registerForm);
                            console.log(res);
                            if (res.code !== 200) {
                                return this.$message.error('注册失败，请重新注册');
                            }
                            // 注册成功
                            this.inRegister = false;
                            // 关闭登录框
                            this.$emit('update:openLogin', false);
                            // 提示
                            this.$notify({
                                title: '注册成功',
                                message: `用户${res.profile.nickname}：注册后请您用手机号进行登录，本次注册将和网易云音乐账号互通哟~`,
                                type: 'success',
                                duration: 0
                            });
                        } else {
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
            this.$emit('update:openLogin', false);
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
