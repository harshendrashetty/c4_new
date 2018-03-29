//pattern 
var URL_REGEXP = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

var base = angular.module('cp.base', []);
base.config(function ($provide) {
    return $provide.decorator('$log', function ($delegate) {
        var _log;
        _log = $delegate.log;
        $delegate.cpError = function (error) {
            var message;
            if (error.cpErrorType === 'ngmodel') {
                message = 'CP ERROR: missing NG-MODEL attribute on cp control: ' + error.cpErrorCtrl.toUpperCase() + ' - name/id: ' + error.cpErrorElIdentity.toUpperCase();
            }
            if (error.cpErrorType === 'radiomodel') {
                message = 'CP ERROR: missing RADIO-MODEL attribute on cp control: ' + error.cpErrorCtrl.toUpperCase() + ' - name/id: ' + error.cpErrorElIdentity.toUpperCase();
            }
            if (error.cpErrorType === 'name') {
                message = 'CP ERROR: missing NAME attribute on cp control: ' + error.cpErrorCtrl.toUpperCase() + ' - name/id: ' + error.cpErrorElIdentity.toUpperCase();
            }
            if (error.cpErrorType === 'modal') {
                message = "CP ERROR: invalid TYPE attribute on cp Modal - '" + error.cpErrorInvalidType + "' is not in list " + (error.cuiValidTypes.join(', '));
            }
            if (error.cpErrorType === 'attr') {
                message = "CP ERROR: missing attribute - '" + error.cpErrorAttr + "' is a required attribute for '" + error.cpErrorDirectiveName + "'";
            }
            if (message) {
                return $delegate.error(message);
            }
        };
        return $delegate;
    });
});

var customDirective = angular.module('custom.directive', ['cp.base']);

//common function 
function cp_attributecheck(attr, $log) {
    if (attr.name == null) {
        $log.cpError({
            cpErrorType: 'name',
            cpErrorCtrl: 'input',
            cpErrorElIdentity: attr.name || attr.id || 'UNKNOWN'
        });
        return false;
    } else if (attr.ngModel == null) {
        $log.cpError({
            cpErrorType: 'ngmodel',
            cpErrorCtrl: 'ngmodel',
            cpErrorElIdentity: attr.ngModel || attr.id || 'UNKNOWN'
        });
        return false;
    } else {
        return true;
    }
}



