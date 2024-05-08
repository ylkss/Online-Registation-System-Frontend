import { get } from '@/net/index.js';

function getTestList(province, success){
    get(`/api/test/list?province=${province}`, success)
}

function printTicket(success){
    get('/api/test/print-ticket', success)
}

export { getTestList,printTicket }