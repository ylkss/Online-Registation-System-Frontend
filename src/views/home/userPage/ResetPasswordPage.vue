<script setup>
import {useUserStore} from "@/store/index.js";
import {computed, reactive, ref} from "vue";
import {Iphone, Lock} from "@element-plus/icons-vue";
import {askCode} from "@/net/auth/index.js";
import {userResetPassword} from "@/net/user/index.js";
import {ElMessage} from "element-plus";

const userStore = useUserStore();

const resetFormRef = ref();
const resetPassword = reactive({
  password: '',
  confirmPassword: '',
  code: ''
})

// 表单验证规则
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
  } else if (value !== resetPassword.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const resetRules = {
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
const isPhoneValid = ref(true)
const coldTime = ref(0)

const coldTimeFontSize = computed(() => {
  return coldTime.value > 10 ? '11px' : '12px'
})

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
      phone: userStore.user.phone,
      type: "phone-password-reset"
    })
  }
}

const handleResetPassword = () => {
  resetFormRef.value.validate((valid) => {
    if (valid) {
      userResetPassword({
        password: resetPassword.password,
        code: resetPassword.code
      })
    } else {
      ElMessage.warning('请检查表单')
    }
  });
}
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="margin-top: 25px">
      <div class="reset-password">
        <div class="reset-password-form">
          <div class="form-header">
            <div style="width: 10px;height: 100%;background-color: #a0cfff;margin-right: 10px"></div>
            <el-text>重置密码</el-text>
          </div>
          <div class="form-body">
            <el-form
                ref="resetFormRef"
                :rules="resetRules"
                :model="resetPassword"
            >
              <el-row>
                <el-col :span="6">
                  <el-text size="large">新密码 : </el-text>
                </el-col>
                <el-col :span="18">
                  <el-form-item prop="password">
                    <el-input v-model="resetPassword.password" show-password>
                      <template #prefix>
                        <el-icon><Lock/></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-text size="large">确认密码 : </el-text>
                </el-col>
                <el-col :span="18">
                  <el-form-item prop="confirmPassword">
                    <el-input v-model="resetPassword.confirmPassword" show-password>
                      <template #prefix>
                        <el-icon><Lock/></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-text size="large">手机号：</el-text>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="userStore.user.phone" disabled></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 19px">
                <el-col :span="6">
                  <el-text>验证码：</el-text>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="code">
                    <el-input v-model="resetPassword.code" :maxlength="6" maxlength="20" type="text" placeholder="手机验证码">
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
                             :disabled="coldTime > 0">
                    {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
            <div class="form-button">
              <el-button @click="handleResetPassword" style="width: 270px" type="primary">确认重置</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.reset-password{
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  .reset-password-form{
    width: 30%;
    height: 350px;

    .form-header{
      display: flex;
      height: 30px;
      border-bottom: #79bbff 2px solid;

      .el-text{
        font-size: 19px;
        font-weight: bold;
      }
    }

    .form-body{
      width: 100%;
      height: 100%;
      margin-top: 30px;
    }

    .form-button{
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>