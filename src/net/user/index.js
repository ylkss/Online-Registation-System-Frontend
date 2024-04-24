import { put,get } from '@/net/index.js';
import {useUserStore} from "@/store/index.js";
import {ElMessage} from "element-plus";

function userInfo(callback){
    get('/api/user/info', (data) => {
        const store = useUserStore();
        store.setUserInfo(data);
        if(callback) {
            callback()
        }else {
            ElMessage.success(`登陆成功，欢迎${store.user.username}回来`);
        }
    })
}

function update_userInfo(data, success){
    put('/api/user/update-info', data, success)
}

export { userInfo,update_userInfo }