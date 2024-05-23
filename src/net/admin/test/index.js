import {put, deleteRequest, post} from '@/net/index.js';
import {ElMessage} from "element-plus";

function getAdminTestList ( data,success){
    post('/admin/test/list', data, success)
}

function addTest(data, success){
    post('/admin/test/add', data, () => {
        ElMessage.success('添加测试成功')
        success()
    })
}

function updateTestInfo(data, success){
    put('/admin/test/update', data, () => {
        ElMessage.success('更新测试成功')
        success()
    })
}

function deleteTest(id, success){
    deleteRequest(`/admin/test/delete?id=${id}`, () => {
        ElMessage.success('删除测试成功')
        success()
    })
}

export { getAdminTestList,addTest,updateTestInfo,deleteTest }