define(function () { 
    var dashboardController = angular.module('template.controller', [])

    dashboardController.controller('DashboardController', ['$scope', '$http', 'AlertServices', 'CpModalService', 'MessageService', '$ocLazyLoad', 'ConsoleConstants', function ($scope, $http, AlertServices, CpModalService, MessageService, $ocLazyLoad, ConsoleConstants) {
        $scope.date = {}
        $scope.date.myDate = new Date().toDateString();
        $scope.hour = '10';
        $scope.user = {};
        $scope.user.gender = "male";
        $scope.user.country = 'Bruno';
        $scope.user.countries = [];
        $scope.imgPath = 'nsf_building_wilson.jpg'
        $scope.genderlist = {
            male: "Male",
            female: "Female",
            other: "Other"
        }
        $scope.selectData = [{ label: 'Bruno', value: 'Bruno' },
         { label: 'Carolina', value: 'Carolina' },
         { label: 'Danilo', value: 'Danilo' },
         { label: 'Eduarda', value: 'Eduarda' },
         { label: 'Eduarda', value: 'Eduarda' },
         { label: 'Fernando', value: 'Fernando' },
         { label: 'Gisele', value: 'Gisele' },
         { label: 'Hilton', value: 'Hilton' },
         { label: 'Inayara', value: 'Inayara' },
         { label: 'João', value: 'João' },
         { label: 'Kimberly', value: 'Kimberly' },
         { label: 'Leandro', value: 'Leandro' },
         { label: 'Maria Helena', value: 'Maria Helena' }
        ];

        $scope.chekcboxData = [{ label: 'Bruno', value: 'Bruno' },
          { label: 'Carolina', value: 'Carolina' },
          { label: 'Danilo', value: 'Danilo' },
          { label: 'Eduarda', value: 'Eduarda' }
        ];

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
        };

        /*"DeviceName": "OMEDEV-G",
		"EventCategoryName": "System Events",
		"EventSourceName": "omeAlertSystemDown",
		"SeverityString": "Critical",
		"StatusString": 1,
		"EventId": -2147483640,
		"Severity": 16,
		"Time": "\/Date(1464825826000+0530)\/",
		"Message": "System is down: OMEDEV-G",
		"EventCategoryId": 1411118992,
		"EventSourceId": 1815271349,
		"DeviceId": 147,
		"Status": 1,
		"SourceName": "10.94.146.181",
		"RowVersion": null*/
        var statusTemplate1 = '<div ng-class="grid.appScope.getSeverityIcon(row.entity.Severity)" style="font-size:16px; margin-top:6px;"></div>';
        //var statusTemplate = '<div ng-class="$scope.getSeverityIcon(row.entity.Severity)" style="font-size:16px; margin-top:6px;"></div>';
        $scope.gridOptions = {
            useExternalSorting: true,
            enableFiltering: false,
            enableSorting: false,
            enableColumnMenus: true,
            enableColumnResizing: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            enablePaginationControls: false,

            rowHeight: 35,

            modifierKeysToMultiSelect: false,
            noUnselect: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            columnDefs: [
              {
                  field: 'SeverityString',
                  displayName: "Severity",
                  "width": "8%",
                  "cellTemplate": '<div ng-if="row.entity.Severity == 16"><img src=resources/images/critical.png></div><div ng-if="row.entity.Severity == 4"><img src=resources/images/ok.png></div><div ng-if="row.entity.Severity == 8"><img src=resources/images/warning.png></div><div ng-if="row.entity.Severity == 8"><img src=resources/images/warning.png></div>',
                  "headerCellFilter": "translate",
                  "headerTooltip": true,
                  "cellClass": "text-center",
                  enableSorting: false,
              },
              { field: 'DeviceName', enableSorting: false },
              { field: 'EventCategoryName', enableSorting: false },
              { field: 'EventSourceName', enableSorting: false },
              {
                  field: 'Time',
                  type: 'date', cellFilter: 'date:\'MM/dd/yyyy HH:MM:ss\'',
                  enableSorting: false
              },
              { field: 'Message', enableSorting: false },
              { field: 'SourceName', enableSorting: false }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        paginationOptions.sort = null;
                    } else {
                        paginationOptions.sort = sortColumns[0].sort.direction;
                    }
                    getPage();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.pageNumber = newPage;
                    paginationOptions.pageSize = pageSize;
                    getPage();
                });
            }

        };

        $scope.getPage = function () {
            var url;


            $http.get(ConsoleConstants.apiPrefix + 'GetEventsRange_1?returnCount=10&offset=0')
              .success(function (data) {

                

                  for (var i = 0; i < data.GetEventsRange_1Result.length; i++) {
                      data.GetEventsRange_1Result[i].Time = new Date(parseInt(data.GetEventsRange_1Result[i].Time.substr(6)));

                      /*data.GetEventsRange_1Result[i].Severity = '<span class='+$scope.getSeverityIcon(data.GetEventsRange_1Result[i].Severity).'"></span>';
                      if (data.GetEventsRange_1Result[i].StatusString == 2)
                          data.GetEventsRange_1Result[i].StatusString = "ci ci-status-check-core";
                      else
                          data.GetEventsRange_1Result[i].StatusString = "ci";*/
                    }


                  $scope.gridOptions.totalItems = data.GetEventsRange_1Result.length;
                  var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                  $scope.gridOptions.data = data.GetEventsRange_1Result.slice(firstRow, firstRow + paginationOptions.pageSize);
              });

        };

        $scope.getPage();

        $scope.getSeverityIcon = function (severityType) {
            switch (severityType) {
                case 1:
                    return 'ci ci-status-unknown-core unknown';
                case 2:
                    return 'ci ci-nav-Info-core primary';
                case 4:
                    return 'ci ci-status-ok-core ok';
                case 8:
                    return 'ci ci-nav-warn-core warning';
                case 16:
                case 32:
                case 100:
                    return 'ci ci-nav-error-core error';
            }
        }


        
            var data = { "taskStatusType": 1, "timestamp": null };
            $.ajax({
                cache: false,
                type: 'POST',
                url: ConsoleConstants.apiPrefix + "GetTaskStatus",
                //set timeout to 20 seconds for ajax calls, will then generate a network exception error.
                timeout: 20000,
                data: JSON.stringify(data),
                async: false,
                crossDomain: true,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                tryCount: 0,
                retryLimit: 1,
                xhrFields: {
                    withCredentials: true
                },

                // {"GetEventCountByDeviceGroupResult":[{"Count":2,"Severity":8},{"Count":2,"Severity":16}]}
                success: function (response) {

                    for (var i = 0; i < response.GetTaskStatusResult.length; i++) {
                        //response.GetTaskStatusResult[i].StartTime = omcConverterFactory.getFormattedDate(response.GetTaskStatusResult[i].StartTime);
                        // response.GetTaskStatusResult[i].StartTime = omcConverterFactory.getFormattedDate(response.GetTaskStatusResult[i].StartTime);
                        response.GetTaskStatusResult[i].LastUpdated = new Date(parseInt(response.GetTaskStatusResult[i].LastUpdated.substr(6)));

                    }

                    $scope.recentActivity = {

                        "information":
                            [
                            { "message1": response.GetTaskStatusResult[0].Label, "message2": null, "date": response.GetTaskStatusResult[0].LastUpdated, "progress": response.GetTaskStatusResult[0].PercentComplete },
                                { "message1": response.GetTaskStatusResult[1].Label, "message2": null, "date": response.GetTaskStatusResult[1].LastUpdated, "progress": response.GetTaskStatusResult[1].PercentComplete },
                                { "message1": response.GetTaskStatusResult[2].Label, "message2": null, "date": response.GetTaskStatusResult[2].LastUpdated, "progress": response.GetTaskStatusResult[2].PercentComplete },
                                { "message1": response.GetTaskStatusResult[3].Label, "message2": null, "date": response.GetTaskStatusResult[3].LastUpdated, "progress": response.GetTaskStatusResult[3].PercentComplete },
                                { "message1": response.GetTaskStatusResult[4].Label, "message2": null, "date": response.GetTaskStatusResult[4].LastUpdated, "progress": response.GetTaskStatusResult[4].PercentComplete },
                                { "message1": response.GetTaskStatusResult[5].Label, "message2": null, "date": response.GetTaskStatusResult[5].LastUpdated, "progress": response.GetTaskStatusResult[5].PercentComplete }
                            ],
                        "count": 0
                    };

                },
                error: function (transport, textStatus) {
                    console.log(' TaskTypes fail ' + transport + '   ' + textStatus);

                }
            });
        

       // $scope.recentActivity = $scope.getTaskstatus();
        //console.log($scope.recentActivity);
        $scope.showAlert = function () {
            var promise = AlertServices.open("alert", {title: 'Alert', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry!" });
            promise.then(
                function handleResolve(response) {
                   // console.log("Alert resolved.");
                },
                function handleReject(error) {
                   // console.warn("Alert rejected!");
                }
            );
        }

        $scope.testAlert = function () {
            //there are four types of alert messages success, info, warning, danger
            var promise = AlertServices.open("alert", { message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", type: 'success', title: 'Alert' });
            promise.then(
                function handleResolve(response) {
                    //console.log("Alert resolved.");
                },
                function handleReject(error) {
                   // console.warn("Alert rejected!");
                }
            );
        }

        $scope.testConfirm = function () {

            var promise = AlertServices.open("confirm", { title: 'Confirm', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", labelConfirmBtn: 'Submit', labelCancelBtn: 'Cancel' });
            promise.then(
                function handleResolve(response) {
                    //console.log("Alert resolved.");
                },
                function handleReject(error) {
                    // console.warn("Alert rejected!");
                }
            );
        }

        $scope.showPrompt = function () {
            var promise = AlertServices.open("prompt", { title: '', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" });
            promise.then(
                function handleResolve(response) {
                   /// console.log("Alert resolved.");
                },
                function handleReject(error) {
                   // console.warn("Alert rejected!");
                }
            );
        }

        $scope.showModal = function () {
           // $ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
             //   CpModalService.open({
                //       title: 'User Settings', templateUrl: '/views/modals/modal.html'
             //   })
            //  });
            console.log('modal function is call')
        }

        $scope.addElement = function () {
             $ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
               CpModalService.open({
                   title: 'User Settings', templateUrl: '/views/modals/modal.html'
               })
             });
        }
        $scope.add = function () {
            console.log('add')
            CpModalService.reject()
        }
        


        $scope.$on('modalAddComponent', function (evt, data) {
            console.log(data);
        })



        $scope.showError = function (messageType) {
            MessageService.open(
                    {
                        message: "Lorem Ipsum is simply dummy text of the printing and!!",
                        timer: 5,
                        isAutoClose: false,
                        type: messageType  //success/info/error/warning 
                    }
                )
        }


        $scope.data = [{
            key: "Cumulative Return",
            values: [
				{ "label": "A", "value": 29.765957771107 },
				{ "label": "B", "value": 0 },
				{ "label": "C", "value": 32.807804682612 },
				{ "label": "D", "value": 196.45946739256 },
				{ "label": "E", "value": 0.19434030906893 },
				{ "label": "F", "value": 98.079782601442 },
				{ "label": "G", "value": 13.925743130903 },
				{ "label": "H", "value": 5.1387322875705 }
            ]
        }];
        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.pie_chart_options = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.donut_chart_options = {
            chart: {
                type: 'pieChart',
                height: 450,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,

                pie: {
                    startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
                    endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 140,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.pie_chart_data = [
            {
                key: "Critical",
                y: 5
            },
            {
                key: "Warning",
                y: 2
            },
            {
                key: "Normal",
                y: 9
            },
            {
                key: "Unknown",
                y: 7
            },
            {
                key: "Info",
                y: 4
            }
        ];






    }]);
    
    dashboardController.controller('PopUpController', ['$scope', 'CpModalService', function ($scope, CpModalService) {

        $scope.findUsers = function () {
            CpModalService.open(
               {
                   title: 'Find Users', templateUrl: '/views/component/tab.html'
               }
           )
        }

       

    }])


})
