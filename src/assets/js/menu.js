let menu = [{
        index: 1, //菜单序号
        click: "goto", //菜单绑定事件
        parameters: 1, //事件参数
        class: "index-item indexBg4", //大小颜色样式
        classOne: "iconfont icon-menzhenguahao1", //图标样式
        title: "门诊挂号" //菜单名字
    },
    {
        index: 2,
        click: "works",
        parameters: 0,
        class: "index-item indexBg6",
        classOne: "iconfont icon-jizhenguahao",
        title: "急诊挂号"
    },
    {
        index: 3,
        click: "works",
        parameters: 2,
        class: "index-item indexBg5",
        classOne: "iconfont icon-jiaofei",
        title: "门诊缴费"
    },
    {
        index: 4,
        click: "works",
        parameters: 4,
        class: "index-item indexBg2",
        classOne: "iconfont  icon-yuyueguahao",
        title: "预约挂号"
    },
    {
        index: 5,
        click: "healthCode",
        parameters: null,
        class: "index-item indexBg1",
        classOne: "iconfont icon-juminjiankangqia-",
        title: "电子健康卡申领"
    },
    {
        index: 6,
        click: "yaopin",
        parameters: null,
        class: "index-item indexBg7",
        classOne: "iconfont icon-icon",
        title: "药品查询"
    },
    // {
    //     index: 7,
    //     click: "works",
    //     parameters: 3,
    //     class: "index-item indexBg2",
    //     classOne: "iconfont  icon-huaban-1",
    //     title: "检验报告"
    // },
];

export default {
    menu,
}