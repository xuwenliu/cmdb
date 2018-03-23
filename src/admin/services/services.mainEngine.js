angular.module("services.mainEngine", []).service("MainEngineService",
	MainEngineService);

MainEngineService.$inject = ['APP_CONFIG', 'httpSvc'];

function MainEngineService(APP_CONFIG, httpSvc) {
	return {
		getMainEngineList: getMainEngineList,
		getMainEngineArea: getMainEngineArea,
		getMainEngineRoom: getMainEngineRoom,
		getMainEngineCabinet: getMainEngineCabinet,
		getHostDetail: getHostDetail,
		deleteHost: deleteHost,

		putHostStatus: putHostStatus,
		getHostRadomId: getHostRadomId,
		addHostInfo: addHostInfo,
		getDuty: getDuty,
		putBindDuty: putBindDuty,
		putUpdateHost: putUpdateHost,
		getHostLog: getHostLog,
		// 区域
		areaList: areaList,
		addArea: addArea,
		delArea: delArea,
		editArea: editArea
	};

	/**
	 * 获取主机列表
	 */
	function getMainEngineList(postData) {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.list, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 获取主机区域下拉框
	 */
	function getMainEngineArea() {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.area).then(function(res) {
			return res;
		}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 获取主机机房下拉框
	 */
	function getMainEngineRoom() {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.room).then(function(res) {
			return res;
		}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 获取主机机柜下拉框
	 */
	function getMainEngineCabinet() {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.cabinet).then(function(res) {
			return res;
		}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 *
	 * 获取主机详情
	 * @param  {[type]} postData [description]
	 * @return {[type]}          [description]
	 */
	function getHostDetail(postData) {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.hostDetail, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 删除主机
	 * @param  {[type]} postData [description]
	 * @return {[type]}          [description]
	 */
	function deleteHost(postData) {
		return httpSvc.del(APP_CONFIG.apiUrls.MAINENGINE.deleteHost, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 更改主机状态
	 */
	function putHostStatus(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.MAINENGINE.status, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 获取添加主机时的 主机ID
	 * @param {Object} postData
	 */
	function getHostRadomId(postData) {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.hostId, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 添加主机
	 * @param {Object} postData
	 */
	function addHostInfo(postData) {
		return httpSvc.post(APP_CONFIG.apiUrls.MAINENGINE.addHost, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}
	/**
	 * 获取主/副负责人
	 */
	function getDuty() {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.duty).then(function(res) {
			return res;
		}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 绑定主/副负责人
	 */
	function putBindDuty(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.MAINENGINE.bindDuty, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 修改主机
	 * @param  {[type]} postData [description]
	 * @return {[type]}          [description]
	 */
	function putUpdateHost(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.MAINENGINE.updateHost, postData).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	/**
	 * 获取主机操作日志
	 * @return {[type]} [description]
	 */
	function getHostLog() {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.log).then(
			function(res) {
				return res;
			}).catch(function(error) {
			console.log('XHR Failed for getAvengers.' + error);
		});
	}

	//*********************区域管理*********************/
	// 区域列表
	function areaList(postData) {
		return httpSvc.get(APP_CONFIG.apiUrls.MAINENGINE.areaList, postData)
			.then(getDataComplete).catch(getDataFailed);
	}
	// 修改区域
	function editArea(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.MAINENGINE.editArea, postData)
			.then(getDataComplete).catch(getDataFailed);
	}
	// 新增区域
	function addArea(postData) {
		return httpSvc.put(APP_CONFIG.apiUrls.MAINENGINE.addArea, postData)
			.then(getDataComplete).catch(getDataFailed);
	}
	// 删除区域
	function delArea(postData) {
		return httpSvc.del(APP_CONFIG.apiUrls.MAINENGINE.delArea, postData)
			.then(getDataComplete).catch(getDataFailed);
	}


	function getDataComplete(response) {
		return response ? response.data : response;
	}

	function getDataFailed(error) {
		console.log('XHR Failed for getAvengers.' + error);
	}
}