function cp_component(scope, element, attr, ngModelController, $compile) {
    var formElement = element.parents('form');
    var formName = formElement.attr('name');
    var fieldName = element.attr('name');
    scope.errorRight = true;

    wrapperEl = angular.element('<div class="form-group"></div>');
    wrapperInput = angular.element("<div> </div>")
    element.wrap(wrapperEl);
    element.wrap(wrapperInput)
    spinnerScope = scope.$new();

    if (attr.label) {
        labelTpl = angular.element('<label></label>');
        labelTpl.text(attr.label);
        if (attr.required) {
            var mandatory_sign = "<span class='mandatory-star'> * </span>";
            labelTpl.append(mandatory_sign)
        }
        if (formElement.hasClass('form-horizontal')) {
            labelTpl.addClass('control-label col-sm-2');
            element.parent().addClass('col-sm-10');
        }
        element.parent().before($compile(labelTpl)(spinnerScope))
    }
    //console.log('invalid value is ==  "' + [formName] + '.' + [fieldName] + '.' + '$invalid"');

    errorMessageTpl = angular.element('<div ng-show="' + [formName] + '.' + [fieldName] + '.$invalid && '+[formName]+'.'+[fieldName]+'.$dirty" ng-messages="' + [formName] + '.' + [fieldName] + '.$error"> \n<p ng-message="minLength" class="help-block">{{"cp_coreerror_messages.minlength" | translate}}</p>\n<p ng-message="maxLength">{{"cp_coreerror_messages.maxLength | translate"}}</p>\n <p ng-message="required" class="help-block">{{"cp_coreerror_messages.required" | translate}} </p> \n <p ng-message="nan"> {{"cp_coreerror_messages.validNumber" | translate}} </p> \n <p ng-message="ngPattern"> {{"cp_coreerror_messages.pattern" | translate}} </p>\n<p ng-message="min">{{"cp_coreerror_messages.minNumber" | translate}}</p><p ng-message="maxNumber">{{"cp_coreerror_messages.maxNumber" | translate}}</p> \n <p ng-message="email">{{"cp_coreerror_messages.validMail" | translate}}</p>\n <p ng-message="lowertext">{{"cp_coreerror_messages.lowertext" | translate}}</p>\n <p ng-message="numberPass">{{"cp_coreerror_messages.hasNumber" | translate}}</p>\n <p ng-message="specialchar">{{"cp_coreerror_messages.hasSpecialChar" | translate}}</p>\n <p ng-message="uppercase">{{"cp_coreerror_messages.hasUppercase" | translate}}</p>\n <p ng-message="pwmatch">{{"cp_coreerror_messages.confirmPassword" | translate}}</p>\n <p ng-message="ip">{{"cp_coreerror_messages.validIP" | translate}}</p>\n <p ng-message="cpUnique">{{"cp_coreerror_messages.cpUnique" | translate}}</p>\n <p ng-message="validUrl">{{"cp_coreerror_messages.validUrl" | translate}}</p>\n </div>');
   
    //error block positions
    if (attr.errorState == 'right') {
        errorMessageTpl.addClass('inline-error');
    } else {
        errorMessageTpl.addClass('block-error');
    }
    if (formName) {
        element.after($compile(errorMessageTpl)(spinnerScope));
    }
    
    
    var pattern = attr.ngPattern, patternValidator, match;
    var validate = function (regexp, value) {
        if (ngModelController.$isEmpty(value) || regexp.test(value)) {
            ngModelController.$setValidity('ngPattern', true)
            return value;
        } else {
            ngModelController.$setValidity('ngPattern', false);
            return undefined;
        }
    }
    if (pattern) {
        match = pattern.match(/^\/(.*)\/([gim]*)$/);
        if (match) {
            pattern = new RegExp(match[1], match[2]);
            patternValidator = function (value) {
                return validate(pattern, value);
            }
        } else {
            patternValidator = function (value) {
                var patternObj = scope.$eval(pattern);
                if (!patternObj || !patternObj.test) {
                    throw minErr('ngPattern')('noregexp', 'Expected {0} to be RegExp but was {1}. Element: {2}', pattern, patternObj, startingTag(element))
                }
                return validate(patternObj, value);
            }
        }
        ngModelController.$formatters.push(patternValidator);
        ngModelController.$parsers.push(patternValidator);
    }
    //validate

    if (attr.minlength) {
        var minlength = parseInt(attr.minlength);
        var minLengthValidator = function (value) {
            if (!ngModelController.$isEmpty(value) && value.length < minlength) {
                ngModelController.$setValidity('minLength', false);
                return undefined;
            } else {
                ngModelController.$setValidity('minLength', true);
                return value;
            }
        }
        ngModelController.$parsers.push(minLengthValidator);
        ngModelController.$formatters.push(minLengthValidator);
    }
    // max length validator
    if (attr.maxlength) {
        var maxlength = parseInt(attr.maxlength);
        var maxLengthValidator = function (value) {
            if (!ngModelController.$isEmpty(value) && value.length > maxlength) {
                ngModelController.$setValidity('maxLength', false);
                return undefined;
            } else {
                ngModelController.$setValidity('maxLength', true);
                return value;
            }
        };
        ngModelController.$parsers.push(maxLengthValidator);
        ngModelController.$formatters.push(maxLengthValidator);
    }

    if (element.attr('valid')) {
        conditionCharactors = element.attr('valid').split('').sort().join('').toUpperCase();
    } else {
        conditionCharactors = '';
    }

    if (conditionCharactors.indexOf("L") >= 0) {
        var letterValidator = function (value) {
            var hasLowerCase = /[a-z]/.test(value);
            var minchar = parseFloat(attr.minlength) || 0;
            var inputLength = element.val().length || 0;
            if (inputLength >= minchar) {
                if (hasLowerCase) {
                    ngModelController.$setValidity('lowertext', true);
                    return value;
                } else {
                    ngModelController.$setValidity('lowertext', false);
                    return undefined;
                }
            }
        }
        ngModelController.$parsers.push(letterValidator);
        ngModelController.$formatters.push(letterValidator);
    }
    if (conditionCharactors.indexOf("N") >= 0) {
        var numberValidator = function (value) {
            var hasNumber = /\d/.test(value);
            var minchar = parseFloat(attr.minlength) || 0;
            var inputLength = element.val().length || 0;
            if (inputLength >= minchar) {
                if (hasNumber) {
                    ngModelController.$setValidity('numberPass', true);
                    return value;
                } else {
                    ngModelController.$setValidity('numberPass', false);
                    return undefined;
                }
            }
        }
        ngModelController.$parsers.push(numberValidator);
        ngModelController.$formatters.push(numberValidator);
    }
    //special character validator
    if (conditionCharactors.indexOf("S") >= 0) {
        var specialValidator = function (value) {
            var hasSpecialCharacter = /\W/.test(value);
            var minchar = parseFloat(attr.minlength) || 0;
            var inputLength = element.val().length || 0;
            if (inputLength >= minchar) {
                if (hasSpecialCharacter) {
                    ngModelController.$setValidity('specialchar', true);
                    return value;
                } else {
                    ngModelController.$setValidity('specialchar', false);
                    return undefined;
                }
            }
        }
        ngModelController.$parsers.push(specialValidator);
        ngModelController.$formatters.push(specialValidator);
    }
    //Uppercase validator
    if (conditionCharactors.indexOf("U") >= 0) {
        var uppercaseValidator = function (value) {
            var hasUpperCase = /[A-Z]/.test(value);
            var minchar = parseFloat(attr.minlength) || 0;
            var inputLength = element.val().length || 0;
            if (inputLength >= minchar) {
                if (hasUpperCase) {
                    ngModelController.$setValidity('uppercase', true);
                    return value;
                } else {
                    ngModelController.$setValidity('uppercase', false);
                    return undefined;
                }
            }
        }
        ngModelController.$parsers.push(uppercaseValidator);
        ngModelController.$formatters.push(uppercaseValidator);
    }

    //required validator
    if (attr.required == 'true') {
        var require = attr.required;
        var requiredValidator = function (value) {
            if (ngModelController.$isEmpty(value)) {
                ngModelController.$setValidity('required', false);
                return 'required';
            } else {
                ngModelController.$setValidity('required', true);
                return value;
            }
        }
        ngModelController.$parsers.push(requiredValidator);
        //ngModelController.$formatters.push(requiredValidator)
    }
}

