angular.module('app.Business', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider
        .state('app.Business', {
            abstract: true,
            data: {
                title: '业务管理'
            },
            resolve: {
                srcipts: function(lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })

    .state('app.Business.customer', {
        url: '/Business/customer',
        data: {
            title: '客户管理'
        },
        views: {
            "content@app": {
                controller: 'CustomerCtrl',
                templateUrl: "views/business/customer/views/customer.html"
            }
        }
    })

});
