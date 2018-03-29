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
        //Assign the label size.
        var labelWidth = attr.labelColumn;
        if (formElement.hasClass('form-horizontal')) {
            if (labelWidth == void 0) {
                labelTpl.addClass('control-label col-sm-6');
                element.parent().addClass('col-sm-6');
            } else {
                var labelColumnSize = "col-sm-" + labelWidth;
                var inputColumSize = "col-sm-" + (12 - labelWidth);
                labelTpl.addClass('control-label '+ labelColumnSize);
                element.parent().addClass(inputColumSize);
            }
            element.removeAttr('label-column');

        }
        element.parent().before($compile(labelTpl)(spinnerScope))
        element.removeAttr('label');
    }

    if (attr.required == void 0 && attr.min == void 0 && attr.max == void 0 && attr.minLength == void 0 && attr.maxLength == void 0 && attr.ngPattern == void 0 && attr.validate == void 0 && attr.ip == void 0 && attr.validUrl == void 0) {
        return;
    }
   
    //error element template
    errorMessageTpl = angular.element('<div ng-show="' + [formName] + '.' + [fieldName] + '.$invalid && ' + [formName] + '.' + [fieldName] + '.$dirty" ng-messages="' + [formName] + '.' + [fieldName] + '.$error"> \n<p ng-message="minLength" class="help-block">{{"cp_coreerror_messages.minlength" | translate}}</p>\n<p ng-message="maxLength">{{"cp_coreerror_messages.maxLength | translate"}}</p>\n <p ng-message="required" class="help-block">{{"cp_coreerror_messages.required" | translate}} </p> \n <p ng-message="nan"> {{"cp_coreerror_messages.validNumber" | translate}} </p> \n <p ng-message="ngPattern"> {{"cp_coreerror_messages.pattern" | translate}} </p>\n<p ng-message="min">{{"cp_coreerror_messages.minNumber" | translate}}</p><p ng-message="maxNumber">{{"cp_coreerror_messages.maxNumber" | translate}}</p> \n <p ng-message="email">{{"cp_coreerror_messages.validMail" | translate}}</p>\n <p ng-message="lowertext">{{"cp_coreerror_messages.lowertext" | translate}}</p>\n <p ng-message="numberPass">{{"cp_coreerror_messages.hasNumber" | translate}}</p>\n <p ng-message="specialchar">{{"cp_coreerror_messages.hasSpecialChar" | translate}}</p>\n <p ng-message="uppercase">{{"cp_coreerror_messages.hasUppercase" | translate}}</p>\n <p ng-message="pwmatch">{{"cp_coreerror_messages.confirmPassword" | translate}}</p>\n <p ng-message="ip">{{"cp_coreerror_messages.validIP" | translate}}</p>\n <p ng-message="cpUnique">{{"cp_coreerror_messages.cpUnique" | translate}}</p>\n <p ng-message="validUrl">{{"cp_coreerror_messages.validUrl" | translate}}</p>\n </div>');
   
    //error block positions
    if (attr.errorPosition == 'right') {
        errorMessageTpl.addClass('inline-error');
    } else {
        errorMessageTpl.addClass('block-error');
    }
    if (formName) {
        element.after($compile(errorMessageTpl)(spinnerScope));
    }

    if (attr.helpContent != undefined && attr.helpContent != '') {
        element.after($compile('<a href="javascript:void(0)" style="margin-left:3px; vertical-align: middle; margin-top: -3px;" data-toggle="popover" data-trigger="hover" data-placement="right" data-placement="bottom" data-content="' + attr.helpContent + '" class="glyphicon glyphicon-question-sign"> </a>')(scope));
        $('[data-toggle="popover"]').popover();
        element.removeAttr('helpContent');
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
            }
            //else {
            //    element.css('width', '400px');
            //}

           

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
                    element.attr('type', 'text');
                    //add type attribute as a text.
                    if (attr.validate == 'true') {
                       
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
                            console.log('check the ip validate')
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
                    }
                    break;
                case "email":
                    //email validator
                   /* if (attr.validate == 'true') {
                        var emailValidator = function (value) {
                            if (!ngModelController.$isEmpty(value) && EMAIL_REGEXP.test(value)) {
                                console.log('true');
                                ngModelController.$setValidity('email', true);
                                return value;
                            } else {
                                console.log('false');
                                ngModelController.$setValidity('email', false);
                                return undefined;
                            }
                        }
                        ngModelController.$parsers.push(emailValidator);
                        ngModelController.$formatters.push(emailValidator);
                    }*/
                    break;
                case "url":
                    //remove type is ip;
                    element.removeAttr('type');
                    //add type attribute as a text.
                    element.attr('type', 'text');
                    if (attr.validate == 'true') {
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
                    }
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
        templateUrl: 'radio-template.html',
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
                var labelWidth = attr.labelColumn;
                if (labelWidth == void 0) {
                    element.find('label.gender-label').addClass('control-label col-sm-6');
                    element.find('div.radio-inline').parent().addClass('col-sm-6')
                } else {
                    var labelColumnSize = "col-sm-" + labelWidth;
                    var inputColumSize = "col-sm-" + (12 - labelWidth);
                    element.find('label.gender-label').addClass('control-label ' + labelColumnSize);
                    element.find('div.radio-inline').parent().addClass(inputColumSize)
                }
                element.removeAttr('label-column');
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
        templateUrl: 'button-template.html',
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
        templateUrl: 'radio-template.html',
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
                var labelWidth = attrs.labelColumn;
                if (labelWidth == void 0) {
                    element.find('label.radio-label').addClass('control-label col-sm-6');
                    element.find('div.radio').parent().addClass('col-sm-6')
                } else {
                    var labelColumnSize = "col-sm-" + labelWidth;
                    var inputColumSize = "col-sm-" + (12 - labelWidth);
                    element.find('label.radio-label').addClass('control-label ' + labelColumnSize);
                    element.find('div.radio').parent().addClass(inputColumSize)
                }
                element.removeAttr('label-column');
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
            errorPosition: '@',
            disabled: '=cpDisabled'
        },
        templateUrl: 'select-template.html',
        link: function (scope, element, attrs, formController) {
            if(attrs.label){
                scope.isPartial = true;
                scope.label = attrs.label;
            }
            var formElement = element.parents('form');
            if (formElement.hasClass('form-horizontal')) {
                var labelWidth = attrs.labelColumn;
                if (labelWidth == void 0) {
                    element.find('label').addClass('control-label col-sm-6');
                    element.find('div:first').addClass('col-sm-6');
                } else {
                    var labelColumnSize = "col-sm-" + labelWidth;
                    var inputColumSize = "col-sm-" + (12 - labelWidth);
                    element.find('label').addClass('control-label ' + labelColumnSize);
                    element.find('div:first').addClass(inputColumSize);
                }
                element.removeAttr('label-column');
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
            errorPosition: '@',
            disabled: '=cpDisabled'
        },
        templateUrl: 'multiselect-template.html',
        link: function (scope, element, attrs, formController) {
            var disableError = true;
            scope.showToolTip = false;
            if (attrs.label) {
                scope.isPartial = true;
                scope.label = attrs.label;
            }
            var formElement = element.parents('form');
            if (formElement.hasClass('form-horizontal')) {
                var labelWidth = attrs.labelColumn;
                if (labelWidth == void 0) {
                    element.find('label').addClass('control-label col-sm-6');
                    element.find('div:first').addClass('col-sm-6');
                } else {
                    var labelColumnSize = "col-sm-" + labelWidth;
                    var inputColumSize = "col-sm-" + (12 - labelWidth);
                    element.find('label').addClass('control-label ' + labelColumnSize);
                    element.find('div:first').addClass(inputColumSize);
                }
                element.removeAttr('label-column');
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
            scope.showSelectItem = function () {
                if (scope.selectedOption.split(',').length > 1) {
                    scope.showToolTip = true;
                }                
            }

            scope.hideSelectItem = function () {
                if (scope.showToolTip) {
                    scope.showToolTip = false;
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
            function defaultSelection() {
                var selectedData = scope.ngModel;
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
        templateUrl: 'checkbox-template.html',
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
               var labelWidth = attrs.labelColumn;
               if (labelWidth == void 0) {
                   element.find('label').addClass('control-label col-sm-6');
                   element.find('div:first').addClass('col-sm-6');
               } else {
                   var labelColumnSize = "col-sm-" + labelWidth;
                   var inputColumSize = "col-sm-" + (12 - labelWidth);

                   element.find('label').addClass('control-label ' + labelColumnSize);
                   element.find('div:first').addClass(inputColumSize);
               }
               element.removeAttr('label-column');
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
               if (attrs.required == true) {
                    if (selected.length == 0) {
                       scope.showError = true;
                    } else {
                        scope.showError = false;
                    }
               }
           }
           scope.ngModel = filter(scope.selectOptions);
          
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
        templateUrl: "image-template.html",
        link: function (scope, elements, attrs) {
        }
    }
});

customDirective.directive('cpLinkButton', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            href: '@',
            class: "@"
        },
        templateUrl: "link-template.html",
        link: function (scope, element, attrs) {
        }
    }
});

