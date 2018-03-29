define(function () {
    var constantModule = angular.module('constant.module', []);
    constantModule.constant('ConsoleConstants',
            {

                prefix: {
                    controller: 'data/modules/',
                    javaController: 'api',
                    consoleController: 'api/Console'
                },
                apiPrefix: "https://100.96.22.147:14618/OMEService/dataservice.svc/json/"
                
            });


});
