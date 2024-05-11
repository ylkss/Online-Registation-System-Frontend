import {put, get, post} from '@/net/index.js';

function getTestRooms (data,success){
    post(`/api/admin/testRoom/getTestRooms`, data, success)
}

export { getTestRooms }