customDirective.directive('tooltip', ['$document', function ($document) {
    return {
        link: function (scope, elements, attrs) {
            var body = angular.element($document.find('body'));
            elements.attr({ "data-html": "true", "data-toggle": "popover", "data-content": attrs.tooltip, "data-trigger":'hover' });
            var position = attrs.position;
            if (position != void 0) {
                elements.attr("data-placement", position);
            }            
            elements.popover();
            elements.removeAttr('tooltip');
            elements.removeAttr('position');
        }
    }
}]);

customDirective.directive('cpFieldSet', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {label:'@'},
        transclude: true,
        templateUrl:'fieldset-template.html',
        link: function (scope, element, attrs) {
        }
    }
})

customDirective.directive('cpTextarea', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngModel',
        template: "<textarea></textarea>",
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
                       $scope.ngModel = val;
                   }
                   if (newVal != undefined) {
                       $scope.remainingLength = calcualteCharacters(newVal);
                   } else {
                       $scope.remainingLength = undefined;
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
            if (attrs.required != false || attrs.required == '') {
                var errorTextarea = angular.element("<div ng-show='isRequired'> This field is required. </div>");
                if (attrs.errorPosition == 'right') {
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
                    var labelWidth = attrs.labelColumn;
                    if (labelWidth == void 0) {
                        labelTpl.addClass('control-label col-sm-6');
                        element.parent().addClass('col-sm-6');
                    } else {
                        var labelColumnSize = "col-sm-" + labelWidth;
                        var inputColumSize = "col-sm-" + (12 - labelWidth);

                        labelTpl.addClass('control-label ' + labelColumnSize);
                        element.parent().addClass(inputColumSize);
                    }
                    element.removeAttr('label-column');
                }

                element.parent().before(labelTpl)
            }

            if (attrs.cpWidth) {
                element.width(attrs.cpWidth)

            } else {


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

customDirective.directive('cpCalender', ['$rootScope', '$document', function ($rootScope, $document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            bind: '=ngModel',
            dateFormat: '@',
            minDate: '='
        },
        templateUrl: 'calendar-template.html',
       /* controller: ['$scope', '$attrs', function ($scope, $attrs) {
            //console.log($attrs.minDate)
            $scope.$watch($attrs.minDate, function (value) {
                console.log('value is - '+value)
            })
            }],*/
       
        link: function (scope, element, attrs) {
            if (attrs.dateFormat != void 0) {
                element.find('datepicker').attr('date-format', attrs.dateFormat);
            } else {
                element.find('datepicker').attr('date-format', 'dd-MM-yyyy');
            }

            if (attrs.setDate == true) {
                var today = new Date()
                element.find('datepicker').attr('date-set', today);
            }
            
            if (attrs.maxDate != void 0) {
                var today = new Date(attrs.maxDate);
                element.find('datepicker').attr('date-max-limit', today);
            }
            if (attrs.minDate != void 0) {
                console.log('tAttrs.minDate ' + attrs.minDate)
                var prevDate = new Date(attrs.minDate)
                element.find('datepicker').attr('date-min-limit', prevDate);
            }
            if (attrs.futureDate != void 0) {
                var futureDate = new Date()
                element.find('datepicker').attr('date-min-limit', futureDate);
            }
           
            console.log('min date - ' + scope.minDate);
            if (scope.minDate != void 0) {
                scope.$watch('minDate', function (newValue) {
                    if (newValue != void 0) {
                        //var date = newValue.split('-');
                        //var year = date[2];
                        //var month = date[1];
                        //var day = date[0];

                        //var datea = new Date().toDateString();
                        //console.log(newValue.)

                        scope.manharan = newValue.toString();

                        console.log('newValue = ' + newValue);
                        //element.find('datepicker').attr('date-min-limit', newValue);
                    }

                })
            }
            
            $(document).bind('click', function (event) {
                var isClickedElementChildOfPopup = element.find(event.target).length > 0;
                if (isClickedElementChildOfPopup) {
                        // scope.visibility = !scope.visibility;
                           
                } else {
                    scope.visibility = false;
                }
            });

            element.find('span').on('click', function (e) {
                scope.visibility = !scope.visibility;
            });

            //scope.bind = attrs.minDate;


               
        }
    }
}]);

