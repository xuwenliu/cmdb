angular.module('app.Message').controller('messageCtrl', function($scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG, MessageService, $state) {
    
    $scope.form = {
        time:""
    }
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
    };
    // 消息列表
    $scope.getMessageList = function(){
        
        $scope.form.time = $('.messageTime').val();
        MessageService.messageList($scope.form).then(function(data){
            if (data.code) {
                popupSvc.smallBox("fail", data.msg);
            } else {
                $scope.paginationConf.totalItems = data.count;
                $scope.messages = data.data;
                $scope.totalNumber = data.total;
            }
        })
    }
    $scope.getMessageList()

    // 全部已读
    $scope.readAll = function(all){
        var ids = [];
        if(all){
            for(var i = 0;i<$scope.messages.length;i++){
                ids.push($scope.messages[i].id);
                $scope.messages[i].status = 2;
            }
        }else{
            ids[0] = $scope.message.id;
            $scope.message.status = 2;
        }
        MessageService.readAll(ids).then(function(data){
            $scope.toastr(data);
        })
    }
    // 提示信息
    $scope.toastr = function(res){
        if(res){
            popupSvc.smallBox("fail", "失败");
        }else{
            popupSvc.smallBox("success", "OK");
        }
    }
    // 显示消息详情
    $scope.showMsg = function(msg){
        $scope.message = msg;
        $('#message').modal();
    }
    $scope.toggleAdd = function() {
        if (!$scope.newTodo) {
            $scope.newTodo = {
                state: 'Important'
            };
        } else {
            $scope.newTodo = undefined;
        }
    };
});