customDirective.directive('cpInput', ['$compile', '$log', function ($compile, $log) {
    return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: 'input-field.html',
        replace: true,
        link: function (scope, element, attr, ngModelController) {

            var isOverMax, isUnderMin, spinnerControlTpl, errorMessageTpl, spinnerScope, wrapperEl, labelTpl, conditionCharactors, minchar, inputLength, wrapperInput;
            //check name attribute 
          //  var offset = element.offset();
            //console.log('offset left ' + offset.left + '  offset top  ' + offset.top)
           
            if(!cp_attributecheck(attr, $log) ) return false;
            //input size default 400px or given attributes value
            if (attr.cpWidth > 0) {
                element.css('width', attr.cpWidth + 'px');
            } else {
                element.css('width', '400px');
            }
            cp_component(scope, element, attr, ngModelController, $compile);
                        
            if (attr.type == undefined) {
                element.attr('type', 'text');
            }

           // scope.errorRight = true;

            //attribute type condition is start from heres
            switch (attr.type) {
                case "text":
                    break;
                case "number":
                    //restriction for enter number only
                    element.on('keydown', function (event) {
                        var compareKey = event.key.toUpperCase();
                        if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ+-!@#$%^&*()_|}{[]/'\"';:?/><,~`".indexOf(compareKey) >= 0) {
                            return false;
                        }
                    });
                    //min validation
                    if (attr.min) {
                        var minValidator = function (min_value) {
                            var min = parseFloat(attr.min);
                            if (!ngModelController.$isEmpty(min_value) && min_value < min) {
                                ngModelController.$setValidity('min', false);
                                return 'min';
                            } else {
                                ngModelController.$setValidity('min', true);
                                return min_value;
                            }
                        }
                        ngModelController.$parsers.push(minValidator);
                        ngModelController.$formatters.push(minValidator);
                    }
                    //max validation
                    if (attr.max) {
                        var maxValidator = function (max_value) {
                            var max = parseFloat(attr.max);
                            if (!ngModelController.$isEmpty(max_value) && max_value > max) {
                                ngModelController.$setValidity('maxNumber', false);
                                return undefined;
                            } else {
                                ngModelController.$setValidity('maxNumber', true);
                                return max_value;
                            }
                        }
                        ngModelController.$parsers.push(maxValidator);
                        ngModelController.$formatters.push(maxValidator);
                    }
                    break;
                case "ip":
                    //remove type is ip;
                    element.removeAttr('type');
                    //add type attribute as a text.
                    element.attr('type', 'text');
                    function checkIp(ip) {
                        var ip_matcher;
                        if ((matcher = ip.match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/)) != null) {
                            var i;
                            var previous = "255";
                            for (i = 1; i < 5; i++) {
                                var octet = parseInt(matcher[i]);
                                if (octet > 255) return false;
                            }
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    var ipValidator = function (value) {
                        if (!ngModelController.$isEmpty(value) && checkIp(value)) {
                            ngModelController.$setValidity('ip', true);
                            return value;
                        } else {
                            ngModelController.$setValidity('ip', false);
                            return undefined;
                        }
                    }
                    ngModelController.$parsers.push(ipValidator);
                    ngModelController.$formatters.push(ipValidator);
                    break;
                case "email":
                    //email validator
                    var emailValidator = function (value) {
                        if (!ngModelController.$isEmpty(value) && EMAIL_REGEXP.test(value)) {
                            ngModelController.$setValidity('email', true);
                            return value;
                        } else {
                            ngModelController.$setValidity('email', false);
                            return undefined;
                        }
                    }
                   // ngModelController.$parsers.push(emailValidator);
                    //ngModelController.$formatters.push(emailValidator);
                    break;
                case "url":
                    //remove type is ip;
                    element.removeAttr('type');
                    //add type attribute as a text.
                    element.attr('type', 'text');
                    var validUrl = function (value) {
                        var isValidUrl = URL_REGEXP.test(value);
                        if (!ngModelController.$isEmpty(value) && isValidUrl) {
                            ngModelController.$setValidity('validUrl', true);
                            return value;
                        } else {
                            ngModelController.$setValidity('validUrl', false);
                            return undefined;
                        }
                    }
                    ngModelController.$parsers.push(validUrl);
                    ngModelController.$formatters.push(validUrl);
                    break;
                case "password":
                    /* password sections */

                    break;
                default:

            }
        } 
    };

}])

