angular.module("services.business", []).service("BusinessService",
    BusinessService);

BusinessService.$inject = ['APP_CONFIG', 'httpSvc'];
/**
 * 备注：BusinessService 服务包含客户管理和订单管理
 * 即 有关客户管理和订单管理的服务都写在BusinessService上。
 *
 */
function BusinessService(APP_CONFIG, httpSvc) {
    return {

    };


}
