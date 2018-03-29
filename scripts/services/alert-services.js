

define( function () {
    var serviceModel = angular.module('alert.service', []);

    serviceModel.service('ModalService', ['$rootScope', '$q', function ($rootScope, $q) {
        var modal = {
            deferred: null,
            params: null
        };
        return {
            open: open,
            params: params,
            proceedTo: proceedTo,
            resolve: resolve,
            reject: reject
        }
        function open(params, pipeResponse) {
            var previousDeferred = modal.deferred;
            modal.deferred = $q.defer();
            modal.params = params;
            if (previousDeferred && pipeResponse) {
                modal.deferred.promise.then(previousDeferred.resolve, previousDeferred.reject);
            } else if (previousDeferred) {
                previousDeferred.reject();
            }
            $rootScope.$emit('ModalService.open', params)
            return modal.deferred.promise;
        }
        function params(params) {
            return modal.params || {};
        }
        function proceedTo() {
            return open(params, true);
        }
        function resolve() {
            if (!modal.deferred) {
                return
            }
            modal.deferred.resolve(reason);
            modal.deferred = modal.params = null;
            $rootScope.$emit('ModalService.close');
        }
        function reject(reason) {
            if (!modal.deferred) {
                return
            }
            modal.deferred.reject(reason);
            modal.deferred = modal.params = null;
            $rootScope.$emit('ModalService.close');
        }

    }]);


    serviceModel.service('MessageService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var modal = {
            isVisible: false,
            timeOut: null
        };
        return {
            open: function (params) {
                var visibled = modal.isVisible;
                var self = this;
                var timer = params.timer || 10;
                var close = params.isAutoClose;

                if (close == true || close == 'undefined') {
                    $timeout.cancel(modal.timeOut);
                    timer = timer * 1000;
                    modal.timeOut = $timeout(function () {
                        self.close()
                    }, timer);
                }

                if (visibled) {
                    self.close();
                }

                $rootScope.$emit('MessageService.open', params);
                modal.isVisible = true;
            },
            close: function () {
                modal.isVisible = false;
                $rootScope.$emit('MessageService.close');
            }
        }
    }]);


    // I manage the AlertServices within the application.
    serviceModel.service("AlertServices", ['$rootScope', '$q', function ($rootScope, $q) {
        var modal = {
            deferred: null,
            params: null
        };
        // Return the public API.
        return ({
            open: open,
            params: params,
            proceedTo: proceedTo,
            reject: reject,
            resolve: resolve
        });

        // modal window is opened.
        function open(type, params, pipeResponse) {
            var previousDeferred = modal.deferred;
            // Setup the new modal instance properties.
            modal.deferred = $q.defer();
            modal.params = params;
            // window's deferred value.
            if (previousDeferred && pipeResponse) {
                modal.deferred.promise.then(previousDeferred.resolve, previousDeferred.reject);
                // We're not going to pipe, so immediately reject the current window.
            } else if (previousDeferred) {
                previousDeferred.reject();
            }
            $rootScope.$emit("AlertServices.open", type);

            return (modal.deferred.promise);
        }
        // I return the params associated with the current params.
        function params() {
            return (modal.params || {});
        }
        // This is just a convenience method for .open() that enables the
        // pipeResponse flag; it helps to make the workflow more intuitive.
        function proceedTo(type, params) {
            return (open(type, params, true));
        }
        // I reject the current modal with the given reason.
        function reject(reason) {
            if (!modal.deferred) {
                return;
            }
            modal.deferred.reject(reason);
            modal.deferred = modal.params = null;
            // Tell the modal directive to close the active modal window.
            $rootScope.$emit("AlertServices.close");
        }
        // I resolve the current modal with the given response.
        function resolve(response) {
            if (!modal.deferred) {
                return;
            }
            modal.deferred.resolve(response);
            modal.deferred = modal.params = null;
            // Tell the modal directive to close the active modal window.
            $rootScope.$emit("AlertServices.close");
        }
    }
    ])



})