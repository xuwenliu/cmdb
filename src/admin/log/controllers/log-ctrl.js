angular.module('app.Log').controller('logCtrl', function($scope, popupSvc, $LocalStorage, $rootScope, APP_CONFIG, LogService, RoleService, $state) {
    
    $scope.form = {
        startTime:'',
        endTime:'',
        operationAccount:'',
    }
    $scope.datepickerOptions = {
		changeMonth: true,
		changeYear: true
	}
    $scope.toggleAdd = function() {
        if (!$scope.newTodo) {
            $scope.newTodo = {
                state: 'Important'
            };
        } else {
            $scope.newTodo = undefined;
        }
    };
    $scope.logList = function(){
        $scope.form.startTime = $('.startTime').val();
        $scope.form.endTime = $('.endTime').val();
        return LogService.logList($scope.form).then(function(data){
            $scope.logs = data.data;
        })
    }
    $scope.logList();
    $scope.exportChooseDateRange = function(){
        $('#toexcel').modal();
    }
    $scope.export = function(){
        $scope.logList().then(function(){
           var header = ["ID","创建日期","操作人","设备ID","类型","动态描述"];
            $scope.JSONToExcelConvertor($scope.logs, "Log", header);  
        })
        
    }
    $scope.JSONToExcelConvertor = function(JSONData, FileName, ShowLabel) {  
        //先转化json  
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;  
        var excel = '<table>';      
        //设置表头  
        var row = "<tr>";  
        for (var i = 0, l = ShowLabel.length; i < l; i++) {
            row += "<td>" + ShowLabel[i] + '</td>';  
        }  
        //换行  
        excel += row + "</tr>";  
        //设置数据  
        for (var i = 0; i < arrData.length; i++) {  
            var row = "<tr>";

            for (var key in arrData[i]) {  
                var value = arrData[i][key] === "." ? "" : arrData[i][key];  
                row += '<td>' + value + '</td>';
            }  
            excel += row + "</tr>";  
        }  
        excel += "</table>";  
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";  
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';  
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';  
        excelFile += '; charset=UTF-8">';  
        excelFile += "<head>";  
        excelFile += "<!--[if gte mso 9]>";  
        excelFile += "<xml>";  
        excelFile += "<x:ExcelWorkbook>";  
        excelFile += "<x:ExcelWorksheets>";  
        excelFile += "<x:ExcelWorksheet>";  
        excelFile += "<x:Name>";  
        excelFile += "{worksheet}";  
        excelFile += "</x:Name>";  
        excelFile += "<x:WorksheetOptions>";  
        excelFile += "<x:DisplayGridlines/>";  
        excelFile += "</x:WorksheetOptions>";  
        excelFile += "</x:ExcelWorksheet>";  
        excelFile += "</x:ExcelWorksheets>";  
        excelFile += "</x:ExcelWorkbook>";  
        excelFile += "</xml>";  
        excelFile += "<![endif]-->";  
        excelFile += "</head>";  
        excelFile += "<body>";  
        excelFile += excel;  
        excelFile += "</body>";  
        excelFile += "</html>";  
        var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);  
        var link = document.createElement("a");      
        link.href = uri;  
        link.style = "visibility:hidden";  
        link.download = FileName + ".xls";  
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
    }
    // 提示信息
    $scope.toastr = function(res){
        if(res){
            popupSvc.smallBox("fail", "失败");
        }else{
            popupSvc.smallBox("success", "成功");
        }
    }
});