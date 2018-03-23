angular.module('app.Menu', [
    'ui.router'
]).config(function ($stateProvider) {
    $stateProvider
        .state('app.Menu', {
            abstract: true,
            data: {
                title: 'Menu'
            },
            resolve: {
                srcipts: function (lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })
        .state('app.Menu.list', {
            url: '/Menu/list',
            data: {
                title: '菜单管理'
            },
            views: {
                'content@app': {
                    controller: 'MenuListCtrl',
                    templateUrl: 'views/menu/views/list.html'
                }
            }
        })
});