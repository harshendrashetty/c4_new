define(function () {
    var factoryModule = angular.module('factory.module', []);

    factoryModule.factory('gridService', [function () {
        var factory = {};
        factory.modelData;
        factory.selectedCount;
        factory.setModelData = function (data) {
            factory.modelData = data;
            return this;
        }
        factory.toggleSelectAll = function (data, boolean) {
            for (var index = 0; index < data.length; index++) {
                if (boolean === true) {
                    data[index].enabled = true;
                }
                else {
                    data[index].enabled = false;
                }
            }
            if (boolean === true) {
                factory.selectedCount = data.length;
            } else {
                factory.selectedCount = 0;
            }
            return this;
        }

        factory.getSelectedCount = function (data, boolean) {
            var count = 0;
            for (var i = 0; i < data.length; i++){
                if (data[i].enabled === true) {
                    count = count + 1;
                } 
            }
            return count;
        }

        factory.then = function (fn) {
            fn(factory.selectedCount);
        }
        factory.getSelectedIds = function (data) {
            console.log(data)
            var selectedIds = [];
            angular.forEach(data, function (entry) {
                if (entry.enabled) {
                    selectedIds.push(entry.id)
                }
            })
            return selectedIds
        }

        return factory;

    }])


    factoryModule.factory('utilityService', [function () {
        var utltFactory = {};
        
        utltFactory.getSeverityImage = function (severityType) {
            switch (severityType) {
                case 1:
                    return 'resources/images/ic_statusUnknown_normal_16.png';
                    break;
                case 2:
                    return 'resources/images/ic_info_alt2_normal_16.png';
                    break;
                case 4:
                    return 'resources/images/ic_statusCheckGreen_normal_16.png';
                    break;
                case 8:
                    return 'resources/images/ic_statusWarning_normal_16.png';
                    break;
                case 16:
                    return 'resources/images/ic_statusCritical_normal_16.png';
                    break;
                case 32:
                    return 'resources/images/ic_statusCritical_normal_16.png';
                    break;
                default:
                    return 'resources/images/ic_statusCritical_normal_16.png';
                    break;
                }
        }

        utltFactory.getSeverityClass = function (severityType) {

            switch (severityType) {
                case 1:
                    return 'btn-warning';
                    break;
                case 2:
                    return ' btn-primary';
                    break;
                case 4:
                    return 'btn-success';
                    break;
                case 8:
                    return 'btn-info';
                    break;
                case 9:
                    return 'btn-default';
                    break;
                default:
                    return 'btn-danger';
                    break;
            }

        }
        
        return utltFactory;

    }]);


    factoryModule.factory('validateform', function () {
        var factory = {};
        var errors = '';
        factory.requireValidate = function (required) {
            if (required != void 0 && required != '') {
                return true;
            } else {
                return false;
            }
        };
        factory.minValidate = function (field, min) {
            if (field != void 0 && field != '') {
                if (field >= min) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return '';
            }
        };
        factory.maxValidate = function (field, max) {
            if (field != void 0 && field != '') {
                if (field <= max) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return '';
            }
        };
        factory.maxLengthValidate = function (field, max) {
            if (field != void 0 && field != '') {
                if (field.length <= max) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return '';
            }
        };
        factory.minLengthValidate = function (field, min) {
            if (field != void 0 && field != '') {
                if (field.length >= min) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return '';
            }
        };
        function validate(field, pattern) {
            if (field != void 0 && field != '') {
                if (pattern.test(field)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return '';
            }
        }
        factory.emailValidate = function (field) {
            var mailformat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return validate(field, mailformat)
        };
        factory.patternValidate = function (field, pattern) {
            return validate(field, pattern)
        };
        factory.passwordValidate = function (field, pattern) {
            return validate(field, pattern)
        };
        factory.urlValidate = function (field) {
            var urlFormat = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            return validate(field, urlFormat)
        };
        factory.ipValidate = function (field) {
            var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return validate(field, ipFormat)
        };
        return factory;

    });


})