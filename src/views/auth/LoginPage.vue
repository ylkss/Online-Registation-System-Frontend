<script setup>
import {reactive, ref} from "vue";
import {EditPen, Lock, Phone, User} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {passwordLogin} from "@/net/index.js";

// 密码登录表单
const passwordLoginFormRef = ref();
const phoneLoginFormRef = ref();

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码'}
  ],
}

// 验证码登录表单验证规则
const phoneRules = {
  phone: [
    {required: true, message: '请输入手机号'},
    {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
  ],
  code: [
    {required: true, message: '请输入验证码'}
  ]
}

// 密码登录表单数据
const passwordLoginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 手机验证码登录表单
const phoneLoginForm = reactive({
  phone: '',
  code: '',
  remember: false
})

// 登录请求
function userLogin() {
  passwordLoginFormRef.value.validate((isValid) => {
    if(isValid) {
      passwordLogin(passwordLoginForm, () => router.push("/"))
    }
  });
}

// 验证码请求冷却时间
const isPhoneValid = ref(false)
const coldTime = ref(0)

const onValidate = (prop, isValid) => {
  if(prop === 'phone')
    isPhoneValid.value = isValid
}
</script>

<template>
  <el-card class="auth-card" shadow="always">
    <div class="logo">
      <el-image src="https://element-plus.gitee.io/images/element-plus-logo.svg"/>
    </div>
    <div class="login-form" type="card">
      <el-tabs stretch class="login-tabs">
        <el-tab-pane label="密码登录">
          <div class="password-login-form">
            <el-form :model="passwordLoginForm" :rules="rules" ref="passwordLoginFormRef">
              <el-form-item label="账号：" prop="username">
                <el-input v-model="passwordLoginForm.username" maxlength="20" type="text" placeholder="用户名/手机号">
                  <template #prefix>
                    <el-icon>
                      <User/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
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
              <el-button @click="userLogin()" style="width: 270px" type="success" plain>立即登录</el-button>
            </div>
            <el-divider>
              <span style="color: gray;">尚未拥有账户</span>
            </el-divider>
            <div style="margin-top: 30px">
              <el-button plain style="width: 270px" type="warning" @click="router.push('/register')">注册</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手机验证码登录">
          <div class="phone-login-form">
            <el-form :model="phoneLoginForm" @validate="onValidate" :rules="phoneRules" ref="phoneLoginFormRef">
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="phoneLoginForm.phone" maxlength="11" type="text" placeholder="手机号">
                  <template #prefix>
                    <el-icon>
                      <Phone/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码：" prop="code">
                <el-row :gutter="10" style="width: 100%">
                  <el-col :span="17">
                    <el-input v-model="phoneLoginForm.code" :maxlength="6" type="text" placeholder="请输入验证码">
                      <template #prefix>
                        <el-icon><EditPen /></el-icon>
                      </template>
                    </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="success"
                               :disabled="!isPhoneValid || coldTime > 0">
                      {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div style="margin-top: 20px">
              <el-button style="width: 270px" type="success" plain>立即登录</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  border-radius: 16px;
}

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

    .phone-login-form {
      margin-top: 10px;
      padding: 20px;
      text-align: center;
    }
  }

}
</style>