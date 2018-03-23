angular.module('app.MainEngine').controller('areaCtrl', function($scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG, MainEngineService, $state) {
    
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
    };
    // 区域列表
    $scope.getAreaList = function(){
        MainEngineService.areaList().then(function(data){
            if (data.code) {
                popupSvc.smallBox("fail", data.msg);
            } else {
                $scope.paginationConf.totalItems = data.count;
                $scope.areas = data.data;
                $scope.totalNumber = data.total;
            }
        })
    }
    $scope.getAreaList();

    // 修改区域
    $scope.editArea = function(){
        if(!$scope.area.$invalid){
            alert("区域缩写只能是字母");
            return;
        }
        if($scope.modalName == "新增区域"){
            MainEngineService.addArea($scope.area).then(function(data){
                $scope.toastr(data);
            })
        }else{
            MainEngineService.editArea($scope.area).then(function(data){
                $scope.toastr(data);
            })
        }
        
    }
    // 删除区域
    $scope.delArea = function(id){
        var sure = function(){
	    	var postData = {
	            id:id
	        };
	    	MainEngineService.delArea(id).then(function(data){
                $scope.toastr(data)
                $scope.getAreaList();
            })
	    }
        popupSvc.smartMessageBox($rootScope.getWord("确定删除吗？"), sure);
    }
    // 显示区域编辑、添加
    $scope.showEdit = function(area){
        if(area){
            $scope.modalName = "编辑区域";
            $scope.area = area; 
        }else{
            $scope.area = {
                title:"",
                omit:""
            }
            $scope.modalName = "新增区域"
        }
        $('#area').modal();
    }
    // 提示信息
    $scope.toastr = function(res){
        if(res){
            popupSvc.smallBox("fail", "失败");
        }else{
            popupSvc.smallBox("success", "OK");
        }
    }
});