customDirective.directive('cpRadio', ['$log', function ($log) {
    return {
        restrict: "EA",
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: 'input-radio.html',
        scope: {
            name: '@',
            value: '@',
            ngModel: '=',
            ngRequired: '=',
            ngDisabled: '='
        },
        compile: function (element, attr) {
            var radio;
            radio = element.find('input');
            var formElement = element.parents('form')
            if (formElement.hasClass('form-horizontal')) {
                element.find('label.gender-label').addClass('control-label col-sm-2');
                element.find('div.radio-inline').parent().addClass('col-sm-10')
            }
            //check name attribute 
            cp_attributecheck(attr, $log);
            return function (scope, iElement, iAttrs, ngModelCtrl) {
                if (ngModelCtrl == null) {
                    $log.cpError({
                        cpErrorType: 'ngmodel',
                        cpErrorCtrl: 'cp-radio',
                        cpErrorElIdentity: iAttrs.name || iAttrs.id || 'UNKNOWN'
                    });
                    return;
                }
                return iElement.bind('keypress', function (event) {
                    switch (event.which) {
                        case 32:
                            event.preventDefault();
                            return document.activeElement.click();
                    }
                });
            };
        }
    }
}]);

//button component - buttons has multiple attributes like size, cptype, type, 
customDirective.directive('cpButton', function ($compile) {
    return {
        templateUrl: 'cp-button.html',
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            cpType: '@'
        },
        compile: function (element, attrs) {
            if (attrs.size == null) {
                attrs.size = 'medium';
            }
            if (attrs.cpType == null) {
                attrs.cpType = 'default';
            }
            if (attrs.type == null) {
                attrs.type = 'button';
            }
           
            element.addClass("cp-button-" + attrs.size);
            element.attr('type', attrs.type);
            return function (scope, element) {
                element.on('mouseup', function () {
                    return element[0].blur();
                });

                var formName = element.parents('form');
                var isHorizontalForm = formName.hasClass('form-horizontal')

                if(isHorizontalForm) {
                    var buttonWrapper = angular.element('<div class="form-group"></div>');
                    var buttonInnerWrapper = angular.element('<div></div>');
                    buttonInnerWrapper.wrap(buttonWrapper)
                    element.wrap(buttonInnerWrapper);
                    element.parent().addClass('col-sm-offset-2 col-sm-10')
                }

                if (scope.cpType != null) {
                    element.addClass("cp-button-" + scope.cpType);
                }
                return scope.$watch('cpType', function (newClass, oldClass) {
                    if (oldClass !== newClass) {
                        element.removeClass("cp-button-" + oldClass);
                        if (newClass != null) {
                            return element.addClass("cp-button-" + newClass);
                        }
                    }
                });
            };
        }
    };
});
//end button component 

