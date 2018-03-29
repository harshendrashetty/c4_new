define(function () {
    var manageModule = angular.module('peshi');

    manageModule.registerController('ManageController', ['$scope', "ModalService", '$ocLazyLoad', function ($scope, ModalService,  $ocLazyLoad) {
        $scope.wizardConfig = [
            { header: 'Wizard 1', description: 'description 1', view: 'views/wizards/form-profile.html' },
            { header: 'Wizard 2', description: 'description 2', view: 'views/wizards/form-interests.html' },
            { header: 'Wizard 3', description: 'description 3', view: 'views/wizards/form-payment.html' },
            { header: 'Wizard 4', description: 'description 4', view: 'views/wizards/form-profile.html' }
        ]

        $scope.forms = {};

        $scope.manage = 'Manage page'


        $scope.openWizard = function () {


            //console.log('wizard is opened')
           // WizardService.open({})
            //ModalService.open()
    
            // Just provide a template url, a controller and call 'showModal'.

            //$ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
            //    ModalService.showModal({
            //        templateUrl: "views/modals/modal.html",
            //        controller: "ModalController",
            //    }).then(function (modal) {
            //        //modal.element.modal();
            //        modal.close.then(function (result) {
            //            $scope.message = result ? "You said Yes" : "You said No";
            //        });
            //    });
            //});
           



        }

        
    }])

    
})
