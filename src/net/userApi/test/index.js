import { get,post } from '@/net/index.js';

function getTestList(province, success){
    get(`/api/test/list?province=${province}`, success)
}

function printTicket(success){
    get('/api/test/print-ticket', success)
}

function getTestStationList(data, success){
    post('/api/user/test-station', data, success)
}

export { getTestList,printTicket,getTestStationList }