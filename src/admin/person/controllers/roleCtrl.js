angular.module('app.Role').controller('RoleCtrl', function($scope, $rootScope, APP_CONFIG, RoleService, popupSvc){
  $scope.toggleAdd = function() {
      if (!$scope.newTodo) {
          $scope.newTodo = {
              state: 'Important'
          };
      } else {
          $scope.newTodo = undefined;
      }
  };

  $scope.addRolele = {
      title: '',
      remark: '',
      status: ''
  };
  $scope.paginationConf = {
      currentPage: 1,
      itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT
  };

  var getRoleListFun = function () {
    var postData = {
      page: $scope.paginationConf.currentPage,
      pageSize: $scope.paginationConf.itemsPerPage
    }
    RoleService.getRoleList(postData).then(function(res) {
      if(res.code) {
        popupSvc.smallBox("fail", res.msg);
      }else {
          $scope.paginationConf.totalItems = res.data.meta.count;
          $scope.list = res.data.data.data;
          $scope.totalNumber = res.data.data.total.totalNumber;
      }
    })

  }
  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getRoleListFun);

  $scope.list = [];
  $scope.roleStatusOption = APP_CONFIG.option.option_status;


  $scope.disable = function(item) {
      var sure = function() {
          var postData = {
              id: item.id,
              status: item.status
          };
          RoleService.getRoleStatus(postData).then(function(response) {
              if (response.data.data === null) {
                  if (item.status == 1) {
                      item.status = 2;
                  } else {
                      item.status = 1;
                  }
                  popupSvc.smallBox("success", "成功");
              } else {
                  console.log(3333)
                  popupSvc.smallBox("fail", "失败");
              }
          })
      };
      popupSvc.smartMessageBox($rootScope.getWord("confirmationOperation"), sure);
  };
  //添加
  $scope.addRole = function () {
    RoleService.addRole($scope.addRolele).then(function (res){
      if (res.code) {
          popupSvc.smallBox("fail", response.msg);
      } else {
        $('#myModal1').modal("hide");
        popupSvc.smallBox("success", "成功");
        $scope.addRolele = {
            title: '',
            remark: '',
            status: '2'
        };
      }
    })
  };
  //菜单
  $scope.getRoleMenu = function () {
    console.log('菜单');

    RoleService.getRoleMenuGet().then(function(res){

      $scope.menuManageGet = res.data.data.data

      console.log($scope.menuManageGet)
    })

  }

$scope.click = function() {
  console.log(1)
}



  //权限 getRolePermission

  $scope.clickedBox = function (checked) {
    if(checked.powersBackpChecked === "1"){
      checked.powersBackpChecked = "0"
      return
    }
    if(checked.powersBackpChecked === "0"){
      checked.powersBackpChecked = "1"
      return
    }
  }

  $rootScope.gotIn = function () {
    $scope.updateRolePermission2 = ""
    $scope.fflag = false
  }
  // $scope.allCheck = function(permission) {
  //   $scope.clickedBox(permission.powersBackpChecked)
  //   console.log(permission.powersBackpChecked)
  //   var len = permission.powersBackpMMone.length
  //   for(var i=0;i<len;i++){
  //     permission.powersBackpMMone[i].powersBackpChecked=permission.powersBackpChecked
  //   }
  //   console.log(permission.powersBackpId,permission.powersBackpMMone[0].powersBackpChecked,
  //     permission.powersBackpMMone[1].powersBackpChecked,permission.powersBackpMMone[2].powersBackpChecked,permission.powersBackpMMone[3].powersBackpChecked,)
  // }

  // 全选/全部选
  $scope.allChecked = function(pw){
      for(var i = 0;i<pw.powersBackpMMone.length;i++){
          pw.powersBackpMMone[i].powersBackpChecked = pw.powersBackpChecked;
      }
  }
  // 选择状态
  $scope.changeCheckbox = function(pw){
      var flag = 1;
      for(var i = 0;i<pw.powersBackpMMone.length;i++){
          if(pw.powersBackpMMone[i].powersBackpChecked == 0){
              flag = 0;
          }
      }
      pw.powersBackpChecked = flag;
  }


  // $scope.checka = function() {
  //   $scope.checkFlag = !$scope.checkFlag
  // }
  //
  // $scope.flag = false



  // $scope.childCheck = function() {
  //   $scope.childCheckFlag = true
  // }


  $scope.isSelected = function(checked) {
      if(checked === "1") { //开启
        $scope.fflag = checked
        return true
      }else if(checked === "0") {//关闭
        $scope.fflag = checked
        return false
      }
  }



  $scope.getRolePermission = function (role) {
    console.log('权限获取3',role.id);
    var postData = {
      id: role.id
    }
    RoleService.getRolePermissionGet(postData).then(function(res) {
      if (res.code) {
        popupSvc.smallBox("fail", res.msg);
      } else {
        $scope.permissionGet = res.data.data.data;
        console.log($scope.permissionGet,$scope.permissionGet.length)
//当权限id等于用户id时，就渲染对应列表
        $scope.permissionGet.id = role.id
        for(var i=0;i<$scope.permissionGet.length;i++) {
            var flag = 1
            for(var j = 0;j<$scope.permissionGet[i].powersBackpMMone.length;j++){
                if($scope.permissionGet[i].powersBackpMMone[j].powersBackpChecked == 0){
                    flag = 0;
                }
            }
            $scope.permissionGet[i].powersBackpChecked = flag;

        }

      }
    })

  }

  //权限状态

  $scope.updateRolePermissionOK = function () {
    var powerId = [];
    for(var i = 0;i<$scope.permissionGet.length;i++){
        for(var j = 0;j<$scope.permissionGet[i].powersBackpMMone.length;j++){
            if($scope.permissionGet[i].powersBackpMMone[j].powersBackpChecked == 1){
                powerId.push($scope.permissionGet[i].powersBackpMMone[j].powerChildId);
            }
        }
    }

    // var len = $scope.updateRolePermission2.powersBackpMMone.length
    // var arr = []
    // for(var i=0;i<len;i++){
    //   arr.push($scope.updateRolePermission2.powersBackpMMone[i].powersBackpChecked)
    //   $scope.updateRolePermission2.powersBackpMMone[i].powersBackpChecked = "0"
    // }
    // }else{
    //   for(var i=0;i<len;i++){
    //     $scope.updateRolePermission2.powersBackpMMone[i].powersBackpChecked = "0"
    //     arr.push($scope.updateRolePermission2.powersBackpMMone[i].powersBackpChecked)
    //   }
    // }
    // if($scope.childCheckFlag){
    //   arr=[]
    //   for(var i=0;i<len;i++){
    //     arr.push($scope.updateRolePermission2.powersBackpMMone[i].powersBackpChecked)
    //   }
    // }

    var postData = {
      roleId: $scope.permissionGet.id,
      powerId: powerId
    }
    RoleService.getRolePermissionPost(postData).then(function(res) {
      if (res.code) {
        popupSvc.smallBox("fail", res.msg);
      } else {
        console.log(postData.powerId)
        popupSvc.smallBox("success", "成功");
      }

    })


  }



  //公用
  $scope.common = function() {

  }
  //修改
  $rootScope.getRoleInfo = function(role) {
    $scope.updateRolele = {
        id: role.id,
        title: role.title,
        remark: role.remark,
        status: role.status
    }

  }
  //确认修改后
  $scope.updateRoleOK = function() {
    RoleService.updateRole($scope.updateRolele).then(function(res) {
      if (res.code) {
        popupSvc.smallBox("fail", res.msg);
      } else {
        for (var index in $scope.list) {
            if ($scope.list[index].id === $scope.updateRolele.id) {
                $scope.list[index] = $scope.updateRolele;
                $scope.list[index].remark = $scope.updateRolele.remark;
                $scope.list[index].status = parseInt($scope.list[index].status);
                $('#updateRole').modal("hide");
                popupSvc.smallBox("success", "成功");
                //window.location.reload()
                break;
            }
        }
      }
    })
  }
  //删除
   $scope.delRole = function (role) {
       var sure = function () {
           var postData = {
               id: role.id
           };
           RoleService.delRole(postData).then(function (response) {
               if (response.data.data === null) {
                   popupSvc.smallBox("success", "成功");
               } else {
                   popupSvc.smallBox("fail", "失败");
               }
           })
       };
       popupSvc.smartMessageBox($rootScope.getWord("confirmationOperation"), sure);
  }



})
.filter('fiterStatused', function() {
        return function(value) {
            var statused = "";
            if (value === 1) {
                statused = "启用"
            } else if (value === 2) {
                statused = "停用"
            }
            return statused;
        }
    })
