import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        token:'',
        user:'',
        card:null,//二代居民身份证信息
        printMsg:''//打印错误信息
    },
    mutations:{
        printErrMsg(state,data){
            state.printMsg=data
        },
        card(state,data){
            state.card=data.cardData
            state.token=data.token
        },
        token(state,data){
            state.token=data.token
            state.user=data.userName
        },
        exit(state,data){
            state.token=''
            state.card=null
            state.user=''
        }
    },
    plugins: [createPersistedState({
        key:'zizhuji',
        storage: window.sessionStorage
    })]
})