import { post } from '@/net/index.js';
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

/**
 * 请求验证码
 * @param data 请求数据
 */
function askCode(data){
    post('/api/auth/ask-code', data,() => {
        ElMessage.success("验证码已发送,五分钟内有效");
    }, () => {
        ElMessage.error("验证码发送失败,请稍后重试");
    })
}

/**
 * 用户注册接口
 * @param data 请求数据
 */
function register(data){
    post('/api/auth/register', data, () => {
        ElMessage.success("注册成功");
        router.push({path: '/auth/login'})
    }, () => {
        ElMessage.error("注册失败");
    })
}

export { askCode, register }