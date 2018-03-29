define(function () {
    var deviceModule = angular.module('peshi');
    deviceModule.registerController('DeviceController', ['$scope', '$state', '$location', function ($scope, $state, $location) {

        $scope.deviceTabs = [{ label: 'Alert Log', link: 'device.alertLog' },
          { label: 'Alert Policy', link: 'device.alertprivacy' },
          { label: 'Alert Definitation', link: 'device.alertdefinition' }
        ];

        //derfault load firt tab
        var path = $location.path();
        if (path == '/device') {
            $state.go('device.alertLog');
        }
       



    }])





})