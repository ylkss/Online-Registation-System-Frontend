<script setup>
import {reactive} from "vue";
import {Lock, User} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const passwordLoginForm = reactive({
  username: '',
  password: '',
  remember: false
})
</script>

<template>
  <div class="auth-page">
    <el-card class="auth-card" shadow="always">
      <div class="logo">
        <el-image src="https://element-plus.gitee.io/images/element-plus-logo.svg"/>
      </div>
      <div class="login-form" type="card">
        <el-tabs stretch class="login-tabs">
          <el-tab-pane label="密码登录">
            <div class="password-login-form">
              <el-form :model="passwordLoginForm">
                <el-form-item label="账号：" prop="username">
                  <el-input v-model="passwordLoginForm.username" maxlength="20" type="text" placeholder="用户名/手机号">
                    <template #prefix>
                      <el-icon>
                        <User/>
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="username">
                  <el-input v-model="passwordLoginForm.password" maxlength="20" type="password" placeholder="密码">
                    <template #prefix>
                      <el-icon>
                        <Lock/>
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-row style="margin-top: 5px">
                  <el-col :span="12" style="text-align: left">
                    <el-form-item prop="remember">
                      <el-checkbox v-model="passwordLoginForm.remember" label="记住我"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-link @click="router.push('/forget')">忘记密码？</el-link>
                  </el-col>
                </el-row>
              </el-form>
              <div style="margin-top: 20px">
                <el-button style="width: 270px" type="success" plain>立即登录</el-button>
              </div>
              <el-divider>
                <span style="color: gray;">尚未拥有账户</span>
              </el-divider>
              <div style="margin-top: 30px">
                <el-button plain style="width: 270px" type="warning" @click="router.push('/register')">注册</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="手机验证码登录">Config</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.el-card {
  border-radius: 16px;
}

.auth-page {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;

  .auth-card {
    position: relative;
    width: 480px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%) scale(0.7);
    }

    .login-form {
      height: 300px;
      width: 460px;

      .password-login-form {
        margin-top: 10px;
        padding: 20px;
        text-align: center;
      }
    }

  }
}

</style>