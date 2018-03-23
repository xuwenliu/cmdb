angular.module('app.MainEngine').controller('MainEngineDetailCtrl', function(
    $scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG,
    MainEngineService,
    $state, $window) {

    $scope.id = get_params(location.href, 'ids');

    /*get param 获取url参数*/
    function get_params(href, paraName) {
        var index = href.indexOf("?"),
            search = href.substring(index + 1),
            result = "";
        angular.forEach(search.split("&"), function(value) {
            var t = value.split("=");
            if (t.length > 0) {
                if (t[0] == paraName) {
                    result = t[1]
                }
            }
        });
        return result;
    }

    /**
     * 菜单展开与关闭
     */
    $(".smart-accordion-default .panel-title>a>:first-child").show();
    $(".panel-heading").on('click', function() {
        var _this = $(this);
        var dom = $(this).next();
        dom.slideToggle(function() {
            if (dom.css('display') === 'none') {
                _this.find('a>i').removeClass(
                    'fa-angle-up').addClass(
                    "fa-angle-down");
            } else {
                _this.find('a>i').removeClass(
                    'fa-angle-down').addClass(
                    "fa-angle-up");
            }
        });
    });

    /**
     * [获取主机详情操作日志]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    MainEngineService.getHostLog().then(function(res) {
        console.log("获取主机详情操作日志");
        console.log(res);
        if (res.code) {
            popupSvc.smallBox("fail", "失败");
        } else {
            $scope.logs = res.data.data;
        }
    })

    /**
     * [获取主机详情]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    MainEngineService.getHostDetail({
        id: 1
    }).then(function(res) {
        console.log("获取主机详情");
        console.log(res);
        if (res.code) {
            popupSvc.smallBox("fail", "失败");
        } else {
            $scope.hostDetail = res.data;
        }
    })

    /**
     * 删除主机
     * @param  {[type]} dt [description]
     * @return {[type]}    [description]
     */
    $scope.deleteHost = function(dt) {
        var postData = {
            id: $scope.id,
            hostId: dt.id,
        }
        console.log(postData);
        popupSvc.smartMessageBox($rootScope.getWord("确定删除吗？"),
            function() {
                MainEngineService.deleteHost(postData).then(
                    function(
                        res) {
                        if (res.data.data === null) {
                            popupSvc.smallBox("success",
                                "删除成功");
                            $window.history.go(-1);
                        }
                    })
            });

    }


})
