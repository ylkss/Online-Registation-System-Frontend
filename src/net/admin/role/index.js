import {put, get, post, logout} from '@/net/index.js';

function getRoleList(success){
    get('/api/admin/role/list', success)
}

export { getRoleList }