define(function () {
    var formModule = angular.module('peshi')
    formModule.registerController('FormController', ['$scope', 'AlertServices', function ($scope, AlertServices) {
        $scope.user = {};
        $scope.user.gender = "male";
        $scope.user.country = 'Bruno';
        $scope.user.countries = [];
        $scope.changeEvent = function (event) {
            //console.log('working');
        }
        $scope.change = function (event) {
            // console.log('test change')
        }
        $scope.submit = function () {
            //angular.alert('custom event')
            alert("Custom function call");
        };
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

        $scope.showSelectbox = true;

        $scope.showAlert = function () {
            var promise = AlertServices.open("alert", { message: "I think you are kind of beautiful!" });
            promise.then(
                function handleResolve(response) {
                    console.log("Alert resolved.");
                },
                function handleReject(error) {
                    console.warn("Alert rejected!");
                }
            );
        }
    }]);


})