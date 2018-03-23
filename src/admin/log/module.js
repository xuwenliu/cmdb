angular.module('app.Log', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider
        .state('app.Log', {
            abstract: true,
            data: {
                title: '日志模块'
            },
            resolve: {
                srcipts: function(lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })

    .state('app.Log.log', {
        url: '/Log/log',
        data: {
            title: '日志管理'
        },
        views: {
            "content@app": {
                controller: 'logCtrl',
                templateUrl: "views/log/views/log.html"
            }
        }
    })
});
