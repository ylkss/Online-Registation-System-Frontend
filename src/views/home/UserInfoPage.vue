<script setup>
import {useUserStore} from "@/store/index.js";
import {computed, reactive, ref} from "vue";
import {Iphone, Message, UploadFilled} from "@element-plus/icons-vue";
import {askCode} from "@/net/auth/index.js";
import {update_userInfo, userInfo} from "@/net/user/index.js";
import {ElMessage} from "element-plus";
import {getAccessToken} from "@/net/index.js";

const userStore = useUserStore();

const userInfoFormRef = ref();
const userInfoForm = reactive({
  username: userStore.user.username,
  email: userStore.user.email,
  phone: userStore.user.phone,
  realName: userStore.user.realName,
  sex: userStore.user.sex,
  avatar: userStore.user.avatar,
  idCardNum: userStore.user.idCardNum,
  code: ''
})

// 表单验证相关
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
  } else {
    callback()
  }
}

const infoRules = {
  realName: [
    { required: true, message: '请输入真实姓名' }
  ],
  username: [
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 3, max: 12, message: '用户名的长度必须在3-12个字符之间', trigger: ['blur', 'change'] },
  ],
  idCardNum: [
    { required: true, message: '请输入身份证号' },
    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
  ],
  phone: [
    {required: true, message: '请输入手机号'},
    {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
  ],
  email: [
    {required: true, message: '请输入邮箱'},
    {type: 'email', message: '请输入正确的邮箱'}
  ],
  code: [
    {required: true, message: '请输入验证码'},
    {pattern: /^\d{6}$/, message: '请输入正确的验证码'}
  ]
}

// 验证码获取相关
// 验证码请求冷却时间
const isPhoneValid = ref(false)
const isEmailValid = ref(false)
const coldTime = ref(0)

const coldTimeFontSize = computed(() => {
  return coldTime.value > 10 ? '11px' : '13px'
})

const onValidate = (prop, isValid) => {
  if(prop === 'phone')
    isPhoneValid.value = isValid
  if(prop === 'email')
    isEmailValid.value = isValid
}

