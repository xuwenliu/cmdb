
angular.module("services.account", []).service("AccountService", AccountService);

AccountService.$inject = ['APP_CONFIG', 'httpSvc'];

	function AccountService(APP_CONFIG, httpSvc) {
	    return {
	    	accountList:accountList,
	        accountDel:accountDel,
	        accountAdd:accountAdd,
            accountAlter:accountAlter,
            powerGet:powerGet,
            powerAlter:powerAlter
    	};
    	
    /**
     * 账号列表
    */
    function accountList(){
        return httpSvc.get(APP_CONFIG.apiUrls.ACCOUNT.account_list)
        .then(getDataComplete).catch(getDataFailed);
    }
    /**
     * 删除账号
    */
    function accountDel(postData){
        return httpSvc.del(APP_CONFIG.apiUrls.ACCOUNT.account_del,postData)
        .then(getDataComplete).catch(getDataFailed);
    }
    /**
     * 添加账号
    */
    function accountAdd(postData){
        return httpSvc.post(APP_CONFIG.apiUrls.ACCOUNT.account_add,postData)
        .then(getDataComplete).catch(getDataFailed);
    }
    // 修改账号
    function accountAlter(postData){
        return httpSvc.put(APP_CONFIG.apiUrls.ACCOUNT.account_alter,postData)
        .then(getDataComplete).catch(getDataFailed);
    }
    // 获取权限
    function powerGet(postData){
        return httpSvc.get(APP_CONFIG.apiUrls.ACCOUNT.power_get,postData)
        .then(getDataComplete).catch(getDataFailed);
    }
    // 修改权限
    function powerAlter(postData){
        return httpSvc.post(APP_CONFIG.apiUrls.ACCOUNT.power_alter,postData)
        .then(getDataComplete).catch(getDataFailed);
    }
    
    function getDataComplete(response) {
        return response ? response.data : response;
    }

    function getDataFailed(error) {
        console.log('XHR Failed for getAvengers.' + error);

    }
}

 	