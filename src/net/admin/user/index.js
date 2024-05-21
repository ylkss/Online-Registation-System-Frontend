import {put, get, post, logout} from '@/net/index.js';

function getUserList(data, success){
    post('/api/admin/user/list', data, success)
}

export { getUserList }