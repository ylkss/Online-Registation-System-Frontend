import {put, deleteRequest, post, get } from '@/net/index.js';
import {ElMessage} from "element-plus";

function getRoleList(success){
    get('/api/admin/role/list', success)
}

function addRole(data, success){
    post('/api/admin/role/add', data, success)
}

function updateRole(data, success){
    put('/api/admin/role/update', data, success)
}

function deleteRole(id, success){
    deleteRequest(`/api/admin/role/delete?id=${id}`, () => {
        ElMessage.success('删除成功')
        success()
    })
}

function updateRoleMenu(data){
    post('/api/admin/roleMenu/update', data, () => {
        ElMessage.success('更新成功')
    })
}

export { getRoleList, addRole, updateRole, deleteRole,updateRoleMenu }