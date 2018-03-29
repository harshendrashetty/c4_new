define(function () { 
    var homeController = angular.module('template.controller', [])

    homeController.controller('HomeController', ['$scope', 'AlertServices', 'CpModalService', 'MessageService', '$ocLazyLoad', function ($scope, AlertServices, CpModalService, MessageService, $ocLazyLoad) {
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
    }]);
    
    homeController.controller('PopUpController', ['$scope', 'CpModalService', function ($scope, CpModalService) {

        $scope.findUsers = function () {
            CpModalService.open(
               {
                   title: 'Find Users', templateUrl: '/views/component/tab.html'
               }
           )
        }

       

    }])


})
