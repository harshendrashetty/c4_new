    //modal controller module 
    var tabModule = angular.module('peshi');
    tabModule.controller('WizardController', ['$scope', '$element', 'close', function ($scope, $element, close) {
        // alert('controller is loaded');
        $scope.wizardConfig = [
             {title:'' header: 'Wizard 1', description: 'description 1', view: 'views/wizards/form-profile.html' },
             { header: 'Wizard 2', description: 'description 2', view: 'views/wizards/form-interests.html' },
             { header: 'Wizard 3', description: 'description 3', view: 'views/wizards/form-payment.html' },
             { header: 'Wizard 4', description: 'description 4', view: 'views/wizards/form-profile.html' }
        ]

        $scope.forms = {};
        $scope.wizardSteps = $scope.wizardConfig;
        $scope.wizard = {};
        $scope.wizard.index = 0;
        $scope.viewedPages = [0];
        $scope.openWizard = false;

        function checkNextMove(index) {

            console.log('target ' + index + ' sekected '  + $scope.wizardForm['step' + $scope.wizard.index].$valid)



            if (index < $scope.wizard.index) {
                return true;
            } else if (index > $scope.wizard.index && $scope.wizardForm['step' + (index - 1)].$valid == true) {
               // console.log('target ' + index + ' sekected ' + $scope.wizard.index + ' current ' + $scope.wizardForm['step' + (index - 1)].$valid)
                return true;
            } else {

                return false;

            }
        }

        $scope.notGoodToFinish = function () {
            if ($scope.wizard.index != $scope.wizardSteps.length - 1) {
                return true;
            } else {
                return false
            }
        };

        $scope.next = function () {
            $scope.wizard.index = $scope.wizard.index + 1;
            if ($scope.viewedPages.indexOf($scope.wizard.index) == -1) {
                $scope.viewedPages.push($scope.wizard.index)
            }
        }
        $scope.previous = function () {
            $scope.wizard.index = $scope.wizard.index - 1;
        }

        $scope.selectStep = function (index) {
            if ($scope.viewedPages.indexOf(index) >= 0 && checkNextMove(index)) {
                $scope.wizard.index = index;
            } else if (index == ($scope.wizard.index + 1) && $scope.viewedPages.indexOf(index) < 0) {
                $scope.wizard.index = $scope.wizard.index + 1;
                if ($scope.viewedPages.indexOf($scope.wizard.index) == -1) {
                    $scope.viewedPages.push($scope.wizard.index)
                }
            }
        }

        $scope.dismissModal = function () {
            close('close', 200)
        }


}])




