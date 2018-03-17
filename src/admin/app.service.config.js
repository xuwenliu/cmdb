appConfig.apiUrls = {
    CAPTCHA: "/captcha",
    LOGIN: "/login",
    HOST:"/api",
    LAYOUT: "/logout", //退出登录

    LANG: { //语言下拉
        "index": "/langs",
        "cn": "/lang/cn",
        "us": "/lang/us",
        "zh": "/lang/zh"
    },
    ACTIVITY: {
        "index": "/activitys",
        "msgs": "/activity/msgs",
        "notify": "/activity/notify"
    },

    // 管理员
    HOLDER_LIST: "/holder/list", // 开户人管理	GET /holder/list、
    HOLDER_DISABLE:"/holder/disable",

    //主机列表
    MAINENGINE:{
        "area":"/mainEngine/area",//GET 主机区域下拉框
        "list":"/host/list",//GET 主机列表
        "status":"/host/status" //PUT 更改主机状态
    }

};


appConfig.option = {
    option_status: [
        { name: "停用", value: "2" },
        { name: "启用", value: "1" }
    ],
    option_online: [
        { name: "在线", value: "1" },
        { name: "离线", value: "2" }
    ]
};