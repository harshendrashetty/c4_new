
define(function () {
    var deploymentModule = angular.module('peshi');

    deploymentModule.registerController('DeploymentController', ['$scope', 'WizardService', '$rootScope', 'ProgressService', '$timeout', function ($scope, WizardService, $rootScope, ProgressService, $timeout) {

        $scope.wizardConfig = {
            title: 'Wizard Title',
            description: 'Wizard modal description',
            icon: '',
            wizards:[      
                 { header: 'Name & Description', controller:'ProfileController',  view: 'views/wizards/form-profile.html' },
                 { header: 'Device', view: 'views/wizards/form-interests.html' },
                 { header: 'Date and Time', view: 'views/wizards/form-profile.html' }
            ],

        }

        $scope.showWizard = function () {
          /*  ProgressService.open();

            $timeout(function () {

                ProgressService.close();

            }, 5000)*/

            //WizardService(wizardConfig).open();

        }

        $rootScope.$on('wizard.close', function (evt, data) {
            console.log(data)
        });


   }])


})
