angular.module('app.Menu')
    .controller('MenuListCtrl', function ($scope, APP_CONFIG, MenuServices) {
        $scope.list = [];
        $scope.checkedOption = APP_CONFIG.option.option_yesOrno;
        $scope.addMainMenuObj = {
            title: '',
            route: '',
            icon: '',
            checked: '1',
            level: 1,
            sort: ''
        };
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT
        };
        var getMenuListFunc = function () {
            var postData = {
                page: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            MenuServices.getMenuList(postData).then(function (res) {
                if (res.code) {
                    popupSvc.smallBox("fail", res.msg);
                } else {
                    $scope.totalNumber = res.data.data.total.totalNumber;
                    $scope.paginationConf.totalItems = res.data.meta.count;
                    var data = res.data.data.data;
                    for (var i in data) {
                        $scope.updateData(data[i]);
                    }
                }
            });
        };

        $scope.updateData = function (data) {
            $scope.list.push(data);
            if (data.children.length > 0) {
                for (var i in data.children) {
                    $scope.updateData(data.children[i]);
                }
            }
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMenuListFunc);

        $scope.addMainMenu = function () {
            console.log($scope.addMainMenuObj);

        };
    });
