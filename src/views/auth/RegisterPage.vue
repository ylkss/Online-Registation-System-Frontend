<script setup>
import {computed, reactive, ref} from "vue";
import {Iphone, Lock, User} from "@element-plus/icons-vue";
import {askCode, register} from "@/net/userApi/auth/index.js";

const registerFormRef = ref();
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  code: ''
})

// 用户输入规则检查相关
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  // 密码只能包含字母、数字、特殊字符，并且必须包含至少一个特殊字符
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if(!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`]).*[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`]*$/.test(value)){
    callback(new Error('密码必须包含至少一个特殊字符'))
  } else {
    callback()
  }
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}

// 表单验证规则
const registerRules = {
  username: [
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 3, max: 12, message: '用户名的长度必须在3-12个字符之间', trigger: ['blur', 'change'] },
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' },
    { min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change'] }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: ['blur', 'change'] }
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
      type: "phone-register"
    })
  }
}

// 注册请求
const registerHandler = () => {
  registerFormRef.value.validate((isValid) => {
    if(isValid) {
      register({
        username: registerForm.username,
        password: registerForm.password,
        phone: registerForm.phone,
        code: registerForm.code
      })
    }
  });
}
</script>

<template>
  <el-card class="auth-card" shadow="always">
    <div class="logo">
      <el-image src="https://cn.element-plus.org/images/element-plus-logo.svg"/>
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
              <el-input v-model="registerForm.code" :maxlength="6" maxlength="20" type="text" placeholder="手机验证码">
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
        <el-button @click="registerHandler" style="width: 270px" type="warning" plain>立即注册</el-button>
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