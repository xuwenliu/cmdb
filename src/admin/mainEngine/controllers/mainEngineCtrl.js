angular.module('app.MainEngine').controller('MainEngineCtrl', function($scope,
	popupSvc, $LocalStorage, $rootScope, APP_CONFIG, MainEngineService, $state) {
	//获取下拉框描述
	$scope.json = APP_CONFIG.option;

	//初始化多选下拉框
	$('.selectpicker').selectpicker();

	$scope.paginationConf = {
		currentPage: 1,
		itemsPerPage: APP_CONFIG.PAGE_SIZE_DEFAULT,
	};

	var GetMainEngineList = function(data) {
		var postData = {
			page: $scope.paginationConf.currentPage,
			pageSize: $scope.paginationConf.itemsPerPage,
			areaId: data.areaId,
			roomId: data.roomId,
			cabinetId: data.cabinetId,
			system: data.system,
			order: data.order,
			type: data.type,
			content: data.content,
			paiXu: $scope.order_by,
		}
		MainEngineService.getMainEngineList(postData).then(function(res) {
			console.log(postData);
			console.log("获取主机列表数据：");
			console.log(res);
			if (res.code) {
				popupSvc.smallBox("fail", res.msg);

			} else {
				$scope.paginationConf.totalItems = res.data.meta.count;
				$scope.hostList = res.data.data.data.map(function(v, i) {
					v.isChecked = false;
					return v;
				})

			}
		})
	};
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage',
		GetMainEngineList);

	//筛选显示与隐藏
	$scope.toggleAdd = function() {
		if (!$scope.newTodo) {
			$scope.newTodo = {
				state: 'Important'
			};
		} else {
			$scope.newTodo = undefined;
		}
	};

	/**
	 * 获取主机区域下拉框
	 */
	MainEngineService.getMainEngineArea().then(function(res) {
		console.log("获取主机区域下拉框:");
		console.log(res);
		if (res.code) {
			popupSvc.smallBox("fail", res.msg);
		} else {
			$scope.mainEngineArea = res.data.data.data;
		}
	});

	/**
	 * 获取主机机房下拉框
	 */
	MainEngineService.getMainEngineRoom().then(function(res) {
		console.log("获取主机机房下拉框:");
		console.log(res);
		if (res.code) {
			popupSvc.smallBox("fail", res.msg);
		} else {
			$scope.mainEngineRoom = res.data.data.data;
		}
	});

	/**
	 * 获取主机机柜下拉框
	 */
	MainEngineService.getMainEngineCabinet().then(function(res) {
		console.log("获取主机机柜下拉框:");
		console.log(res);
		if (res.code) {
			popupSvc.smallBox("fail", res.msg);
		} else {
			$scope.mainEngineCabinet = res.data.data.data;
		}
	});

	/**
	 * 获取主/副负责人下拉框
	 */
	MainEngineService.getDuty().then(function(res) {
		console.log("获取主/副负责人下拉框：");
		console.log(res);
		if (res.code) {
			popupSvc.smallBox("fail", res.msg);
		} else {
			$scope.dutyObj = res.data;
			$.each($scope.dutyObj.spareDuty, function(j, item) {
				$('.selectpicker').append("<option value=" + item.id + '>' + item.name +
					"</option>");
				$('.selectpicker').selectpicker('refresh');
			});

		}
	});


	/**
	 * 监控选择的是ID/订单号
	 */
	$scope.$watch("filter.type", function(v) {
			if (v == 1) {
				$scope.placeholderDesc = "请输入ID";
			} else if (v == 2) {
				$scope.placeholderDesc = "请输入订单号";
			} else {
				$scope.placeholderDesc = "请输入";
			}
		})
		/**
		 * 点击搜索
		 * @param {Object} filter
		 */
	$scope.search = function(filter) {
		console.log(filter);
		GetMainEngineList(filter);
	};

	/**
	 * 添加主机弹框确定
	 */
	$scope.addMainEngineModalSure = function(dt) {
		$('#addMainEngineModal').modal("hide").on("hidden.bs.modal", function(e) {
			MainEngineService.getHostRadomId(dt).then(function(res) {
				console.log("获取主机ID：");
				console.log(res);
				localStorage.setItem("hostId", res.data.id);
				location.href = "/#/MainEngine/mainEngineEdit";
				//$state.go("app.MainEngine.mainEngineEdit",{id:0});
			})
		});
	};

	/*
	 * 绑定负责人弹框
	 */
	$scope.bindDutyModal = function(hostList) {
		var count = 0;
		angular.forEach(hostList, function(v, i) {
			if (!v.isChecked) {
				count++;
			}
		})
		if (hostList.length === count) {
			popupSvc.smallBox("fail", "请选择需要绑定负责人的主机", 2000);
		} else {
			$("#bindLeaderModal").modal("show");
			$scope.dutyId = "0"; //设置主负责人下拉框默认为"请选择"
		}
	};

	/**
	 *绑定负责人弹框确定
	 * @param {Object} dutyId 主负责人id
	 */
	$scope.bindLeaderModalSure = function(hostList, dutyId) {
		//选择的主机id数组
		var hostIdArr = [];
		var getspareDuty = $('.selectpicker').val();
		angular.forEach(hostList, function(v, i) {
			if (v.isChecked) {
				hostIdArr.push(v.id);
			}
		})
		if (dutyId == 0) {
			popupSvc.smallBox("fail", "请选择主负责人");
			return;
		}
		console.log(getspareDuty);
		if (getspareDuty == null) {
			popupSvc.smallBox("fail", "请选择副负责人");
			return;
		}
		//选择的副负责人id数组
		var spareDuty = getspareDuty.map(function(v, i) {
			return v * 1;
		})
		var postObj = {
			"hostId": hostIdArr,
			"id": dutyId * 1,
			"ids": spareDuty
		}
		MainEngineService.putBindDuty(postObj).then(function(res) {
			if (res.data.data === null) {
				popupSvc.smallBox("success", "绑定负责人成功");
				$('.selectpicker').selectpicker('val', []);
				$("#bindLeaderModal").modal("hide");
				GetMainEngineList($scope.filter);
			}
		})
	};

	/**
	 * 去主机详情
	 */
	$scope.goMainEngineDetail = function(ids) {
			location.href = "/#/MainEngine/mainEngineDetail?ids=" + ids;
		}
		/**
		 * 去订单详情
		 */



	/**
	 * 状态改变
	 */
	$scope.switch = function(g, e) {
		if (g.status === 1) {
			e.target.checked = true;
		} else {
			e.target.checked = false;
		}
		console.log(e.target.checked);
		var sure = function() {
			var postData = {
				id: g.ids,
				status: g.status
			};
			MainEngineService.putHostStatus(postData).then(function(res) {
				console.log("修改状态：")
				console.log(res);
				if (res.data.data === null) {

					if (g.status == 1) {
						g.status = 2;
					} else {
						g.status = 1;
					}
					popupSvc.smallBox("success", "成功");
				} else {
					popupSvc.smallBox("fail", "失败");
				}
			})
		}
		popupSvc.smartMessageBox($rootScope.getWord("确定修改状态吗？"), sure);
	};

	/**
	 * 修改主机  id为0表示去添加主机，有id则是修改主机信息
	 */
	$scope.updateMainEngine = function(id) {
		location.href = "/#/MainEngine/mainEngineEdit?id=" + id;
		//$state.go("app.MainEngine.mainEngineEdit",{id:id});
	}



});
