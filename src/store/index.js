import {defineStore} from "pinia";

export const useUserStore = defineStore('general', {
    state: () => {
        return {
            user: {
                id: 0,
                username: '',
                phone: '',
                realName: '',
                sex: 0,
                idCardNum: '',
                avatar: '',
                email: '',
                ipSource: '',
            }
        }
    },
    getters: {
        // 是否完成信息填写，若身份证号码为空则未完成
        isComplete: () => {
            return this.user.idCardNum !== ''
        },
    },
    actions: {
        setUserInfo(data){
            this.user = data;
        },
        clearUserInfo(){
            this.user = {
                id: 0,
                username: '',
                phone: '',
                realName: '',
                sex: 0,
                idCardNum: '',
                avatar: '',
                email: '',
                ipSource: '',
            }
        }
    },
    persist: true
})