function webConfig() {
    // this.apiUrl = "http://192.168.10.101:37439/YunHuiSelfServiceMachineApi"
    this.apiUrl = "http://192.168.10.101:58762/YunHuiSelfServiceMachineApi"
        // this.apiUrl = "/YunHuiSelfServiceMachineApi"

    this.overCheck = true //是否开启页面超时
    this.overTime = 120 //页面超时时间，单位秒

    this.isChildren = false //是否支持儿童建档
    this.isDzYiBao = false //是否支持电子医保付款
    this.isCardYiBao = true //是否支持实体医保付款
        //现金流程配置
    this.isAliFace = true //是否支持扫脸支付
    this.isAliCode = true //现金支付是否支持支付宝扫码付款
    this.isWeCode = true //现金支付是否支持微信扫码

    this.company = "江西善金科技" //技术支持
    this.number = "00000" //终端编号
    this.appName = "九江市中医医院自助服务一体机" //产品名称

}
var webConfig = new webConfig();