import { get } from '@/net/index.js';

function getTestList(province, success){
    get(`/api/test/list?province=${province}`, success)
}

export { getTestList }