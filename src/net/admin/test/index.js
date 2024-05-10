import {put, get, post} from '@/net/index.js';
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

export { getAdminTestList,addTest }