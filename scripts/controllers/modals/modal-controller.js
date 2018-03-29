//modal controller module 
var tabModule = angular.module('peshi');
tabModule.controller('ModalController', ['$scope', 'close', 'ModalService', function ($scope, close, ModalService) {
    // alert('controller is loaded');
    $scope.modalName = 'PROFILE';

    $scope.add = function () {
        $scope.$emit('modalAddComponent', { company: 'Dell', aa: {}});
        $scope.user = { name: ' ' };
        CpModalService.reject();
        
    }
    $scope.dismissModal = function () {
        close('pass data on main parent controller', 200);
    }

    $scope.testPanel = function () {
        alert('select panel ')
    }
    $scope.user = {};
    $scope.user.name = 'adasdadad';

    $scope.editModal = function () {
        console.log('open edit modal')
        //below commented the $ocLazyload becase we are not calling the controller.
        //$ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
            ModalService.showModal({
                templateUrl: "/views/modals/editmodal.html",
                controller:'EditController'
            }).then(function (modal) {
                // modal.element.modal();
                modal.close.then(function (result) {
                    //this section will execute when close the modal
                });
            });

        //});

    }


}])


tabModule.controller('EditController', ['$scope', 'close', function ($scope, close) {
    $scope.dismissModal = function () {
        close('pass data on main parent controller', 200);
    }

}])


