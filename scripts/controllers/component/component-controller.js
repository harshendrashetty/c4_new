
define(function () {
    var componentModule = angular.module('peshi');

    componentModule.registerController('ComponentController', ['$scope', '$http', 'AlertServices', 'CpModalService', 'MessageService', '$ocLazyLoad', 'ModalService', 'uiGridConstants', 'gridService', 'utilityService', 'ProgressService', '$timeout', 'WizardService', '$rootScope', 'validateform', function ($scope, $http, AlertServices, CpModalService, MessageService, $ocLazyLoad, ModalService, uiGridConstants, gridService, utilityService, ProgressService, $timeout, WizardService, $rootScope, validateform) {

        $scope.date = {}
        $scope.date.myDate = new Date().toDateString();
        $scope.hour = '10';
        $scope.minute = '10';
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
        $scope.select_dropdown_Data = [{ label: 'Bruno', value: 'Bruno' },
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

        $scope.treeModel = [
            { "id": "ajson1", "parent": "#", "text": "Simple root node" },
            { "id": "ajson2", "parent": "#", "text": "Root node 2" },
            { "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
            { "id": "ajson4", "parent": "ajson2", "text": "Child 2" },
            { "id": "ajson5", "parent": "ajson1", "text": "Child 3" }
        ]

        $scope.deviceLeftNavigation = [
           { label: 'Discovery Portal', link: '#', id: 'home', subMenu: [] },
           { label: 'Add Discovery Range', link: '#', id: 'a', subMenu: [] },
           { label: 'Add Exclude Range', link: '#', id: 'b', subMenu: [] },
           { label: 'Discovery Schedule', link: '#', id: 'c', subMenu: [] },
           { label: 'Inventory Schedule', link: '#', id: 'd', subMenu: [] },
           { label: 'Status Schedule', link: '#', id: 'e', subMenu: [] },
           { label: 'Discovery Range', link: '#', id: 'f', subMenu: [] },
           { label: 'Exclude Range', link: '#', id: 'g', subMenu: [] },
        ];

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
        };

        $scope.globalGridData = {};
        $scope.globalGridData.gridId = "globalAlertsGrid";
        $scope.globalGridData.selectedCount = 0;
        $scope.data = {};
        $scope.globalGridData.selectedUser = {};

        $scope.globalGridData2 = {};
        $scope.globalGridData2.gridId = "globalAlertsGrid2";
        $scope.globalGridData2.selectedCount = 0;
        $scope.globalGridData2.selectedUser = {};


        $scope.selectedGridOptions = [];
        $scope.advancedFiltersToggle = true;
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
        };

        $scope.globalGridData.gridOptions = {
            useExternalSorting: true,
            enableFiltering: false,
            enableSorting: true,
            enableColumnMenus: true,
            enableColumnResizing: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            enablePaginationControls: false,
            //enableRowHeaderSelection: false,
            //multiSelect: false,
            //enableRowSelection: true,
            //enableSelectAll: true,
            //selectionRowHeaderWidth: 35,
            rowHeight: 35,

            modifierKeysToMultiSelect: false,
            noUnselect: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            // enableSelectAll: true,

            columnDefs: [
                {
                    field: 'selected',
                    displayName: "",
                    width: "3%",
                    cellTemplate: "<input type='checkbox' ng-model='row.entity.enabled' ng-click='grid.appScope.calculateGlobalSelectedCount()'/>",
                    headerCellTemplate: "<input type='checkbox' ng-model='grid.appScope.data.masterGlobalAlertSelected' ng-click='grid.appScope.toggleAllAlerts()'/>",
                    cellClass: "text-center",
                    headerCellClass: "text-center"
                },
              {
                  field: 'name', displayName: "User name", cellTooltip: function (row, col) {
                      return row.entity.name;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  enableSorting: true
              },
                  {
                      field: 'gender', cellTooltip: function (row, col) {
                          return row.entity.gender;
                      }, headerTooltip: function (col) {
                          return col.displayName;
                      }
                  },
              {
                  field: 'company', cellTooltip: function (row, col) {
                      return row.entity.company;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  }
              },
              {
                  field: 'email', cellTooltip: function (row, col) {
                      return row.entity.email;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  enableSorting: true
              },
              {
                  field: 'phone',
                  cellTooltip: function (row, col) {
                      return row.entity.phone;
                  },
                  headerTooltip: function (col) {
                      return col.displayName;
                  }
              },
              {
                  field: 'age',
                  displayName: 'Status',
                  cellTooltip: function (row, col) {
                      return row.entity.age;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  cellTemplate: '<div ng-class="grid.appScope.getSeverityIcon(row.entity.age)"><img ng-src="" style="font-size:16px; margin-top:6px;"/></div>'
              },
              {
                  field: 'age',
                  displayName: 'Status',
                  cellTooltip: function (row, col) {
                      return row.entity.age;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  cellTemplate: '<img src="{{grid.appScope.getSeverityImage(row.entity.age)}}" title="Status"/>',
                  cellClass: "text-center",
                  headerCellClass: "text-center"
              }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                 $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                     if (sortColumns.length == 0) {
                         paginationOptions.sort = null;
                     } else {
                         paginationOptions.sort = sortColumns[0].sort.direction;
                     }
                     console.log(sortColumns[0].sort.direction);
                     getPage();
                 });
                //single selections
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.globalGridData.selectedUser = row.entity;
                });
                //batch row selections 
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'rows changed ' + rows.length;
                    console.log(rows);
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.pageNumber = newPage;
                    console.log("Page No - " + newPage);
                    console.log("Page Size - " + pageSize);
                    paginationOptions.pageSize = pageSize;
                    getPage();
                });
                $scope.selectedColumn = ''
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length) {
                        var name = sortColumns[0].name; // the name of the first column sorted
                        $scope.selectedColumn = sortColumns[0].name
                        var direction = sortColumns[0].sort.direction
                    } else {
                    }
                });
            }

        };

        var getPage = function () {
            var url;
            switch (paginationOptions.sort) {
                case uiGridConstants.ASC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                    break;
                case uiGridConstants.DESC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                    break;
                default:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                    break;
            }

            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
              .success(function (data) {
                  console.log(data)
                  $scope.globalGridData.gridOptions.totalItems = 78;
                  var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                  $scope.globalGridData.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                  
                  //select first row default when load on the browser.
                  $scope.gridApi.grid.modifyRows($scope.globalGridData.gridOptions.data);
                  $scope.gridApi.selection.selectRow($scope.globalGridData.gridOptions.data[0]);


                  // gridService.setModelData($scope.globalGridData.gridOptions.data)
                 

              });

        }

        getPage();

        $scope.filter = function () {
            $scope.gridApi.grid.refresh();
        };
        
        $scope.showFilter = function () {
            $scope.advancedFiltersToggle = !$scope.advancedFiltersToggle;
        }
        $scope.clearFilterform = function () {
            console.log('clear filter form');
        }

        $scope.calculateGlobalSelectedCount = function () {
            $scope.globalGridData.selectedCount = gridService.getSelectedCount($scope.globalGridData.gridOptions.data)
        };
        $scope.calculateGlobalSelectedCount2 = function () {
            $scope.globalGridData2.selectedCount = gridService.getSelectedCount($scope.globalGridData2.gridOptions.data)
        };
        $scope.toggleAllAlerts = function () {
            gridService.toggleSelectAll($scope.globalGridData.gridOptions.data, $scope.data.masterGlobalAlertSelected).then(function (count) {
                $scope.globalGridData.selectedCount = count;
            })
        };
        $scope.toggleAllAlerts2 = function () {
            gridService.toggleSelectAll($scope.globalGridData2.gridOptions.data, $scope.data.masterGlobalAlertSelected2).then(function (count) {
                $scope.globalGridData2.selectedCount = count;
            })
        };
        $scope.getSelectedIds = function () {
            return gridService.getSelectedIds($scope.globalGridData.gridOptions.data)
        };

        $scope.getSeverityIcon = function (severityType) {
            return utilityService.getSeverityClass(severityType)
        }
        $scope.getSeverityImage = function (severityType) {
            return utilityService.getSeverityImage(severityType)
        }


        

        $scope.globalGridData2.gridOptions = {
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
            // enableSelectAll: true,

            columnDefs: [
                {
                    field: 'selected',
                    displayName: "",
                    width: "3%",
                    cellTemplate: "<input type='checkbox' ng-model='row.entity.enabled' ng-click='grid.appScope.calculateGlobalSelectedCount()'/>",
                    headerCellTemplate: "<input type='checkbox' ng-model='grid.appScope.data.masterGlobalAlertSelected' ng-click='grid.appScope.toggleAllAlerts()'/>",
                    cellClass: "text-center",
                    headerCellClass: "text-center"
                },
              {
                  field: 'name', displayName: "User name", cellTooltip: function (row, col) {
                      return row.entity.name;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  enableSorting: true
              },
                  {
                      field: 'gender', cellTooltip: function (row, col) {
                          return row.entity.gender;
                      }, headerTooltip: function (col) {
                          return col.displayName;
                      }
                  },
              {
                  field: 'company', cellTooltip: function (row, col) {
                      return row.entity.company;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  }
              },
              {
                  field: 'email', cellTooltip: function (row, col) {
                      return row.entity.email;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  enableSorting: true
              },
              {
                  field: 'phone',
                  cellTooltip: function (row, col) {
                      return row.entity.phone;
                  },
                  headerTooltip: function (col) {
                      return col.displayName;
                  }
              },
              {
                  field: 'age',
                  displayName: 'Status',
                  cellTooltip: function (row, col) {
                      return row.entity.age;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  cellTemplate: '<div ng-class="grid.appScope.getSeverityIcon(row.entity.age)"><img ng-src="" style="font-size:16px; margin-top:6px;"/></div>'
              },
              {
                  field: 'age',
                  displayName: 'Status',
                  cellTooltip: function (row, col) {
                      return row.entity.age;
                  }, headerTooltip: function (col) {
                      return col.displayName;
                  },
                  cellTemplate: '<img src="{{grid.appScope.getSeverityImage(row.entity.age)}}" title="Status"/>',
                  cellClass: "text-center",
                  headerCellClass: "text-center"
              }
            ],
            onRegisterApi: function (gridApi2) {
                $scope.gridApi2 = gridApi2;
                /* $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                     if (sortColumns.length == 0) {
                         paginationOptions.sort = null;
                     } else {
                         paginationOptions.sort = sortColumns[0].sort.direction;
                     }
                     getPage();
                 });*/

                //single selections

               


                gridApi2.selection.on.rowSelectionChanged($scope, function (row) {
                    console.log('row ')
                    console.log(row);
                    $scope.globalGridData2.selectedUser = row.entity;
                });
                //batch row selections 
                gridApi2.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'rows changed ' + rows.length;
                    console.log(rows);
                });
                gridApi2.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.pageNumber = newPage;
                    console.log("Grid2 Page No - " + newPage);
                    console.log("Grid2 Page Size - " + pageSize);
                    paginationOptions.pageSize = pageSize;
                    getPage2();
                });

                $scope.selectedColumn = ''

                gridApi2.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length) {
                        var name = sortColumns[0].name; // the name of the first column sorted
                        $scope.selectedColumn = sortColumns[0].name
                        var direction = sortColumns[0].sort.direction
                    } else {

                        //default soft

                    }
                });
            }

        };



        var getPage2 = function () {
            var url;
            switch (paginationOptions.sort) {
                case uiGridConstants.ASC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                    break;
                case uiGridConstants.DESC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                    break;
                default:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                    break;
            }

            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
              .success(function (data) {
                  console.log(data)
                  $scope.globalGridData2.gridOptions.totalItems = 78;
                  var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                  $scope.globalGridData2.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                  // gridService.setModelData($scope.globalGridData.gridOptions.data)
                  //select first row default when load on the browser.
                  $scope.gridApi2.grid.modifyRows($scope.globalGridData2.gridOptions.data);
                  $scope.gridApi2.selection.selectRow($scope.globalGridData2.gridOptions.data[0]);

              });

        }

        getPage2();



        $scope.showAlert = function () {
            var promise = AlertServices.open("alert", { title: 'Alert', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry!" });
            promise.then(
                function handleResolve(response) {
                },
                function handleReject(error) {
                }
            );
        }

        $scope.openAlert = function () {
            var promise = AlertServices.open("alert", { message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", type: 'success', title: 'Alert' });
            promise.then(
                function handleResolve(response) {
                },
                function handleReject(error) {
                }
            );
        }

        $scope.openConfirm = function () {
            var promise = AlertServices.open("confirm", { title: 'Confirm', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", labelConfirmBtn: 'Submit', labelCancelBtn: 'Cancel' });
            promise.then(
                function handleResolve(response) {
                },
                function handleReject(error) {
                }
            );
        }

        $scope.showPrompt = function () {
            var promise = AlertServices.open("prompt", { title: '', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" });
            promise.then(
                function handleResolve(response) {
                },
                function handleReject(error) {
                }
            );
        }
        $scope.openModal = function () {
            $ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
                ModalService.showModal({
                    templateUrl: "/views/modals/modal.html",
                    controller: "ModalController"                      
                }).then(function (modal) {
                    // modal.element.modal();
                    modal.close.then(function (result) {
                        //this section will execute when close the modal
                    });
                });
            });
        }

        //Progress open method
        $scope.openProgress = function () {
            ProgressService.open();
            $timeout(function () {
                ProgressService.close();
            }, 1000)

        }

        //Progress open method
        $scope.wizardConfig = {
            title: 'Wizard Title',
            description: 'Wizard modal description',
            icon: '',
            wizards: [
                 { header: 'Name & Description', controller: 'ProfileController', view: 'views/wizards/form-profile.html' },
                 { header: 'Device', view: 'views/wizards/form-interests.html' },
                 { header: 'Date and Time', view: 'views/wizards/form-profile.html' }
            ],

        }
        $scope.openWizard = function () {
            WizardService.setConfig($scope.wizardConfig).open();
        }
        //call the "wizard.close" when close the wizard.
        $rootScope.$on('wizard.close', function (evt, data) {
            console.log(data)
        });

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
                        type: messageType,  //success/info/error/warning 
                        id: 'globalerrormessage'
                    }
                )
        }

        $scope.data = [{
            key: "Cumulative Return",
            values: [
				{ "label": "Server", "value": 150 },
				{ "label": "CMC", "value": 78 },
				{ "label": "Unclassified", "value": 352 },
				/*{ "label": "D", "value": 196.45946739256 },
				{ "label": "E", "value": 0.19434030906893 },
				{ "label": "F", "value": 98.079782601442 },
				{ "label": "G", "value": 13.925743130903 },
				{ "label": "H", "value": 5.1387322875705 }*/
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
                    //return d3.format(',.4f')(d);
                    return d;
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Devices Discovered'
                },
                yAxis: {
                    //axisLabel: 'Y Axis',
                    axisLabel: '',
                    axisLabelDistance: 30,
                    tickFormat: function (d) {
                        return d;
                    },
                    valueFormat: function (d) {
                        //return d3.format(',.4f')(d);
                        return d;
                    }
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
                },
                valueFormat: function (d) {
                    return d3.format(',.0f')(d);
                }
            }
        };
        //chart.yAxis.tickFormat(d3.format(',f'));
        // chart.valueFormat(d3.format('f'))// <--- This
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
                },
                valueFormat: function (d) {
                    return d3.format(',.0f')(d);
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


        $scope.settingOptions = [{ label: 'Aplication', link: 'settings.application' },
         { label: 'Device', link: '#' },
         { label: 'Log', link: '#' },
         { label: 'Job', link: '#' },
         { label: 'Search', link: '#' },
         { label: 'System', link: '#' },
         { label: 'Alerts', link: '#' },
         { label: 'Policy', link: '#' },
         { label: 'Config', link: '#' }
        ];


        $scope.callme = function () {
            alert('clicked ')
        }

        $scope.getSelectedTab = function (tab) {
            console.log(tab.id)

        }

        $scope.submit = function () {
            var min = 10;
            var max = 60;
            var userNamePattern = /^[A-Za-z0-9 ]{3,20}$/;
            var passwordPattern = /^[A-Za-z0-9 ]{3,20}$/;
            var errorMessages = '';
            if (validateform.requireValidate($scope.username) == false) {
                errorMessages += 'User name is required.' + "<br/>"
            }

            if (validateform.patternValidate($scope.username, userNamePattern) == false) {
                errorMessages += 'The user name pattern is not matching  <br/>';
            }

            if (validateform.passwordValidate($scope.userpassword, passwordPattern) == false) {
                errorMessages += 'Please enter correct password <br/>';
            }
            if (validateform.minValidate($scope.userage, min) == false) {
                errorMessages += 'The user age should be more than ' + min + "<br/>";
            }
            if (validateform.maxValidate($scope.userage, max) == false) {
                errorMessages += 'The user age should be less than ' + max + "<br/>";
            }
            if (validateform.emailValidate($scope.useremail) == false) {
                errorMessages += 'Please provide the valid email id <br/>';
            }
            if (validateform.ipValidate($scope.userip) == false) {
                errorMessages += 'Please provide valid IP address <br/>';
            }
            if (validateform.urlValidate($scope.userurl) == false) {
                errorMessages += 'Please enter valid URL <br/>';
            }

            if (errorMessages.length > 0) {
                MessageService.open(
                   {
                       message: errorMessages,
                       timer: 5,
                       isAutoClose: false,
                       type: 'error',  //success/info/error/warning 
                       id:'test1'
                   }
               )
            }
           
            

        }

        $scope.submitForm = function () {
            MessageService.open(
                   {
                       message: "Test error message",
                       timer: 5,
                       isAutoClose: false,
                       type: 'error',  //success/info/error/warning
                       id:'test2'
                   }
               )

        }



        //tree Part
        $scope.openNode = function () {
            var $treeview = $("#using_json");
            $treeview.jstree('open_all');
        }


        $scope.closeNode = function () {
            var $treeview = $("#using_json");
            $treeview.jstree('close_all');
        }
        $('#using_json').on("changed.jstree", function (e, data) {
            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push(data.instance.get_node(data.selected[i]).id);
            }
            $('#event_result').html('<br><b>Selected Group ID:</b> ' + r.join(', '));
        });

        $('#using_json').jstree(
		{
		    'core': {
		        "animation": 5,
		        //"themes" : { "stripes" : true },
		        'data': [
                            {
                                'text': '<b>All Devices</b>',
                                "icon": "",
                                "id": -1,
                                'state': {
                                    'opened': true,
                                    'selected': true
                                },
                                'children': [
                                   { 'text': 'Citrix XenServers', "icon": "resources/images/ok.png", "id": 1 },
                                   {
                                       'text': 'Clusters',
                                       "icon": "resources/images/critical.png",
                                       "id": 2,
                                       'state': {
                                           'opened': false,
                                           'selected': false
                                       }

                                   },
                                   {
                                       'text': 'Clusters',
                                       "id": 3,
                                       "icon": "resources/images/ok.png",
                                       'state': {
                                           'opened': false,
                                           'selected': false
                                       }

                                   },
                                   { 'text': "KVM", "icon": "resources/images/critical.png", "id": 4, },
                                   { 'text': "Microsoft Virtualization", "icon": "resources/images/ok.png", "id": 5 },
                                   {
                                       'text': 'Modular Systems',
                                       "icon": "resources/images/critical.png",
                                       'state': {
                                           'opened': false,
                                           'selected': false
                                       },
                                       'children': [
                                         {
                                             'text': 'Power Edge Chassis',
                                             "icon": "resources/images/warning.png",
                                             'children':
                                             [
                                                 { 'text': 'cmc-BTYDR2_Chassis', "icon": "resources/images/ok.png" },
                                                 { 'text': 'cmc-CT3YY42_Chassis', "icon": "resources/images/warning.png" }
                                             ],
                                         },
                                         { 'text': 'PowerEdge Fx2', "icon": "resources/images/ok.png" },
                                         { 'text': 'PowerEdge M1000e', "icon": "resources/images/critical.png" },
                                         { 'text': 'PowerEdge VRTX', "icon": "resources/images/critical.png" }

                                       ],
                                   },
                                    { 'text': 'OEM Devices', "icon": "resources/images/critical.png" },
                                   {
                                       'text': 'OOB Unclassfied Devices',
                                       "icon": "resources/images/warning.png",
                                       'state': {
                                           'opened': false,
                                           'selected': false
                                       },
                                       'children': [
                                         { 'text': 'IPMI Unclassfied Devices', "icon": "resources/images/ok.png" }

                                       ],
                                   },
                                   {
                                       'text': 'Power Devices',
                                       "icon": "resources/images/ok.png",
                                       'state': {
                                           'opened': false,
                                           'selected': false
                                       },
                                       'children': [
                                         { 'text': 'PDU', "icon": "resources/images/critical.png" },
                                         { 'text': 'UPS', "icon": "resources/images/ok.png" }
                                       ],
                                   },

                               { 'text': 'PowerEdge c Servers', "icon": "resources/images/critical.png" },
                               { 'text': 'Repurpose and Bare Metal', "icon": "resources/images/ok.png" },
                               { 'text': 'Servers', "icon": "resources/images/ok.png" },
                               {
                                   'text': 'Storage Devices',
                                   "icon": "resources/images/warning.png",
                                   'state': {
                                       'opened': false,
                                       'selected': false
                                   },
                                   'children': [
                                     { 'text': 'Dell Compellent Arrays', "icon": "resources/images/ok.png" },
                                     { 'text': 'Dell EqualLogic Groups', "icon": "resources/images/critical.png" },
                                     { 'text': 'Dell NAS Appliances', "icon": "resources/images/ok.png" },
                                     { 'text': 'Dell NAS Appliances', "icon": "resources/images/critical.png" },
                                     { 'text': 'PowerVault MD Arrays', "icon": "resources/images/critical.png" },
                                     { 'text': 'Tape Devices', "icon": "resources/images/ok.png" },

                                   ],
                               },
                               { 'text': 'Unknown', "icon": "resources/images/critical.png", 'id': 100 },
                               { 'text': 'VMware ESX Servers', "icon": "resources/images/ok.png", 'id': 101 }
                                ],


                            }
		        ]
		    }
		}
		);




    }]);

    componentModule.controller('PopUpController', ['$scope', 'CpModalService', function ($scope, CpModalService) {

        $scope.findUsers = function () {
            CpModalService.open(
               {
                   title: 'Find Users', templateUrl: '/views/component/tab.html'
               }
           )
        }



    }])


})

