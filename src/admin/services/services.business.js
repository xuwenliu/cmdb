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
    	getCustomerList:getCustomerList,
    	deleteCustomer:deleteCustomer,
    	addCustomer:addCustomer,
    	updateCustomer:updateCustomer,

    };

    /**
	 * 获取客户列表
	 */
	function getCustomerList(postData) {
		return httpSvc.get(APP_CONFIG.apiUrls.CUSTOMER.user, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 删除客户
	 */
	function deleteCustomer(postData) {
		return httpSvc.del(APP_CONFIG.apiUrls.CUSTOMER.user, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 添加客户
	 */
	function addCustomer(postData) {
		return httpSvc.post(APP_CONFIG.apiUrls.CUSTOMER.user, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 修改客户
	 */
	function updateCustomer(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.CUSTOMER.user, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	

}
