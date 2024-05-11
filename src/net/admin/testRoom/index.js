import {put, get, post} from '@/net/index.js';
import {ElMessage} from "element-plus";

function getTestRooms (data,success){
    post(`/api/admin/testRoom/getTestRooms`, data, success)
}

function addTestRoom (data, success){
    post(`/api/admin/testRoom/addTestRoom`, data, () => {
        ElMessage.success('添加成功')
        success()
    })
}

export { getTestRooms,addTestRoom }