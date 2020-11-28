//为空判断
var IsNull = (rule, value, callback) => {
    if (value == '' || value ==null) {
        return callback(new Error("必填字段，不能为空！"));
    }else{
        callback();
    }
};
//单选框验证，值必须大于0
var GreaterThan = (rule, value, callback) => {
    if (value == '' || value <='0') {
        return callback(new Error("请至少选择一项！"));
    }else{
        callback();
    }
};
//手机号验证
var Phone = (rule, value, callback) => {
    const reg = /^1[0-9]\d{9}$/;
    if (value.length === 11 && reg.test(value)) {
        callback();
    } else {
        return callback(new Error("手机号码格式错误"));
    }
};
//姓名验证
var Cn = (rule, value, callback) => {
    const reg = /^[\u2E80-\u9FFF]+$/;
    if (value.length >= 2 && reg.test(value)) {
        callback();
    } else {
        return callback(new Error("姓名必须最少2个汉字"));
    }
};
//微信号验证
var Wx = (rule, value, callback) => {
    if (value !== '') {
        const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error("微信号格式错误"));
        }
    } else {
        callback();
    }
};
//QQ号验证
var QQ = (rule, value, callback) => {
    if (value !== '') {
        const reg = /^\s*[.0-9]{5,11}\s*$/;
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error("QQ号格式错误"));
        }
    } else {
        callback();
    }

};
var Ip = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("请输入正确得Ip地址"));
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error("请输入正确得Ip地址"));
        }
    }
};
// 身份证验证
export function checkIdNum(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!value) {
        return callback(new Error('证件号码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
    } else {
        callback()
    }
}
export default {
    QQ,
    Phone,
    Cn,
    Wx,
    Ip,
    GreaterThan,
    IsNull
}