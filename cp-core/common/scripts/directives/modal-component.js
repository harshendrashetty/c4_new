define(function () { 
    var alertComponent = angular.module('alertmodal.component', []);

    alertComponent.controller("AlertModalController", ['$scope', 'AlertServices', function ($scope, AlertServices) {
        var params = AlertServices.params();
        $scope.message = (params.message || "");
        $scope.title = params.title || "Alert";
        if (params.icon) {
            $scope.icon = params.icon;
        } else {
            $scope.icon = 'check-circle';
        }
        $scope.close = AlertServices.resolve;
        //add the class as per alert type
        $scope.jumpToConfirm = function () {
            AlertServices.proceedTo("confirm", {
                message: "I just came from Alert - doesn't that blow your mind?",
                confirmButton: "Eh, maybe a little",
                denyButton: "Oh please"
                }
            )
            .then(
                function handleResolve() {
                },
                function handleReject() {
                }
            );
        };
        }
    ])

    alertComponent.controller("ConfirmModalController", ['$scope', 'AlertServices', function ($scope, AlertServices) {
            var params = AlertServices.params();
            // Setup defaults using the modal params.
            $scope.message = (params.message || "Are you sure?");
            if (params.icon) {
                $scope.icon = params.icon;
            } else {
                $scope.icon = 'info-sign';
            }
            $scope.title = (params.title || 'Confirm');
            $scope.labelConfirmBtn = (params.labelConfirmBtn || "Yes!");
            $scope.labelCancelBtn = (params.labelCancelBtn || "Cancel");
            // Wire the modal buttons into modal resolution actions.
            $scope.confirm = AlertServices.resolve;
            $scope.close = AlertServices.reject;
        }
    ])

    alertComponent.controller("PromptModalController", ['$scope', 'AlertServices', function ($scope, AlertServices) {
        var params = AlertServices.params();
        // Setup defaults using the modal params.
        $scope.message = (params.message || "Give me.");
        // Setup the form inputs (using modal params).
        $scope.title = (params.title || 'Prompt');
        if (params.icon) {
            $scope.icon = params.icon;
        } else {
            $scope.icon = 'check-circle';
        }
        $scope.form = {
            input: (params.placeholder || "")
        };
        $scope.errorMessage = null;
        $scope.close = AlertServices.reject;
        // I process the form submission.
        $scope.submit = function () {
            // If no input was provided, show the user an error message.
            if (!$scope.form.input) {
                return ($scope.errorMessage = "Please provide something!");
            }
            AlertServices.resolve($scope.form.input);
        };
    }])
    alertComponent.directive("cpAlert", ['$rootScope', 'AlertServices', function ($rootScope, AlertServices) {
        return (link);
            // I bind the JavaScript events to the scope.
            function link(scope, element, attributes) {
                scope.subview = null;
                element.on("click", function handleClickEvent(event) {
                    if (element[0] !== event.target) {
                        return;
                    }
                    scope.$apply(AlertServices.reject);
                });
                // Listen for "open" events emitted by the AlertServices service object.
                $rootScope.$on("AlertServices.open", function handleModalOpenEvent(event, modalType) {
                        scope.subview = modalType;
                    }
                );
                // Listen for "close" events emitted by the AlertServices service object.
                $rootScope.$on("AlertServices.close", function handleModalCloseEvent(event) {
                    scope.subview = null;
                });
            }
        }]);
    //cp alerts directive end sections
    alertComponent.directive('cpAlerts', function () {
        return {
            restrict: "E",
            templateUrl: 'cpalerttemplate.html',
            replace: true
        }
    });
    //cp alerts directive end sections
    alertComponent.directive('cpModal', function () {
        return {
            restrict: "E",
            templateUrl: 'cpmodalTemplate.html',
            replace: true,
            transclude: true,
            scope: {
                buttons: '@',
                modalSize: '@'
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                transclude(function (transcludeEl) {
                    var elements = Object.keys(transcludeEl);
                    //console.log('length1' + elements.length)
                    if (elements.length <= 3) {
                        element.find('.modal-footer').hide();
                    }
                });
                if (scope.modalSize) {
                    element.find('.modal-dialog').addClass(scope.modalSize);
                }
            }
        }
    });
    alertComponent.directive('cpModalBox', function () {
        return {
            restrict: "E",
            templateUrl: 'cpmodalTemplate.html',
            replace: true,
            link: function (scope, element, attrs) {
            
            }
        }
    });
    //cp-modals
    alertComponent.directive('cpModals', ['CpModalService', '$rootScope', '$document', function (CpModalService, $rootScope, $document) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.showModal = false;
                element.on('click', function (event) {
                    if (element[0] !== event.target) {
                        return;
                    }
                    scope.$apply(CpModalService.reject);
                })
                $rootScope.$on('CpModalService.open', function (event, data) {
                    scope.showModal = true
                    scope.title = data.title;
                    scope.popupTemp = '' + data.templateUrl;
                    if (data.icon) {
                        scope.icon = data.icon;
                    } else {
                        scope.icon = 'tasks';
                    }
                    $document.find('body').addClass('modal-open');
                    $document.bind('keyup', function (e) {
                        if (e.keyCode == 27) {
                            scope.$apply(CpModalService.reject);
                        }
                    });
                })
                $rootScope.$on('CpModalService.close', function (event) {
                    scope.showModal = false
                    $document.find('body').removeClass('modal-open');
                    $document.unbind();
                })
                scope.close = CpModalService.reject;
            }
        }
    }]);
    alertComponent.directive('cpErrorMessage', ['MessageService', '$rootScope', '$timeout', function (MessageService, $rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                autoClose: '@',
                modalScope: '@errorId'
            },
            templateUrl: "error-message-template.html",
            link: function (scope, element, attrs) {
                // scope.showError = false;

                function messageTypes(messageType) {
                    switch (messageType) {
                        case 'success':
                            element.addClass('alert-success');
                            scope.icon = 'glyphicon glyphicon-ok-sign';
                            break;
                        case 'error':
                            element.addClass('alert-danger');
                            scope.icon = 'glyphicon glyphicon-remove-sign';
                            break;
                        case 'warning':
                            element.addClass('alert-warning');
                            scope.icon = 'glyphicon glyphicon-exclamation-sign';
                            break;
                        default:
                            element.addClass('alert-info');
                            scope.icon = 'glyphicon glyphicon-info-sign';
                    }

                }


                $rootScope.$on(scope.modalScope+'MessageService.open', function (event, data) {
                    //scope.showError = true
                    $('#' + scope.modalScope).show();
                    element.removeClass('alert-success alert-danger alert-warning alert-info');
                    element.find('span').html(data.message);
                    var messageType = data.type;
                    messageTypes(messageType);
                })


                $rootScope.$on('MessageService.open', function (event, data) {
                    //scope.showError = true
                    $('#' + scope.modalScope).show();
                    element.removeClass('alert-success alert-danger alert-warning alert-info');
                    element.find('span').html(data.message);
                    var messageType = data.type;
                    messageTypes(messageType);
                })
                $rootScope.$on('MessageService.close', function (event) {
                    $("#"+element.attr("id")).hide()
                    //$(element).hide();

                });
                scope.close = function () {
                    //$(element).hide();
                    $("#" + element.attr("id")).hide()
                }
                    
            }
        }
    }]);
//global message service has three paramaters  message, timer and isClose, timer and isClose is options parameters, if isClose is not defined the error message will close in 10 seconds and default timer value is 10 seconds.

    alertComponent.directive('cpProgress', ['$rootScope', '$document', function ($rootScope, $document) {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: 'progress-template.html',
            link: function (scope, element, attrs) {
                scope.showProgress = false;
                $rootScope.$on('progress.open', function (event) {
                    scope.showProgress = true
                    $document.find('body').addClass('modal-open');
                })
                $rootScope.$on('progress.close', function (event) {
                    scope.showProgress = false;
                    $document.find('body').removeClass('modal-open');
                })
            }
        }
    }]);

})