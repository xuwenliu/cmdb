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
            paiXu: $scope.order_by,
        }
        if(data){
            postData.username=data.username;
        }
        
        BusinessService.getCustomerList(postData).then(function(res) {
            console.log(postData);
            console.log("获取客户列表数据：");
            console.log(res);
            if (res.code) {
                popupSvc.smallBox("fail", res.msg);
            } else {
                $scope.paginationConf.totalItems = res.data
                    .meta.count;
                    $scope.userList = res.data.data.data;
            }
        })
    };
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage',
        GetCustomerList);

    /**
     * 点击搜索
     * @param {Object} filter
     */
    $scope.search = function(filter) {
        console.log(filter);
        GetCustomerList(filter);
    };
    $scope.info = {};
    /**
     * 删除客户
    */
    $scope.deleteCustomer = function(dt,index){
        var postData = {
            id:dt.userId
        }
        popupSvc.smartMessageBox($rootScope.getWord("确定删除该客户吗？"), function(){
            BusinessService.deleteCustomer(postData).then(function(res){
                if(res.data.data===null){
                    popupSvc.smallBox("success", "删除成功");
                    $scope.userList.splice(index,1);
                }
            })
        });
    }
    /**
     * 
     * @param t：1=新增 2=修改
     */
    $scope.editCustomerModal = function(t,dt) {
        $scope.info = {};
        $scope.type = t;
        if(dt){
            $scope.info = angular.copy(dt);
        }
        $("#customerModal").modal("show");
    }

    $('[data-toggle="tooltip"]').tooltip();
    $scope.editCustomerModalSure = function(dt) {
        console.log(dt);
        console.log($scope.userId)
        if($scope.type==1){//新增
            BusinessService.addCustomer(dt).then(function(res){
                if(res.data.data===null){
                    $scope.userId="";
                    popupSvc.smallBox("success", "添加成功");
                    $("#customerModal").modal("hide");
                    $scope.info = {};
                }
            })
        }else {//修改
            BusinessService.updateCustomer($scope.info).then(function(res){
                console.log($scope.info);
                if(res.data.data===null){
                    $scope.userId="";
                    popupSvc.smallBox("success", "修改成功");
                    $("#customerModal").modal("hide");
                    $scope.info = {};
                }
            })
        }
    }
})
