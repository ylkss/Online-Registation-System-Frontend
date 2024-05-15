import {put, get, post} from '@/net/index.js';
import {ElMessage} from "element-plus";

function addTestNotice(data){
    post(`/api/admin/testNotice/add`, data, () => {
        ElMessage.success('添加成功')
    })
}

function getTestNotices(data, success){
    post(`/api/admin/testNotice/list`, data, success)
}

export { addTestNotice, getTestNotices }