customDirective.directive('cpConfirmPassword', ['$document', '$log', function ($document, $log) {
    return {
        require: "?ngModel",
        link: function (scope, element, attr, ngModelController) {
            var formName = element.parents('form').attr('name');
            if (!formName) { return;}
            var passField = attr.cpConfirmPassword;
            var validPassword = function (value) {
                var mainPassword = '#' + attr.cpConfirmPassword;
                var passValue = $(mainPassword).val();
                if (passValue == 'undefined') { return;}
                var isMatching = element.val() === passValue;
                if (!ngModelController.$isEmpty(value) && isMatching) {
                    ngModelController.$setValidity('pwmatch', true);
                    return value;
                } else {
                    ngModelController.$setValidity('pwmatch', false);
                    return undefined;
                }
            }
            ngModelController.$parsers.push(validPassword);
            ngModelController.$formatters.push(validPassword);
        }
    }
}]);

customDirective.directive('cpRadioGroup', ['$log', function ($log) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        templateUrl: 'input-radio.html',
        replace: true,
        scope: {
            name: '@',
            ngRequired: '=',
            ngDisabled: '=',
            radioModel: '=',
            radioItems: '=',
            label: '@',
            cpClass: '@'
        },
        compile: function (element, attrs) {
            var radio;
            radio = element.find('input');
            var formElement = element.parents('form')
            if (formElement.hasClass('form-horizontal')) {
                element.find('label.radio-label').addClass('control-label col-sm-2');
                element.find('div.radio').parent().addClass('col-sm-10')
            }

            if (attrs.name == null) {
                $log.cpError({
                    cpErrorType: 'name',
                    cpErrorCtrl: 'cp-radio-group',
                    cpErrorElIdentity: attrs.name || attrs.id || 'UNKNOWN'
                });
            } else {
                radio.attr('name', attrs.name);
            }
            return function (scope, iElement, iAttrs, ngModelCtrl) {
                if (iAttrs.radioModel == null) {
                    $log.cpError({
                        cpErrorType: 'radiomodel',
                        cpErrorCtrl: 'cp-radio-group',
                        cpErrorElIdentity: iAttrs.name || iAttrs.id || 'UNKNOWN'
                    });
                    return;
                }
                scope.radiolabel = iAttrs.radioLabel != null ? 'key.' + iAttrs.radioLabel : 'key';
                if (iAttrs.radioValue || iAttrs.radioLabel) {
                    return scope.radiovalue = 'key.' + (iAttrs.radioValue || iAttrs.radioLabel);

                } else {
                    return scope.radiovalue = 'key';
                }
            };
        }
    }
}]);

customDirective.directive('cpValueDuplication', ['$http', function ($http) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModelController) {
            var api = attributes.cpValueDuplication, isExist;
            element.on('blur', function (event) {
                $http.get(api).success(function (response) {
                    console.log('response ' + response.data);
                    isExist = response.data;
                    if(isExist){
                       // ngModelController.$setValidity('cpUnique', false);
                    } else {
                      // ngModelController.$setValidity('cpUnique', true);
                    }
                })
            })

        }
    }
}]);

customDirective.directive('cpSelect', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        require: '^form',
        scope: {
            selectOptions: '=',
            ngModel: '=',
            classNames: '@cpClass',
            labelKey: '@',
            valueKey: '@',
            defaultLabel: '@',
            required: '@',
            errorState: '@',
            disabled: '=cpDisabled'
        },
        templateUrl: 'cpselectbox.html',
        link: function (scope, element, attrs, formController) {
            if(attrs.label){
                scope.isPartial = true;
                scope.label = attrs.label;
            }
            var formElement = element.parents('form');
            if (formElement.hasClass('form-horizontal')) {
                element.find('label').addClass('control-label col-sm-2');
                element.find('div:first').addClass('col-sm-10');
            }
            $(document).bind('click', function (event) {
                var isClickedElementChildOfPopup = element.find(event.target).length > 0;
                if (isClickedElementChildOfPopup) {
                   // return;
                } else {
                    scope.$apply(function () {
                        scope.showFilter = false;
                    });
                }
            });
            scope.isIconClear = false;
            scope.showFilter = false;
            scope.selectbox = function () {
                scope.prop = false;
                scope.showFilter = !scope.showFilter;
            }
            scope.select = function (opt) {
                scope.selectedOption = opt[scope.valueKey];
                scope.ngModel = scope.selectedOption;
                scope.showFilter = false
                scope.isIconClear = true;
            }
            scope.clear = function () {
                scope.selectedOption = scope.defaultLabel;
                scope.ngModel = '';
                scope.showFilter = false
                scope.isIconClear = false;
            }
            scope.selectedOption = scope.ngModel;
            if (scope.selectedOption) {
                scope.isIconClear = true;
            } else {
                scope.selectedOption = scope.defaultLabel
            }
            //check required validation 
            if (attrs.required != undefined) {
                scope.$watch('ngModel', function () {
                    if (scope.ngModel !='') {
                        formController.$setValidity('required', true);
                        scope.showError = false;
                    } else {
                        formController.$setValidity('required', false);
                        scope.showError = true;
                    }
                })
            }
        }           
    }
});