const setColdTime = () => {
  // 设置冷却时间
  coldTime.value = 99
  const timer = setInterval(() => {
    coldTime.value--
    if(coldTime.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 获取验证码
const askCodeHandler = () => {
  if(isPhoneValid.value) {
    setColdTime()
    // 获取验证码
    askCode({
      phone: userInfoForm.phone,
      type: "phone-reset"
    })
  }
  if(isEmailValid.value) {
    setColdTime()
    // 获取验证码
    if(userStore.user.email === null){
      askCode({
        email: userInfoForm.email,
        type: "email-bind"
      })
    }else {
      askCode({
        email: userInfoForm.email,
        type: "email-reset"
      })
    }
  }
}

// 用户主要信息提交更新
const handleMainUserInfoSubmit = () => {
  if(userInfoForm.username === userStore.user.username){
    update_userInfo({
      realName: userInfoForm.realName,
      sex: userInfoForm.sex,
      idCardNum: userInfoForm.idCardNum
    }, () => {
      userInfo(() => {
        ElMessage.success('用户主要信息更新成功')
        // 刷新页面
        location.reload()
      })
    })
  }else {
    update_userInfo({
      realName: userInfoForm.realName,
      username: userInfoForm.username,
      sex: userInfoForm.sex,
      idCardNum: userInfoForm.idCardNum
    }, () => {
      userInfo(() => {
        ElMessage.success('用户主要信息更新成功')
        // 刷新页面
        location.reload()
      })
    })
  }
}
// 用户手机号换绑
const handlePhoneChange = () => {
  update_userInfo({
    phone: userInfoForm.phone,
    code: userInfoForm.code
  }, () => {
    userInfo(() => {
      ElMessage.success('用户手机号更新成功')
      // 刷新页面
      location.reload()
    })
  })
}
// 用户邮箱换绑
const handleEmailChange = () => {
  update_userInfo({
    email: userInfoForm.email,
    code: userInfoForm.code
  }, () => {
    userInfo(() => {
      ElMessage.success('用户邮箱更新成功')
      // 刷新页面
      location.reload()
    })
  })
}
// 用户头像更新
const handleAvatarSuccess = (res) => {
  if(res.code === 200){
    userStore.user.avatar = res.data
    ElMessage.success('证件照更新成功')
  }else {
    ElMessage.error('证件照更新失败')
  }
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 1;
  // console.log(file);
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 1MB!');
  }
  return isJPG && isLt2M;
}
</script>

<template>
  <div>
    <el-card body-style="padding: 0" style="margin-top: 25px">
      <div class="card-main">
        <div class="card-content-header">
          <el-text>个人中心</el-text>
        </div>
        <div class="card-user-center">
          <div class="user_info_form">
            <el-tabs stretch type="border-card">
              <el-form
                  ref="userInfoFormRef"
                  :rules="infoRules"
                  :model="userInfoForm"
                  @validate="onValidate"
              >
                <el-tab-pane label="主要信息">
                  <div class="info_main">
                    <el-row style="margin-top: 20px">
                      <el-col :span="5">
                        <el-text style="margin-top: 5px">真实姓名：</el-text>
                      </el-col>
                      <el-col :span="19">
                        <el-form-item prop="realName">
                          <el-input size="large" v-model="userInfoForm.realName"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-text style="margin-top: 5px">账号名：</el-text>
                      </el-col>
                      <el-col :span="19">
                        <el-form-item prop="username">
                          <el-input size="large" v-model="userInfoForm.username"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-text>性别：</el-text>
                      </el-col>
                      <el-col :span="19">
                        <el-form-item prop="sex">
                          <el-radio-group v-model="userInfoForm.sex">
                            <el-radio size="large" :value="0">男</el-radio>
                            <el-radio size="large" :value="1">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-text style="margin-top: 5px">身份证号：</el-text>
                      </el-col>
                      <el-col :span="19">
                        <el-form-item prop="idCardNum">
                          <el-input size="large" v-model="userInfoForm.idCardNum"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="submit_button">
                      <el-button @click="handleMainUserInfoSubmit" style="width: 270px" type="primary" plain>提交信息</el-button>
                    </div>
                  </div>
                </el-tab-pane>

                <!-- 手机号绑定相关 -->
                <el-tab-pane label="手机号绑定">
                  <div class="phone-reset">
                    <el-row style="margin-top: 20px">
                      <el-col :span="6">
                        <el-text>手机号：</el-text>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item prop="phone">
                          <el-input size="large" v-model="userInfoForm.phone" maxlength="20" type="text">
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
                          <el-input size="large" v-model="userInfoForm.code" :maxlength="6" maxlength="20" type="text" placeholder="手机验证码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="success"
                                   @click="askCodeHandler"
                                   :style="{fontSize: coldTimeFontSize}"
                                   size="large"
                                   :disabled="!isPhoneValid || coldTime > 0">
                          {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
                        </el-button>
                      </el-col>
                    </el-row>
                    <div class="submit_button">
                      <el-button @click="handlePhoneChange" style="width: 270px" type="primary" plain>提交信息</el-button>
                    </div>
                  </div>
                </el-tab-pane>

                <!-- 邮箱绑定相关 -->
                <el-tab-pane label="邮箱绑定">
                  <div class="email-reset">
                    <el-row style="margin-top: 20px">
                      <el-col :span="6">
                        <el-text>邮箱：</el-text>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item prop="email">
                          <el-input size="large" v-model="userInfoForm.email">
                            <template #prefix>
                              <el-icon><Message /></el-icon>
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-text>验证码：</el-text>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item prop="code">
                          <el-input size="large" v-model="userInfoForm.code" :maxlength="6" maxlength="20" type="text" placeholder="邮箱验证码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="success"
                                   @click="askCodeHandler"
                                   :style="{fontSize: coldTimeFontSize}"
                                   size="large"
                                   :disabled="!isEmailValid || coldTime > 0">
                          {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
                        </el-button>
                      </el-col>
                    </el-row>
                    <div class="submit_button">
                      <el-button @click="handleEmailChange" style="width: 270px" type="primary" plain>提交信息</el-button>
                    </div>
                  </div>
                </el-tab-pane>
              </el-form>
            </el-tabs>
          </div>
          <div class="user_avatar-form">
            <div class="upload-box">
              <div class="upload-box-tips">
                <el-text>上传证件照：</el-text>
              </div>
              <div class="upload-box-content">
                <el-upload
                    class="upload-avatar"
                    drag
                    action="http://localhost:8081/api/file/uploadAvatar"
                    multiple
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :headers="{Authorization: 'Bearer ' + getAccessToken()}"
                >
                  <el-icon v-show="!userStore.user.avatar" class="el-icon--upload"><upload-filled /></el-icon>
                  <img v-show="userStore.user.avatar" :src="userStore.user.avatar" alt="avatar" class="avatar">
                  <div v-show="!userStore.user.avatar" class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      请上传近期免冠白底2寸照片，尺寸是3.5x5.3厘米，390x567像素，支持JPG/JPEG/PNG，1M以内。
                    </div>
                    <div class="el-upload__tip">
                      注意：该证件照将用于准考证打印，若测试现场不再采集照片也将用于打印普通话证书。
                    </div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-main {
  width: 100%;
  min-height: 780px;
  display: flex;
  flex-direction: column;

  .card-content-header{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-text{
      font-size: 24px;
    }
  }

  .card-user-center{
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: space-between;

    .user_info_form {
      width: 500px;
      height: 700px;
      padding: 30px;

      .el-tabs{
        width: 100%;
        height: 100%;
        border-bottom: none;
        border-right: none;
        border-left: none;

        .submit_button{
          width: 100%;
          height: 50px;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;

        }
      }
    }

    .user_avatar-form {
      width: 20%;
      height: 700px;

      .upload-box{
        width: 160px;
        height: 100%;
        margin-right: 70px;
        display: flex;
        flex-direction: column;

        .upload-box-tips{
          width: 100%;
          height: 35px;
          display: flex;
        }

        .upload-box-content{
          width: 100%;
          height: 400px;

          .upload-avatar{
            width: 160px;
            height: 240px;
            position: relative;

            .avatar{
              width: 158px;
              height: 190px;
              object-fit: cover;
            }

            .el-upload__tip{
              font-size: 12px;
              color: #606266;
            }
          }
        }
      }
    }
  }


}
</style>