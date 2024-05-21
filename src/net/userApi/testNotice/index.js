import { get,post } from '@/net/index.js';

function getTestNoticeList(data, success){
    post(`/api/testNotice/list`, data, success)
}

function getTestNoticeInfo(id, success){
    get(`/api/testNotice/info?id=${id}`, success)
}

export { getTestNoticeList,getTestNoticeInfo }