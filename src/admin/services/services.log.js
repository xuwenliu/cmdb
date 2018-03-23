
angular.module("services.log", []).service("LogService", LogService);

LogService.$inject = ['APP_CONFIG', 'httpSvc'];

	function LogService(APP_CONFIG, httpSvc) {
	    return {
	    	logList:logList
    	};
    	
    /**
     * 日志列表
    */
    function logList(postMessage){
        return httpSvc.get(APP_CONFIG.apiUrls.LOG.logList,postMessage)
        .then(getDataComplete).catch(getDataFailed);
    }
    
    function getDataComplete(response) {
        return response ? response.data : response;
    }

    function getDataFailed(error) {
        console.log('XHR Failed for getAvengers.' + error);

    }
}

 	