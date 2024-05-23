import {put, get, post, deleteRequest} from '@/net/index.js';

function getMenuTree(success){
    get('/api/admin/menu/list', success)
}

function getRoleMenuTree(id, success){
    get(`/api/admin/menu/listById?id=${id}`, success)
}

function addMenu(data, success){
    post('/api/admin/menu/add', data, success)
}

function updateMenu(data, success){
    put('/api/admin/menu/update', data, success)
}

function deleteMenu(id, success){
    deleteRequest(`/api/admin/menu/delete?id=${id}`, success)
}

export { getMenuTree, addMenu, updateMenu, deleteMenu, getRoleMenuTree }