angular.module('services.menu', [])
    .service('MenuServices', MenuServices);
MenuServices.$inject = ['APP_CONFIG', 'httpSvc'];

function MenuServices(APP_CONFIG, httpSvc) {
    return {
        getMenuList: getMenuList, // 获取菜单列表
        addMenu: addMenu //添加一级菜单
    };

    function getMenuList() {
        return httpSvc.get(APP_CONFIG.apiUrls.MENU.MENU_LIST).then(getDataComplete).catch(getDataFailed);

        function getDataComplete(response) {
            return response;
        }

        function getDataFailed(error) {
            console.log('XHR Failed for getAvengers.' + error);

        }
    }

    function addMenu(postData) {
        httpSvc.post(APP_CONFIG.apiUrls.MENU.MENU_ADD, postData).then(getDataComplete).catch(getDataFailed);

        function getDataComplete(response) {
            return response;
        }

        function getDataFailed(error) {
            console.log('XHR Failed for getAvengers.' + error);

        }
    }
}
