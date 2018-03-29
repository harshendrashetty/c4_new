define(function () {
    var alertLogModule = angular.module('peshi');

    alertLogModule.registerController('AlertlogController', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
        var today = new Date();

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
        };


        $scope.gridOptions = {
            enableFiltering: false,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
              { field: 'name', displayName: "User name", enableSorting: false},
              { field: 'gender', enableSorting: false},
              { field: 'company', enableSorting: false},
              { field: 'email', enableSorting: false},
              { field: 'phone', enableSorting: false},
              { field: 'age', enableSorting: false},
              { field: 'mixedDate', enableSorting: false}
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

        var getPage = function () {
            var url;
           /* switch (paginationOptions.sort) {
                case uiGridConstants.ASC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                    break;
                case uiGridConstants.DESC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                    break;
                default:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                    break;
            } */

            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
              .success(function (data) {
                  $scope.gridOptions.totalItems = 100;
                  var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                  $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
              });

        }

        getPage();

        $scope.filter = function () {
            $scope.gridApi.grid.refresh();
        };
        /*
        $scope.singleFilter = function (renderableRows) {
            var matcher = new RegExp($scope.filterValue);
            renderableRows.forEach(function (row) {
                var match = false;
                ['name', 'company', 'email'].forEach(function (field) {
                    if (row.entity[field].match(matcher)) {
                        match = true;
                    }
                });
                if (!match) {
                    row.visible = false;
                }
            });
            return renderableRows;
        };
        */

    }]);

    alertLogModule.filter('mapGender', function () {
        var genderHash = {
            1: 'male',
            2: 'female'
        };

        return function (input) {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        };
    });
    


})