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
        // 是否完成信息填写，存在任何一个字段为空则为未完善信息
        isComplete: (state) => {
            return state.user.idCardNum !== '' && state.user.realName !== '' && state.user.avatar !== ''
                && state.user.email !== '' && state.user.phone !== ''
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