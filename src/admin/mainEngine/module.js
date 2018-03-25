angular.module('app.MainEngine', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider
        .state('app.MainEngine', {
            abstract: true,
            data: {
                title: '资源池管理'
            },
            resolve: {
                srcipts: function(lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })
        .state('app.MainEngine.mainEngine', {
            url: '/MainEngine/mainEngine',
            data: {
                title: '主机管理'
            },
            views: {
                "content@app": {
                    controller: 'MainEngineCtrl',
                    templateUrl: "views/mainEngine/views/mainEngine.html"
                }
            }
        })
        .state('app.MainEngine.mainEngineEdit', {
            url: '/MainEngine/mainEngineEdit',
            data: {
                title: '编辑主机'
            },
            views: {
                "content@app": {
                    controller: 'MainEngineEditCtrl',
                    templateUrl: "views/mainEngine/views/mainEngineEdit.html"
                }
            }
        })
        .state('app.MainEngine.MainEngineDetail', {
            url: '/MainEngine/mainEngineDetail',
            data: {
                title: '主机详情'
            },
            views: {
                "content@app": {
                    controller: 'MainEngineDetailCtrl',
                    templateUrl: "views/mainEngine/views/mainEngineDetail.html"
                }
            }
        })

    .state('app.MainEngine.area', {
        url: '/MainEngine/area',
        data: {
            title: '区域管理'
        },
        views: {
            "content@app": {
                controller: 'areaCtrl',
                templateUrl: "views/mainEngine/views/area.html"
            }
        }
    })
});