customDirective.directive('cpHours', [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "hours-dropdown-template.html",
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            scope.hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }
    }

}])

customDirective.directive('cpMinutes', [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "minutes-dropdown-template.html",
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            scope.minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
        }
    }

}])

customDirective.directive('cpBtnScrollTop', ['$document', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            visibleAfter:'@'
        },
        templateUrl: 'scroll-to-top-template.html',
        link: function (scope, element, attrs) {
            var scrollTop, isVisible = false;
            angular.element($document).on('scroll', function (e) {
                scrollTop = angular.element($document).scrollTop();
                if (scrollTop > scope.visibleAfter && isVisible == false) {
                    element.show(500);
                    isVisible = true;
                } else if (scrollTop < scope.visibleAfter && isVisible == true) {
                    element.hide(500);
                    isVisible = false;
                }
            });
            scope.onTop = function () {
                $document.find('html, body').animate({scrollTop:"0"}, 300);
                element.hide(500);
            }

        }
    }
}]);

customDirective.directive('cpPageTabs', ['$location', function ($location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            tabModel:'='
        },
        templateUrl: "page-tab-template.html",
        link: function (scope, element, attrs) {
            scope.selectedIndex = 0;
            scope.selectTab = function (index) {
                scope.selectedIndex = index;
            }

           // console.log('tab ' + $location.path())

        }
    }
}])

