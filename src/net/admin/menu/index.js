import {put, get, post, logout} from '@/net/index.js';

function getMenuTree(success){
    get('/api/admin/menu/list', success)
}

export { getMenuTree }