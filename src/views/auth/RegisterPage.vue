<script setup>
import {computed, reactive, ref} from "vue";
import {Iphone, Lock, User} from "@element-plus/icons-vue";
import {askCode} from "@/net/auth/index.js";

const registerFormRef = ref();
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  code: ''
})
// 表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码'}
  ],
  phone: [
    {required: true, message: '请输入手机号'},
    {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
  ],
}

// 获取验证码冷却相关
// 验证码请求冷却时间
const isPhoneValid = ref(false)
const coldTime = ref(0)

const coldTimeFontSize = computed(() => {
  return coldTime.value > 10 ? '13px' : '14px'
})

const onValidate = (prop, isValid) => {
  if(prop === 'phone')
    isPhoneValid.value = isValid
}

// 获取验证码
const askCodeHandler = () => {
  if(isPhoneValid.value) {
    // 设置冷却时间
    coldTime.value = 99
    const timer = setInterval(() => {
      coldTime.value--
      if(coldTime.value === 0) {
        clearInterval(timer)
      }
    }, 1000)
    // 获取验证码
    askCode({
      phone: registerForm.phone,
      type: "phone-login"
    })
  }
}
</script>

<template>
  <el-card class="auth-card" shadow="always">
    <div class="logo">
      <el-image src="https://element-plus.gitee.io/images/element-plus-logo.svg"/>
    </div>
    <div class="register-form">
      <el-form
        ref="registerFormRef"
        @validate="onValidate"
        :rules="registerRules"
        :model="registerForm">
        <el-row>
          <el-col :span="6">
            <el-text>用户名：</el-text>
          </el-col>
          <el-col :span="18">
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" maxlength="20" type="text" placeholder="用户名">
                <template #prefix>
                  <el-icon><User/></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-text>密码：</el-text>
          </el-col>
          <el-col :span="18">
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" maxlength="20" type="password" placeholder="密码">
                <template #prefix>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-text>确认密码：</el-text>
          </el-col>
          <el-col :span="18">
            <el-form-item prop="confirmPassword">
              <el-input v-model="registerForm.confirmPassword" maxlength="20" type="password" placeholder="确认密码">
                <template #prefix>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-text>手机号：</el-text>
          </el-col>
          <el-col :span="18">
            <el-form-item prop="phone">
              <el-input v-model="registerForm.phone" maxlength="20" type="text" placeholder="手机号">
                <template #prefix>
                  <el-icon><Iphone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-text>验证码：</el-text>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="code">
              <el-input v-model="registerForm.code" maxlength="20" type="text" placeholder="手机验证码">
                <template #prefix>
                  <el-icon><Iphone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="success"
                       @click="askCodeHandler"
                       :style="{fontSize: coldTimeFontSize}"
                       :disabled="!isPhoneValid || coldTime > 0">
              {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-top: 30px">
        <el-button style="width: 270px" type="warning" plain>立即注册</el-button>
      </div>
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

  .register-form {
    height: 300px;
    width: 460px;
    padding: 20px;
    text-align: center;
  }
}
</style>