angular.module('app.MainEngine').controller('MainEngineCtrl', function($scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG, MainEngineService, $state) {
    $scope.toggleAdd = function() {
        if (!$scope.newTodo) {
            $scope.newTodo = {
                state: 'Important'
            };
        } else {
            $scope.newTodo = undefined;
        }
    };

    MainEngineService.getMainEngineArea().then(function(res){
    	if(res.data.code === 20000){
    		$scope.mainEngineArea = res.data.data.data;
    	}else {
    		popupSvc.smallBox("fail", response.msg);
    	}
    })
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
    };

    var GetMainEngineList = function() {
        var postData = {
            page: $scope.paginationConf.currentPage,
            pageSize: $scope.paginationConf.itemsPerPage,
            areaId: $scope.areaId,
            roomId: $scope.roomId,
            cabinetId: $scope.cabinetId,
            system:$scope.system,
            order:$scope.order,
            type:$scope.type,
            content:$scope.content,
            paiXu: $scope.order_by,
        }
        MainEngineService.getMainEngineList(postData).then(function(res){
        	console.log(postData);
        	console.log(res);
        	if(res.data.code === 20000){
        		$scope.paginationConf.totalItems = res.data.meta.count;
	    		$scope.hostList = res.data.data.data;
	    	}else {
	    		popupSvc.smallBox("fail", response.msg);
	    	}
    	})
    }

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetMainEngineList);
    
    //状态改变
    $scope.switch = function(g) {
    	console.log(g);
        var postData = {
            id: g.ids,
            status: g.status
        };
        MainEngineService.putHostStatus(postData).then(function(res) {
        	console.log(res);
            if (res.data.data === null) {
               	if(g.status==1){
		    		g.status = 2;
		    	}else {
		    		g.status = 1;
		    	}
                popupSvc.smallBox("success", "成功");
            } else {
                popupSvc.smallBox("fail", "失败");
            }
        })
       
 

    }



});