customDirective.directive('cpMultiSelect', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        require:'^form',
        scope: {
            selectOptions: '=',
            ngModel: '=',
            classNames: '@cpClass',
            labelKey: '@',
            valueKey: '@',
            defaultLabel: '@',
            required: '@',
            errorState: '@',
            disabled: '=cpDisabled'
        },
        templateUrl: 'cpmultiselectbox.html',
        link: function (scope, element, attrs, formController) {
            var disableError = true;
            if (attrs.label) {
                scope.isPartial = true;
                scope.label = attrs.label;
            }
            var formElement = element.parents('form');
            if (formElement.hasClass('form-horizontal')) {
                element.find('label').addClass('control-label col-sm-2');
                element.find('div:first').addClass('col-sm-10');
            }
            $(document).bind('click', function (event) {
                var isClickedElementChildOfPopup = element.find(event.target).length > 0;
                if (isClickedElementChildOfPopup) {
                    // return;
                } else {
                    scope.$apply(function () {
                        scope.showFilter = false;
                    });
                }
            });
           

            scope.showFilter = false;
            scope.selectbox = function () {
                scope.prop = false;
                scope.showFilter = !scope.showFilter;
            }
            scope.select = function () {
                var selectedOptions = [];
                var selectedCount = 0;
                angular.forEach(scope.selectOptions, function (opt) {
                    if (opt.isSelected) {
                        selectedOptions.push(opt[scope.valueKey]);
                    }
                })
                scope.selectedOption = selectedOptions.join(', ');
                scope.ngModel = selectedOptions;
                if (selectedOptions.length > 0) {
                    scope.isIconClear = true;
                } else {
                    scope.isIconClear = false;
                    scope.selectedOption = scope.defaultLabel
                }
            }
            scope.clear = function () {
                angular.forEach(scope.selectOptions, function (opt) {
                    opt.isSelected = false;
                })
                scope.selectedOption = scope.defaultLabel;
                scope.ngModel = [];
                scope.showFilter = false
                scope.isIconClear = false;
            }
            console.log('manharan');


            function defaultSelection() {
                var selectedData = scope.ngModel;
                console.log('selectedData  ' + selectedData)
                if (selectedData) {
                    if (selectedData.length > 0) {
                        scope.isIconClear = true;
                        scope.selectedOption = selectedData.join(', ');
                        angular.forEach(scope.selectOptions, function (opt) {
                            var val = opt[scope.valueKey];
                            if (selectedData.indexOf(val) != -1) {
                                opt.isSelected = true;
                            }
                        })
                    } else {
                        scope.isIconClear = false;
                        scope.selectedOption = scope.defaultLabel
                    }
                } else {
                    scope.selectedOption = scope.defaultLabel
                }
            }
            defaultSelection();
            //check required validation 

            if (attrs.required != undefined) {
                scope.$watch('ngModel', function () {
                    if (scope.ngModel != '') {
                        formController.$setValidity('required', true);
                        scope.showError = false;
                    } else {
                        formController.$setValidity('required', false);
                        scope.showError = true;
                    }
                })
            }
        }
    }
});

