import {put, deleteRequest, post} from '@/net/index.js';
import {ElMessage} from "element-plus";

function addTestNotice(data){
    post(`/api/admin/testNotice/add`, data, () => {
        ElMessage.success('添加成功')
    })
}

function getTestNotices(data, success){
    post(`/api/admin/testNotice/list`, data, success)
}

function updateTestNotice(data){
    put(`/api/admin/testNotice/update`, data, () => {
        ElMessage.success('更新成功')
    })
}

function deleteTestNotice(id){
    deleteRequest(`/api/admin/testNotice/delete?id=${id}`, () => {
        ElMessage.success('删除成功')
    })
}

export { addTestNotice, getTestNotices,updateTestNotice,deleteTestNotice }