customDirective.directive('cpPageAccordions', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            accordionModel: '=',
            showAll: '@'
        },
        templateUrl:'cp-page-accordion-template.html',
        link: function (scope, element, attrs) {
            scope.selectedIndex = 0;
            var showAll = scope.showAll;
            scope.select = function (index) {
                if (showAll != undefined) {
                    $('#collapse' + index).slideToggle(300);
                } else {
                    scope.selectedIndex = index;
                }
            }
        }
    }
}])

/*
customDirective.directive('cpAccordions', function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
        },
        controller: function ($scope) {
            $scope.accordions = [];
            this.addAccordion = function (accordion) {
                $scope.accordions.push(accordion);
                if ($scope.accordions.length == 1) {
                    accordion.selected = true;
                }
            };
            this.selecte = function (accordion) {
                angular.forEach($scope.accordions, function (accordion) {
                    accordion.selected = false;
                })
                accordion.selected = true;
            }
        },
        templace: "<div ng-transclude>" +
            "</div>"
    }
});

customDirective.directive('cpAccordion', function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        require:'^cpAccordions',
        scope: {
            title:'@'
        },
        templace: "<div>" +
                    "<a href='#' ng-click='select()'> {{title}} </a>" +
                    "<div ng-transclude></div>"+
                 "<div>",
        link: function (scope, element, attrs, accordionController) {
            accordionController.addAccordion(scope);
        }

    }
});
*/

