import {put, get, post, getAccessToken} from '@/net/index.js';
import {ElMessage} from "element-plus";
import axios from "axios";

function getRegisterList ( data,success){
    post('/api/admin/userTest/listRegisters', data, success)
}

function getRegisterListExcel (testId){
    // window.open(`http://localhost:8081/api/admin/userTest/listRegistersExcel?testId=${testId}`)
    axios.get(`http://localhost:8081/api/admin/userTest/listRegistersExcel?testId=${testId}`,
        {
            headers: { 'Authorization': `Bearer ${getAccessToken()}` },
            responseType: 'blob'
        }).then((res) => {
        const { data, headers } = res
        const contentDisposition = headers['content-disposition'];
        let fileName = 'default.xlsx';
        if (contentDisposition) {
            const match = contentDisposition.match(/attachment;fileName=(.*)/);
            if (match && match[1]) {
                fileName = decodeURIComponent(match[1]);
            }
        }
        const blob = new Blob([data], {type: headers['content-type']})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
    }).catch((err) => {
        console.log(err)
        ElMessage.error('导出失败')
    })
}

export { getRegisterList,getRegisterListExcel }