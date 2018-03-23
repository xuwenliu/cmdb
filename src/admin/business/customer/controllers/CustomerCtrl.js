angular.module('app.Business').controller('CustomerCtrl', function($scope,
    popupSvc, $LocalStorage, $rootScope, APP_CONFIG, BusinessService,
    $state) {

    /**
     * 备注：BusinessService 服务包含客户管理和订单管理
     * 即 有关客户管理和订单管理的服务都写在BusinessService上。
     *
     */

    //筛选显示与隐藏
    $scope.toggleAdd = function() {
        if (!$scope.newTodo) {
            $scope.newTodo = {
                state: 'Important'
            };
        } else {
            $scope.newTodo = undefined;
        }
    };
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
    };

    var GetCustomerList = function(data) {
        var postData = {
                page: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage,
                username: data.username,
                paiXu: $scope.order_by,
            }
            /*BusinessService.getCustomerList(postData).then(function(res) {
                console.log(postData);
                console.log("获取客户列表数据：");
                console.log(res);
                if (res.code) {
                    popupSvc.smallBox("fail", res.msg);
                } else {
                    $scope.paginationConf.totalItems = res.data
                        .meta.count;
                }
            })*/
    };
    /*$scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage',
        GetCustomerList);*/

    /**
     * 点击搜索
     * @param {Object} filter
     */
    $scope.search = function(filter) {
        console.log(filter);
        GetCustomerList(filter);
    };

})
