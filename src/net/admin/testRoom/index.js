import {put, deleteRequest, post} from '@/net/index.js';
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

function updateTestRoom (data, success){
    put(`/api/admin/testRoom/updateTestRoom`, data, () => {
        ElMessage.success('更新成功')
        success()
    })
}

function deleteTestRoom (id, success){
    deleteRequest(`/api/admin/testRoom/deleteTestRoom?id=${id}`, () => {
        ElMessage.success('删除成功')
        success()
    })
}

export { getTestRooms,addTestRoom,updateTestRoom,deleteTestRoom }