import { post } from '@/net/index.js';
import {ElMessage} from "element-plus";

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

export { askCode }