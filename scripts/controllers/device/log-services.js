define(function () { 

    var diagnosticsLogControllerService = function($http, $log, $filter) {
        var vm = this;

        this.ignoreTemplate = {};

        //this.disableAcknowledge = function() {
        //    var acknowledgedEntry = _.find(vm.globalGridData.gridOptions.data, {'selected': true, 'eventStatusType': 2000});
        //    return _.isEmpty(acknowledgedEntry);
        //};

        //this.disableUnacknowledge = function() {
        //    var unacknowledgedEntry = _.find(vm.globalGridData.gridOptions.data, {'selected': true, 'eventStatusType': 1000});
        //    return _.isEmpty(unacknowledgedEntry);
        //};

        //this.disableAction = function() {
        //    var selectedEntry = _.find(vm.globalGridData.gridOptions.data, {'selected': true});
        //    return _.isEmpty(selectedEntry);
        //};

        //this.dataNotAvailable = function() {
        //    return vm.globalGridData.gridOptions.data.length <= 0;
        //};

        this.globalGridData = {};
        this.globalGridData.gridId = "globalAlertsGrid";
        vm.globalGridData.selectedCount = 0;
        this.details = {};
        this.data={
            masterGlobalAlertSelected : false,
            masterGlobalAlertPartial : false
        };

        vm.globalGridData.gridOptions = {
            paginationPageSizes : [ 10, 20, 30 ],
            paginationPageSize : 30,
            useExternalPagination: true,
            minRowsToShow : 30,
            enablePaginationControls: false,
            selectAll: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect : false,
            noUnselect  : true,
            columnDefs : [
                  { field: 'name',displayName: "User name" },
                  { field: 'gender', cellFilter: 'mapGender' },
                  { field: 'company' },
                  { field: 'email' },
                  { field: 'phone' },
                  { field: 'age' },
                  { field: 'mixedDate' }
            ],
onRegisterApi : function(gridApi) {
    vm.globalGridData.gridApi = gridApi;
    gridApi.pagination.on.paginationChanged(null, vm.pageChanged);
    gridApi.selection.on.rowSelectionChanged(null, function(row) {
        vm.details.detailedDescription = row.entity.eventMessage;
        vm.details.eventSeverityType = vm.getSeverityIcon(row.entity.eventSeverityType);
        vm.details.domain = row.entity.eventSubCategoryName;
        vm.details.action = row.entity.eventRecommendedAction;
        vm.details.title = row.entity.eventMessageId;

    });
},
ignoreKeys: ['eventStatusType'],
    highlighter: function (rows, selectedRows) {
        var rowsToHighLight = [];
        var highLightedIds = _.map(selectedRows, 'id');
        _.each(highLightedIds, function (highLightedId) {
            rowsToHighLight.push(_.find(rows, {"id": highLightedId}));
        });
        return _.compact(rowsToHighLight);
    }
};

this.pageChanged = function (newPage, pageSize) {
    $log.log('Page changed', arguments);
    vm.getAlertsByFiltering(newPage, pageSize);
};

this.getSeverityIcon = function(severityType) {
 //   return iconfactory.getIcon(severityType);
};

this.getAlertsByFiltering = function(newPage, pageSize) {
    newPage = newPage || vm.globalGridData.gridOptions.paginationCurrentPage || 1;
    pageSize = pageSize || vm.globalGridData.gridOptions.paginationPageSize;
    var acknowledgeIds = vm.data.selectedAcknowledge === undefined || vm.data.selectedAcknowledge === null ? [] : [vm.data.selectedAcknowledge];
    var categoryIds = vm.data.selectedCategory === undefined || vm.data.selectedCategory === null ? [] : [vm.data.selectedCategory];
    var severityIds = vm.data.selectedSeverity === undefined || vm.data.selectedSeverity === null ? [] : [vm.data.selectedSeverity];
    return vm.bindAlertsByFiltering(vm.data.selectedDeviceIds, severityIds, categoryIds, acknowledgeIds, vm.data.dateStartObject, vm.data.dateEndObject, newPage, pageSize, null, vm.data.sourceName, vm.data.subCategory, vm.data.message);
};

this.bindAlertsByFiltering = function(deviceId, severityList, categoryList, acknowledgedIds, startDate, endDate,newPage, pageSize, eventId, sourceName, subCategory, message) {
    var params = "";
    for(var i=0; i<severityList.length;i++){
        params = params+"&severity="+severityList[i];
    }
    for(i=0; i<categoryList.length;i++){
        params = params+"&eventcategory="+categoryList[i];
    }
    for(i=0; i<deviceId.length;i++){
        params = params+"&deviceid="+deviceId[i];
    }
    for(i=0; i<acknowledgedIds.length; i++){
        params = params+"&acknowledge=" + acknowledgedIds[i];
    }
    if(startDate!==null && startDate!==undefined){
        params = params+"&starttime='"+moment(startDate).format()+"'";
    }
    if(endDate!==null && endDate!==undefined){
        var adjustedEndDate = angular.copy(endDate);
        adjustedEndDate.setHours(23);
        adjustedEndDate.setMinutes(59);
        adjustedEndDate.setSeconds(59);
        params = params+"&endtime='"+moment(adjustedEndDate).format()+"'";
    }
    if(eventId) {
        params = params + '&id=' + eventId;
    }
    if(sourceName){
        params = params + "&sourceName=" + sourceName;
    }
    if(subCategory){
        params = params + "&subCategory=" + subCategory;
    }
    if(message){
        params = params + "&message=" + message;
    }

    var url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
    var ajax =  $http.get(url);
    return ajax.then(function (response) {
        console.log(response)
        var data = response.data;
        vm.updateGridData(data);
        return data;
    });
};

this.updateGridData = function (data){
    if(!vm.globalGridData.gridOptions){
        return;
    }
    var displayedAlertIds = _.map(vm.globalGridData.gridOptions.data, "id");
    var responseAlertIds = _.map(data.alerts, "id");

    vm.calculateGlobalSelectedCount();
    vm.globalGridData.gridOptions.data = _.get(data, 'alerts', []);
    vm.globalGridData.gridOptions.totalItems = data.count;
};

this.calculateGlobalSelectedCount = function(){
    var tempCount = 0;
    for(var i=0; i<vm.globalGridData.gridOptions.data.length; i++){
        if(vm.globalGridData.gridOptions.data[i].enabled === true){
            tempCount += 1;
        }
    }
    if(tempCount > 0){
        if(tempCount === vm.globalGridData.gridOptions.data.length){
            vm.data.masterGlobalAlertSelected = true;
            vm.data.masterGlobalAlertPartial = false;
        }
        else{
            vm.data.masterGlobalAlertSelected = false;
            vm.data.masterGlobalAlertPartial = true;
        }
    }
    else{
        vm.data.masterGlobalAlertSelected = false;
        vm.data.masterGlobalAlertPartial = false;
    }
    vm.globalGridData.selectedCount = tempCount;
};

this.updateAcknowledge = function (ids, ackLevel) {
    if(ids.length === 0){
        return;
    }
   /* alertsDataService.updateAcknowledge(ids, ackLevel).then(function(){
       vm.getAlertsByFiltering();
    });
    */
};

this.getSelectedIds = function() {
    var ids = [];
    vm.globalGridData.gridOptions.data.forEach(function(entry) {
        if(entry.selected) {
            ids.push(entry.id);
        }
    });
    return ids;
};

this.acknowledgeAlert = function() {
    vm.updateAcknowledge(vm.getSelectedIds(), 1000);
};

this.unAcknowledgeAlert = function() {
    vm.updateAcknowledge(vm.getSelectedIds(), 2000);
};

this.ignoreAlert = function() {
    var selectedRows = _.filter(vm.globalGridData.gridOptions.data, {'selected': true});
    var payload = {};
    payload.categories = [];
    payload.subCategories = [];
    payload.name = $filter('translate')('modules.diagnostics.ignore') + " - " + moment().format('x');
    _.forEach(selectedRows, function(row){
        payload.categories.push(_.get(row, 'eventCategoryID'));
        payload.subCategories.push(_.get(row, 'eventSubCategoryID'));
    });
    payload.severities = _.uniq(_.map(selectedRows, 'eventSeverityType'));
    payload.devices = _.uniq(_.map(selectedRows, 'eventDeviceID'));
    payload.ignoreTemplateName = vm.ignoreTemplate.name;
    payload.ignoreTemplateId = vm.ignoreTemplate.id;
    //alertsDataService.createIgnoreAction(payload).then(function(){
    //    omeUtilityFactory.confirm($filter('translate')('modules.diagnostics.ignoreSaveSuccess'), 2500);
    //});
};



this.alertSeverityTable = {
    16:$filter('translate')('modules.device.alertStatus.critical'),
    2:$filter('translate')('modules.device.alertStatus.info'),
    8:$filter('translate')('modules.device.alertStatus.warning'),
    1:$filter('translate')('modules.device.alertStatus.unknown'),
    4:$filter('translate')('modules.device.alertStatus.normal'),
    32:$filter('translate')('modules.device.alertStatus.irrecoverable'),
    100:$filter('translate')('modules.device.alertStatus.interpreted')
};

this.alertExportProcessing = {
    eventSeverityType: function(entry, field){
        var statusNum = entry[field];
        var statusText = vm.alertSeverityTable[statusNum];
        return statusText;
    },
    eventStatusType : function(entry,field){
        var ack = entry.eventStatusType;
        if(ack === 1000){
            return $filter('translate')('modules.diagnostics.acknowledged');
        }else{
            return $filter('translate')('modules.diagnostics.unacknowledged');
        }
    },
    timeStamp : function(entry, field){
        return new Date(entry[field]).toString();
    }
};

this.processExportAllAlerts = function(selectedSeverityIds, selectedCategoryIds, acknowledgedIds, startDate, endDate){
    var params = "";
    params = params+"?take="+vm.globalGridData.gridOptions.totalItems;
    for(var i=0; i<selectedSeverityIds.length;i++){
        params = params+"&severity="+selectedSeverityIds[i];
    }
    for(var ii=0; ii<selectedCategoryIds.length;ii++){
        params = params+"&eventcategory="+selectedCategoryIds[ii];
    }
    for(i=0; i<acknowledgedIds.length; i++){
        params = params+"&acknowledge=" + acknowledgedIds[i];
    }
    if(startDate!==null && startDate!==undefined){
        params = params+"&starttime='"+moment(startDate).format('YYYY-MM-DD HH:MM:SS')+"'";
    }
    if(endDate!==null && endDate!==undefined){
        params = params+"&endtime='"+moment(endDate).format('YYYY-MM-DD HH:MM:SS')+"'";
    }
    var url = '' //json url

    gridExportService.exportAll(vm.globalGridData.gridOptions, $filter('translate')('modules.diagnostics.portalTabs.globalAlerts'), url, 'alerts', vm.alertExportProcessing);
};

this.exportSelectedAlerts = function(){
    gridExportService.exportSelected(vm.globalGridData.gridOptions, $filter('translate')('modules.diagnostics.portalTabs.globalAlerts'), vm.alertExportProcessing);
};

this.exportAllAlerts = function(){
    var acknowledgeIds = vm.data.selectedAcknowledge === undefined || vm.data.selectedAcknowledge === null ? [] : [vm.data.selectedAcknowledge];
    var categoryIds = vm.data.selectedCategory === undefined || vm.data.selectedCategory === null ? [] : [vm.data.selectedCategory];
    var severityIds = vm.data.selectedSeverity === undefined || vm.data.selectedSeverity === null ? [] : [vm.data.selectedSeverity];
    vm.processExportAllAlerts(severityIds, categoryIds, acknowledgeIds, vm.data.dateStartObject, vm.data.dateEndObject);
};

this.bindAlertIgnoreTemplate = function(data){
    vm.ignoreTemplate = _.find(data, {'name' : 'Ignore'});
};

this.deleteAlert = function() {
    //omeUtilityFactory.confirm2($filter('translate')('modules.device.deleteAlertConfirm'), function(){
    //    var ids = vm.getSelectedIds();
    //    var selectedEntry = _.find(vm.globalGridData.gridOptions.data, {'selected': true});
    //    alertsDataService.deleteAlerts(ids).then( function(){
    //        vm.details.detailedDescription = "";
    //        vm.details.eventSeverityType = "";
    //        vm.details.domain = "";
    //        vm.details.action = "";
    //        vm.details.title = "";
    //        vm.getAlertsByFiltering();
    //    });
    //});
};

this.scopeDestroy = function(){
    _.set(vm, "globalGridData.gridOptions.data", []);
    _.set(vm, 'details', {});
    _.set(vm, 'data', {});
};

};


angular.module('peshi').service('diagnosticsLogControllerService', diagnosticsLogControllerService);


})