customDirective.directive('cpCheckbox', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngModel',
        scope: {
            ngModel: '=',
            selectOptions: '=',
            label: '@',
            labelKey: '@',
            valueKey: '@',
            cpClass: '@'
        },
        templateUrl: 'checkbox_template.html',
       link: function (scope, element, attrs, ngModelController) {
           if (!ngModelController) { return;}
           scope.selected = [];
           scope.showError = false;
           if (attrs.label) {
               scope.isPartial = true;
               scope.label = attrs.label;
           }
           var formElement = element.parents('form');
           if (formElement.hasClass('form-horizontal')) {
               element.find('label').addClass('control-label col-sm-2');
               element.find('div:first').addClass('col-sm-10');
           }

           function filter(data) {
               var arr = []
               angular.forEach(data, function (val) {
                   if (val.isSelected) {
                       arr.push(val[scope.valueKey]);
                   }
               })
               return arr;
           }
           scope.select = function (option) {
               scope.selected.push(option.value)
               var selected = filter(scope.selectOptions)
               scope.ngModel = selected;
               if (selected.length == 0) {
                   scope.showError = true;
               } else {

                   scope.showError = false;
               }
           }
           scope.ngModel = filter(scope.selectOptions);
           //check required validation 
           if (attrs.required != undefined) {
               var value = scope.ngModel;
               var validator = function (value) {
                   if (value.length == 0) {
                       ngModelController.$setValidity('required', false);
                       return undefined;
                   } else {
                       ngModelController.$setValidity('required', true);
                       return value;
                   }
               }
               ngModelController.$parsers.push(validator);
               ngModelController.$formatters.push(validator);
           }

        }
    }
});

//image directive
customDirective.directive('cpImage', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            imgSrc: '@',
            alt: '@',
        },
        templateUrl: "cpImagetemplate.html",
        link: function (scope, elements, attrs) {
            
        }
    }
});

customDirective.directive('cpLink', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            href: '@'
        },
        templateUrl: "cpAnchortemplate.html",
        link: function (scope, element, attrs) {
        }
    }
});

customDirective.directive('tooltip', function ($document) {
    return {
        link: function (scope, elements, attrs) {
            var tooltipHeight;
            var tooltipWidth;
            var body = angular.element($document.find('body'));
            var tooltipEle = angular.element('<div class="cp-tootip"></div>');
            elements.on('mouseenter', function (event) {
                var offset = getCoords(event.target);
                var xCord = offset.left;
                var yCord = offset.top;
                tooltipEle.html(attrs.tooltip)
                body.append(tooltipEle);
                var tooltipPos = attrs.tooltipPosition

              //  var tooltipHeight = tooltipEle.height();
               // var tooltipWidth = tooltipEle.width();
                //console.log('abc' + tooltipEle.height())
                if (tooltipWidth > xCord && tooltipPos == 'left') {
                        tooltipWidth = xCord;
                        tooltipEle.css('width', xCord - 30);
                    }
                   switch (tooltipPos) {
                       case 'left':
                           tooltipHeight = tooltipEle.height() / 2;
                           tooltipWidth = (tooltipEle.innerWidth() + 15);
                           break;
                       case 'right':
                           tooltipHeight = tooltipEle.height() / 2;
                           tooltipWidth = -(elements.innerWidth());
                           break;
                       case 'bottom':
                           tooltipHeight = -(elements.innerHeight());
                           tooltipWidth = (tooltipEle.innerWidth() - elements.width()) / 2;
                           break;
                       default:
                           tooltipHeight = (tooltipEle.height() + 15);
                           tooltipWidth = (tooltipEle.width() - elements.width())/2;
                           break;

                   }

                   tooltipEle.css('left', xCord - tooltipWidth);
                   tooltipEle.css('top', offset.top - tooltipHeight);

            });
            elements.on('mouseleave', function (event) {
                tooltipEle.remove();
            });

            function getCoords(elem) { // crossbrowser version
                var box = elem.getBoundingClientRect();
                var body = document.body;
                var documentEle = document.documentElement;
                var scrollTop = window.pageYOffset || documentEle.scrollTop || body.scrollTop;
                var scrollLeft = window.pageXOffset || documentEle.scrollLeft || body.scrollLeft;

                var clientTop = documentEle.clientTop || body.clientTop || 0;
                var clientLeft = documentEle.clientLeft || body.clientLeft || 0;

                var top = box.top + scrollTop - clientTop;
                var left = box.left + scrollLeft - clientLeft;

                return { top: Math.round(top), left: Math.round(left) };
            }
        }
    }
});