customDirective.directive('cpPanels', [function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        template: "<div class='clearfix wizard-body overflow-prevention'>"+
                     "<div class='wizard-row'>"+
                        "<div class='wizard-left-nav'>"+
                            "<ul>"+
                                "<li ng-repeat='step in wizardPanels' ng-class='{selectedstep:step.selected == true}'>" +
                                    "<a href='avascript:void(0)' ng-click='selectPanel(step)'>{{ step.label }}</a>" +
                                    "<span class='wizard-pointer'></span>"+
                                "</li>"+
                            "</ul>"+
                        "</div>"+
                        "<div class='wizard-form-wrapper' ng-transclude>"+
                            
                        "</div>"+
                    "</div>"+
                "</div>",
        controller: ['$scope', function ($scope) {
            $scope.wizardPanels = [];
            this.addPanel = function (panel) {
                console.log('add panel')
                $scope.wizardPanels.push(panel)
                if ($scope.wizardPanels.length === 1) {
                    panel.selected = true
                }
            }
            $scope.selectPanel = function (panel) {
                console.log('select panel')
                angular.forEach($scope.wizardPanels, function (panel) {
                    panel.selected = false;
                });
                panel.selected = true;
            }
            

        }],
        link: function (scope, element, attrs) {


        }
    }
}])


customDirective.directive('cpPanel', [function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        require: '^cpPanels',
        scope: {
            label:'@'
        },
        template: "<div ng-transclude ng-show='panel.selected'></div>",
        link: function (scope, element, attrs, panelController) {
            scope.panel = {
                label: scope.label,
                selected: false
            }
            
            panelController.addPanel(scope.panel);
                        
        }
    }
}])

//start Wizard related directive 
customDirective.controller('WizardController', ['$scope', 'wizard', 'close', function ($scope, wizard, close) {
    $scope.wizardForms = {};
    $scope.wizardSteps = wizard;
    $scope.wizard = {};
    $scope.wizard.index = 0;
    $scope.viewedPages = [0];
    $scope.openWizard = false;

    function checkNextMove(index) {
        if (index < $scope.wizard.index) {
            return true;
        } else if (index > $scope.wizard.index && $scope.wizardForm['step' + (index - 1)].$valid == true) {
            return true;
        } else {
            return false;
        }
    }

    $scope.notGoodToFinish = function () {
        if ($scope.wizard.index != $scope.wizardSteps.wizards.length - 1) {
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
        } else if (index == ($scope.wizard.index + 1) && $scope.wizardForm['step'+$scope.wizard.index].$valid) {
            $scope.wizard.index = $scope.wizard.index + 1;
            if ($scope.viewedPages.indexOf($scope.wizard.index) == -1) {
                $scope.viewedPages.push($scope.wizard.index)
            }
        }
    }
    $scope.dismissModal = function () {
        close({close:'close'}, 200)
    }
    $scope.ok = function (forms) {
        forms.close = 'finish';
        close(forms, 200)
    }    

}])

customDirective.directive('wizardForm', ['$log', '$templateRequest', '$compile', '$controller',  function ($log, $templateRequest, $compile, $controller) {
    return {
        link: function (scope, element, attrs) {
            var view = '' + scope.step.view;
            var controller = '' + scope.step.controller;
            if (view) {
                $templateRequest(view).then(function (html) {
                    var template = angular.element(html);
                    element.find('.wiz-view').append(template)
                    $compile(template)(scope);
                });
            }
            if (controller) {
              //  $controller(controller, scope)

            }




        }
    }
}])

