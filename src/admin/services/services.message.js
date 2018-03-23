
angular.module("services.message", []).service("MessageService", MessageService);

MessageService.$inject = ['APP_CONFIG', 'httpSvc'];

	function MessageService(APP_CONFIG, httpSvc) {
	    return {
            messageList:messageList,
            readAll:readAll
    	};
    	
    /**
     * 消息列表
    */
    function messageList(postMessage){
        return httpSvc.get(APP_CONFIG.apiUrls.MESSAGE.messageList,postMessage)
        .then(getDataComplete).catch(getDataFailed);
    }
    
    // 批量已读
    function readAll(postMessage){
        return httpSvc.put(APP_CONFIG.apiUrls.MESSAGE.readAll,postMessage)
        .then(getDataComplete).catch(getDataFailed);
    }
    
    function getDataComplete(response) {
        return response ? response.data : response;
    }

    function getDataFailed(error) {
        console.log('XHR Failed for getAvengers.' + error);

    }
}

 	