customDirective.directive('cpTabs', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'cpTabTemplate.html',
        controller: function ($scope) {
            var cpTabs = $scope.tabs = [];

            function loadUrl (selectedTab) {
                $scope.url = selectedTab.templatePath;
            }
            this.addTabs = function (newTab) {
                $scope.tabs.push(newTab);
                if ($scope.tabs.length == 1) {
                    newTab.selected = true;
                    loadUrl(newTab);
                }
            }
            $scope.selectedTab = function (tab) {
                angular.forEach($scope.tabs, function (tab) {
                    tab.selected = false;
                });
                tab.selected = true;
                loadUrl(tab);
            }

        }
    }
})

customDirective.directive('cpTab', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '^cpTabs',
        scope: {
            title: '@',
            templatePath: '@'
        },
        transclude: true,
        link: function (scope, element, attrs, ctrl) {
            scope.title = scope.title;
            scope.selected = false;
            ctrl.addTabs(scope);
            
        }
    }
})


customDirective.directive('cpFieldSet', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {label:'@'},
        transclude: true,
        templateUrl:'cpFieldsetTemplate.html',
        link: function (scope, element, attrs) {
            
        }
    }
})

customDirective.directive('cpTextarea', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngModel',
        scope: { label: '@', ngModel:'=', showCharactersRemaining:'@'},
        template: "<textarea class=''></textarea>",
        link: function (scope, element, attrs, ngModelController) {
            
        },
       controller: function ($scope, $attrs, $element) {
           var maxLength = $attrs.ngMaxlength;
           var maxCharacter = $attrs.ngMaxlength;
           var pristine = false;

           if (maxCharacter != null) {
               function calcualteCharacters(char) {
                   var character = char;
                   var currentCharLength = character.trim().length;
                   var remaining = maxCharacter - currentCharLength;
                   if (remaining > 0) {
                       return remaining + ' remaining character';
                   } else {
                       return undefined;
                   }
               }
               $scope.$watch($attrs.ngModel, function (newVal) {
                   var tArea = $element.find('textarea');
                   var text = tArea.val() || '';
                   if (text.length > (maxLength - 1)) {
                       var val = text.substr(0, (maxLength - 1));
                       tArea.val(val);
                   }
                   if (newVal != undefined) {
                       $scope.remainingLength = calcualteCharacters(newVal);
                   }

                   if (text.length == 0 && pristine == true) {
                       $scope.isRequired = true;
                   } else {
                       $scope.isRequired = false;
                   }

                   pristine = true;

               })
           }
        },
        compile: function (element, attrs, transcludeFn) {
            var wrapperEl = angular.element('<div class="form-group"></div>');
            var wrapperInput = angular.element("<div> </div>")
            element.wrap(wrapperEl);
            element.wrap(wrapperInput)

            if (attrs.ngMaxlength != null && attrs.showCharactersRemaining == 'true') {
                var counter = angular.element("<div class='cp-remaining' ng-show='remainingLength'>{{remainingLength}}</div>")
                element.after(counter);
            }
            
            if (attrs.required != undefined) {
                var errorTextarea = angular.element("<div ng-show='isRequired'> This field is required. </div>");
                if (attrs.errorState == 'right') {
                    errorTextarea.addClass('inline-error');
                } else {
                    errorTextarea.addClass('block-error');
                }
                element.after(errorTextarea);
            }

            if (attrs.cpDisabled) {
                element.attr('disabled', 'true')
                element.removeAttr('cp-disabled')
            }

            if (attrs.label) {
                labelTpl = angular.element('<label></label>');
                labelTpl.text(attrs.label);
                if (attrs.required) {
                    var mandatory_sign = "<span class='mandatory-star'> * </span>";
                    labelTpl.append(mandatory_sign)
                }
                var formElement = element.parents('form');

                if (formElement.hasClass('form-horizontal')) {
                    labelTpl.addClass('control-label col-sm-2');
                    element.parent().addClass('col-sm-10');
                }
                element.parent().before(labelTpl)
            }
            
        }
    }
})

customDirective.directive('cpDisabled', function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (attrs.cpDisabled) {
                var tagName = element[0].tagName;
                if (tagName == 'INPUT') {
                    element.attr('disabled', true);
                } else {
                   // element.find('div').attr('ng-disabled', true);
                   
                }

               // element.find('input').attr('disabled', true);
               // element.attr('disabled', true);
            }
              
        }
    }
});



customDirective.directive('cpAccordions', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            
        },
        controller: function ($scope) {

        },
        templace: ""
        
    }
});

customDirective.directive('cpAccordion', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {

        },
        controller: function ($scope) {

        },
        templace: ""

    }
});