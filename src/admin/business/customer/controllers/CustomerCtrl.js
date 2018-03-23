angular.module('app.Business').controller('CustomerCtrl', function($scope,
    popupSvc, $LocalStorage, $rootScope, APP_CONFIG, BusinessService,
    $state) {

    /**
     * 备注：BusinessService 服务包含客户管理和订单管理
     * 即 有关客户管理和订单管理的服务都写在BusinessService上。
     *
     */
    //获取下拉框描述
    $scope.json = APP_CONFIG.option;

})
