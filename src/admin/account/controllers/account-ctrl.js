angular.module('app.Account').controller('accountCtrl', function($scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG, AccountService, RoleService, $state) {
    
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
    };
    $scope.toggleAdd = function() {
        if (!$scope.newTodo) {
            $scope.newTodo = {
                state: 'Important'
            };
        } else {
            $scope.newTodo = undefined;
        }
    };
    $scope.handleMsg = "";
    // 获取账号列表
    $scope.form = {
        status:'',
        username:''
    }
    $scope.getAccountList = function(){
        AccountService.accountList($scope.form).then(function(res){
            if (res.code) {
                popupSvc.smallBox("fail", res.msg);
            } else {
                $scope.paginationConf.totalItems = res.count;
                $scope.accounts = res.data;
                $scope.totalNumber = res.total;
            }
        })
    }
    $scope.getAccountList();
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.getAccountList);
    // 获取角色列表
    RoleService.getRoleList().then(function(data){
        $scope.roles = data.data.data.data;
        console.log(data)
    })

    // 删除账号
    $scope.delAccount = function(id){
        var sure = function(){
	    	var postData = {
	            id:id
	        };
	    	AccountService.accountDel(id).then(function(data){
                $scope.toastr(data)
                $scope.getAccountList();
            })
	    }
        popupSvc.smartMessageBox($rootScope.getWord("确定删除吗？"), sure);
    }

    // 添加/修改账号
    $scope.addOrAlterAccount = function(){
        if($scope.handleMsg == "新增账号"){
            AccountService.accountAdd($scope.account).then(function(data){
                $scope.toastr(data)
            })
        }else{
            AccountService.accountAlter($scope.account).then(function(data){
                $scope.toastr(data)
            })
        }
    }
    
    // 显示添加/修改账号
    $scope.showAccountAddOrAlter = function(item){
        if(item){
            $scope.account = item;
            $scope.handleMsg = "修改账号"
        }else{
            $scope.handleMsg = "新增账号"
            $scope.account = {
                account:"",
                password:"",
                replyPassword:'',
                username:"",
                email:"",
                status:"",
                roleId:""
            }
        }
        $('#accountAddOrAlter').modal();
    }

    // 查看账号信息
    $scope.accountMsg = function(item){
        $scope.account = item;
        $('#accountMsg').modal();
    }

    // 账号权限获取
    $scope.getAccountPower = function(id){
        var postData = {
            adminId: id
        }
        AccountService.powerGet(postData).then(function(data){
            $scope.powers = data.Powers;
            for(var i = 0;i<$scope.powers.length;i++){
                var flag = 1;
                for(var j = 0;j<$scope.powers[i].backPowers.length;j++){
                    if($scope.powers[i].backPowers[j].checked == 0){
                        flag = 0;
                    }
                }
                $scope.powers[i].checked = flag;
            }
        })
        $('#powerModal').modal();
    }

    // 账号权限修改
    $scope.alterAccountPower = function(id){
        var powerId = [];
        for(var i = 0;i<$scope.powers.length;i++){
            for(var j = 0;j<$scope.powers[i].backPowers.length;j++){
                if($scope.powers[i].backPowers[j].checked == 1){
                    powerId.push($scope.powers[i].backPowers[j].id);
                }
            }
        }
        var postData = {
            adminId:id,
            powerId:powerId
        }
        AccountService.powerAlter(postData).then(function(data){
            $scope.toastr(data)
        })
    }
    // 选择状态
    $scope.changeCheckbox = function(pw){
        var flag = 1;
        for(var i = 0;i<pw.backPowers.length;i++){
            if(pw.backPowers[i].checked == 0){
                flag = 0;
            }
        }
        pw.checked = flag;
    }
    // 全选/全部选
    $scope.allChecked = function(pw){
        for(var i = 0;i<pw.backPowers.length;i++){
            pw.backPowers[i].checked = pw.checked;
        }
    }
    // 提示信息
    $scope.toastr = function(res){
        if(res){
            popupSvc.smallBox("fail", "失败");
        }else{
            popupSvc.smallBox("success", "成功");
        }
    }
});