//end Wizard related directive 

//cp Tree component 

customDirective.directive('cpTree', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            treeModel:'='
        },
        templateUrl: "tree-template.html",
        link: function (scope, element, attrs) {
            //console.log('treeModel ' + scope.treeModel)
        }
    }
    
}])

customDirective.directive('cpTreeList', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            treeModel:'='
        },
        templateUrl: "tree-list-template.html",
        link: function (scope, element, attrs) {
            
        },
        controller: function () {
            
        }

    }

}])


customDirective.directive('cpTreeListItem', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            treeListModel: '='
        },
        templateUrl: "tree-item-template.html",
        link: function (scope, element, attrs, ctrl) {
            scope.isExpand = false;
            scope.test = function () {
               //console.log('working')
            }

        }
    }

}])

//end tree component
//angular UI Grid pagination directive
customDirective.directive('cpGridPagination', [function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            gridApi: '='
        },
        templateUrl: 'grid-pagination-template.html',
        link: function (scope, element, attrs) {
            scope.gridPageNumber = 1;
            scope.onPageChange = function (obj) {
                scope.gridApi.pagination.seek(obj.gridPageNumber)
            }
            scope.getStartPageIndex = function () {
                var range = '';
                range += (scope.gridApi.pagination.getPage() > 1 ? ((scope.gridApi.pagination.getPage() - 1) * scope.gridApi.grid.options.paginationPageSize) : 1) + " - ";
                range += (scope.gridApi.pagination.getPage() != scope.gridApi.pagination.getTotalPages() ? (scope.gridApi.pagination.getPage() * scope.gridApi.grid.options.paginationPageSize) : (scope.gridApi.grid.options.totalItems));
                return range;
            }
            scope.gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                scope.gridPageNumber = newPage;
            });
        }
    }
}])



customDirective.directive('cpTabs', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'tab-template.html',
        scope:{
            getTab:'&'
        },
        link: function (scope, element, attrs, ctr) {
            

        },
        controller: function ($scope) {
            $scope.tabs = [];
            this.addTabs = function (newTab) {
                console.log('newTab' + $scope.tabs.length)
                $scope.tabs.push(newTab);
                if ($scope.tabs.length == 1) {
                    newTab.selected = true;
                }
            }

            $scope.selectedTab = function (tab) {
                angular.forEach($scope.tabs, function (tab) {
                    tab.selected = false;
                });
                $scope.getTab({ 'tab': tab })
                tab.selected = true;
            }

        }
    }
})

customDirective.directive('cpTab', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '?^cpTabs',
        transclude: true,
        template: "<div ng-show='selected' ng-transclude></div>",
        scope: {
        },
        link: function (scope, element, attrs, ctrl) {
            scope.title = attrs.title;
            scope.id = attrs.id;
            scope.selected = false;
            ctrl.addTabs(scope);

        }
    }
})
/*
customDirective.filter('dateFormatter', function () {
    return function (input, format) {
        //if(input )    

    }
    
})*/
customDirective.directive('cpPageTitle', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: '@',
            iconImg: '@'
        },
        template: "<h3><span ng-if='iconImg'><img ng-src={{iconImg}} alt='icon'/></span>{{title}}</h3>"
    }
})

customDirective.directive('helpContent', ['$compile', function ($compile) {
    return {
        link: function (scope, element, attrs) {
            var dataContent = attrs.helpContent;
            var nodeType = element[0];
            if (nodeType.nodeName != "INPUT") {
                element.after($compile('<a href="javascript:void(0)" style="margin-left:3px; vertical-align: middle; margin-top: -3px;" data-toggle="popover" data-trigger="hover" data-placement="right" data-placement="bottom" data-content="' + dataContent + '" class="glyphicon glyphicon-question-sign"> </a>')(scope));
                $('[data-toggle="popover"]').popover();
            }
        }
    }
}]);

