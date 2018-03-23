angular.module('app.Message', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider
        .state('app.Message', {
            abstract: true,
            data: {
                title: '消息中心模块'
            },
            resolve: {
                srcipts: function(lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })

    .state('app.Message.message', {
        url: '/Message/message',
        data: {
            title: '消息中心'
        },
        views: {
            "content@app": {
                controller: 'messageCtrl',
                templateUrl: "views/message/views/message.html"
            }
        }
    })
});
