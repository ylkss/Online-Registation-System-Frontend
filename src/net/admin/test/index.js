import {put, get, post} from '@/net/index.js';

function getAdminTestList ( data,success){
    post('/admin/test/list', data, success)
}

export { getAdminTestList }