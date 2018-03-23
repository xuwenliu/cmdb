angular.module('app.Account', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider
        .state('app.Account', {
            abstract: true,
            data: {
                title: '账号模块'
            },
            resolve: {
                srcipts: function(lazyScript) {
                    return lazyScript.register([
                        'vendor.ui.js'
                    ]);
                }
            }
        })

    .state('app.Account.account', {
        url: '/Account/account',
        data: {
            title: '账号管理'
        },
        views: {
            "content@app": {
                controller: 'accountCtrl',
                templateUrl: "views/account/views/account.html"
            }
        }
    })
});
