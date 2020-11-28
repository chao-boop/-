import router from '../../router'
import axios from 'axios'
import store from '../../store'
// import '../../../static/config.js'
var overTime = JSON.parse(JSON.stringify(webConfig.overTime))
import {
    message,
    Loading
} from 'element-ui'
// axios.defaults.baseURL = 'http://192.168.10.177:37439/YunHuiSelfServiceMachineApi'
axios.defaults.baseURL = webConfig.apiUrl
axios.defaults.headers.common['Content-Type'] = 'application/json'
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.request.use(
    config => {
        webConfig.overTime = JSON.parse(JSON.stringify(overTime));
        console.log('发送请求了，时间重置为=》' + webConfig.overTime)
        if (store.state.token) {
            config.headers.Authorization = `${store.state.token}`;
        }
        return config;
    });
axios.interceptors.response.use(
    response => {
        return response.data
    }, err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 408:
                    err.message = '请求超时，请重试'
                    break;
                case 401:
                    store.commit('exit');
                    router.replace('/');
                    break;
                default:
                    err.message = '服务器开小差了';
            }
        } else {
            err.message = '服务器开小差了!'
        }
        return err
    }
)
let loading;

function post(showload, msg, url, param) { //请求前是否显示load，提示语，请求地址，参数
    if (showload === true) {
        let message = '加载中...'
        if (msg) {
            message = msg
        }
        loading = Loading.service({
            lock: true,
            text: message,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    return new Promise((resolve, reject) => {
        axios.post(url, param).then(res => {
            if (showload === true) {
                loading.close();
            }
            resolve(res)
        }).catch(err => {
            if (showload === true) {
                loading.close();
            }
        })
    })
}

function get(showload, msg, url, param) { //请求前是否显示load，提示语，请求地址，参数
    if (showload === true) {
        let message = '加载中...'
        if (msg) {
            message = msg
        }
        loading = Loading.service({
            lock: true,
            text: message,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: param
        }).then(res => {
            if (showload === true) {
                loading.close();
            }
            resolve(res)
        }).catch(err => {
            if (showload === true) {
                loading.close();
            }
        })
    })
}

function showback(msg) {
    message({
        message: msg,
        type: 'error',
        onClose: () => {
            router.go(-1)
        }
    })
}
//打印电子健康码
function printCode(code, name, success, error) {
    post(false, '', '/HealthCard/PrintQrcode', {
        staticQrcode: code,
        username: name
    }).then(res => {
        if (res.status === true) {
            success()
        } else {
            store.commit('printErrMsg', res.message)
            error()
        }
    })
}
//打印费用
function printPay(payid) {
    post(false, '', '/Pay/PrintResult', {
        PayId: payid
    })
}
//饿了么message延迟关闭事件
var time = 6000;
//解除锁定医师
function clearLock(id) {
    if (id) {
        post(false, '取消锁号中...', '/Appointment/CancelAppointment', {
            appointmentId: id
        }).then(res => {
            if (res.status === false) {
                this.$message.error({
                    message: res.message,
                    type: 'error',
                    duration: time
                })
            }
        })
    }
}
export default {
    post,
    get,
    showback,
    printCode,
    time,
    clearLock,
    printPay
}