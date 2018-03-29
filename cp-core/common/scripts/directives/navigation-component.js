define(function () { 
    var navComponent = angular.module('navigation.component', []);

    navComponent.directive('cpIcon', function () {
        return {
            templateUrl: "icon-template.html",
            restrict: 'EA',
            scope: {
                iconClass: '@',
                color: '@',
                size: '@'
            },
            link: function (scope, element, attrs) {
                element.find('i').addClass('cp-icon-' + scope.iconClass);
            }
        };
    });
    navComponent.directive('cpMasterHead', function () {
        return {
            restrict: 'E',
            templateUrl: 'master-head-tempalate.html',
            scope: {
                applicationName: '@',
                applicationSubName: '@',
                navigationModel: '=',
                applicationLogo: '@',
                applicationHref: '@',
                applicationLogoPath: '@'
            },
            transclude: true,
            replace: true,
            controller: ['$scope', function ($scope) {
                var self = this;
                self.closeMegaMenu = function () {
                    $scope.isShowMegaMenu = false;
                }
            }],
            link: function (scope, element, attrs) {
                if (scope.navigationModel) {
                    scope.megaMenuArrow = true;
                    scope.isShowMegaMenu = false;
                    scope.isPined = false;
                    var showMegaMenu = false;
                    scope.showMasterMenu = function () {
                        scope.isShowMegaMenu = !scope.isShowMegaMenu;
                        showMegaMenu = true;
                    }
                    scope.showSkinnyMenu = function () {
                        scope.isShowMegaMenu = false;
                        scope.isPined = !scope.isPined;
                        element.toggleClass('enable-sticky');
                    }
                } else {
                    scope.megaMenuArrow = false;
                    element.find('.brand-name.master-brand-name').attr('href', scope.applicationHref)
                }
            }
        }
    });
    navComponent.directive('cpMegaMenu', [function () {
        return {
            restrict: 'E',
            replace: true,
            require: '?^cpMasterHead',
            navigationModel: '=',
            templateUrl: 'megamenu-template.html',
            link: function (scope, element, attrs, ctrl) {
                scope.singleMenus = [];
                scope.nestedMenus = [];
                element.on('click', function (event) {

                    ctrl.closeMegaMenu();
                })
                angular.forEach(scope.navigationModel, function (value) {
                    if (value.children != undefined) {
                        if (value.children.length) {
                            scope.nestedMenus.push(value)
                        } else {
                       
                        }
                    } else {
                        scope.singleMenus.push(value);

                    }               
                })

            }
        }
    }]);

    navComponent.directive('cpControlNavigation', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: 'nav-control.html',
            link: function (scope, element, attrs) {

            }
        }
    });

    navComponent.directive('cpDropDownButton', ['$document', function ($document) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: "drop-down-button-template.html",
            scope: {
                templatePath: '@',
                cpData: '=',
                title: '@'
            },
            link: function (scope, element, attrs) {
                scope.active = false;
                scope.url = scope.templatePath;
                scope.titleTooltip = scope.title;
               
                if (scope.title) {
                    element.find('a').attr('title', scope.title);
                }
                scope.showDrop = function () {
                    scope.active = !scope.active;
                }
                //click on outside dropdown will hide
                $document.bind('click', function (event) {
                    var isClickedElementChildOfPopup = element.find(event.target).length > 0;
                    if (isClickedElementChildOfPopup) {
                    } else {
                        scope.active = false;
                    }
                });
                
            }
        }

    }]);

    /*
    navComponent.directive('cpTopRightControlButton', function ($document) {
        return {
            template: "<li class=''><a href='javascript:void(0)' ng-transclude></a> <div class='control-dropdown' ng-if='active' ><span ng-include='url'> </span> </div> </li>",
            restrict: 'EA',
            transclude: true,
            replace: true,
            require: '^cpControlNavigation',
            scope: {
                cpData: '=',
                templatePath: '@',
                link:'@'
            },
            link: function (scope, element, attrs, ctrl) {
                scope.active = false;
                scope.url = ''
                ctrl.addScope(scope);

                if (scope.link == '' || scope.link == undefined) {
                    //click on dropdown not hide
                    console.log('empty or undefined');
                    element.bind('click', function (event) {
                        ctrl.showDropDown(scope);
                        scope.url = scope.templatePath;
                    });
                } else {
                    console.log('defined link');
                    element.find('a').attr('href', scope.link);
                }

                //click on outside dropdown will hide
                $document.bind('click', function () {
                    var isClickedElementChildOfPopup = element.find(event.target).length > 0;
                    if (isClickedElementChildOfPopup) {
                    } else {
                        scope.active = false;
                    }
                });

            }
        };
    });

    */

    navComponent.directive('cpTopNavigation', [function () {
        return {
            restrict: 'E',
            scope: {
                navigationModel: '=',
                onModal:'='
            },
            replace: true,
            templateUrl: 'top-navigation-template.html',
            controller: function ($scope) {
                $scope.showPopup = function (label) {
                    $scope.onModal(label);
                }
                this.showModal = function (label) {
                    $scope.onModal(label);
                }
            },
            link: function (scope, element, attrs) {
                
            }
        }
    }]);


    navComponent.directive('cpTopNavigationList', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                navItem: '='
            },
            replace: true,
            templateUrl: 'top-navigation-list-template.html',
               
            link: function (scope, element, attrs) {
               
            }
        }
    }]);

    navComponent.directive('cpTopNavigationListPopUp', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                navItem: '='
            },
            require: '^cpTopNavigation',
            replace: true,
            templateUrl: 'top-navigation-popup-list-template.html',

            link: function (scope, element, attrs, ctrl) {
                scope.showPopup = function (message) {
                    ctrl.showModal(message)
                }

            }
        }
    }]);



    

    navComponent.directive('cpTopSubNavigation', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                navItem: '='
            },
            replace: true,
            templateUrl: 'top-sub-navigation-template.html',
            link: function (scope, element, attrs) {
            }
        }
    }]);
    /*
    navComponent.directive('cpSubNavigationItems', [function () {
        return {
            restrict: 'E',
            scope: {
                subItems: '='
            },
            replace: true,
            templateUrl: 'sub_navigationslist.html',
            link: function (scope, element, attrs) {
            }
        }
    }]);
    */
    navComponent.directive('cpMasterheadSearch', function () {
        return {
            restrict: 'E',
            templateUrl: 'search-template.html',
            replace: true,
            link: function (scope, element, attrs) {

            }
        }
    });


    /*
    navComponent.directive('cpAlertItems', function () {
        return {
            restrict: 'E',
            scope: {
                alertItems : '='
            },
            templateUrl: 'cp-alert-template.html',
            replace: true,
            link: function (scope, element, attrs) {
            
            }
        }
    });
    */
    navComponent.directive('listNavigation', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^cpLeftNavigation',
            scope: {
                navList: '='
            },
            templateUrl: "left-navigation-list-template.html",
            link: function (scope, element, attrs, ctrl) {
                scope.subMenu = scope.navList.subMenu;
              ///  scope.select = false;
                var newScope = scope.$new();

                if (scope.subMenu.length) {
                    element.attr({ 'data-toggle': 'collapse', 'data-target':'#'+scope.navList.id, 'aria-expanded': 'true' })
                    var ele = angular.element("<ul class='cpc-left-subnav nav collapse' id='" + scope.navList.id + "' aria-expanded='true'><list-navigation ng-repeat='navigationItem in subMenu' nav-list='navigationItem'></list-navigation></ul>");
                    element.after($compile(ele)(newScope));
                }
                element.on('click', function () {
                    ctrl.selected(scope)
                })
                scope.showPopup = function (label) {
                    ctrl.showPopup(label)
                }

                ctrl.addMenu(scope);
            }
        }
    }]);


    navComponent.directive('cpLeftNavigation', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                navigationModel: '=',
                onModal: '='
            },
            templateUrl: "left-navigation-template.html",
            controller: function ($scope) {
               var self = this;
               var menuItems = self.menuItems = [];
               self.selected = function (scope) {
                   angular.forEach(self.menuItems, function (scope) {
                       scope.select = false;
                   });
                   scope.select = true;
               }
               self.addMenu = function (scope) {
                   self.menuItems.push(scope);
                   if (self.menuItems.length == 1) {
                       scope.select = true;
                   }
               }

               self.showPopup = function (message) {
                   $scope.onModal(message)
               
               }
        

            }
        }
    });

    navComponent.directive('cpSliderBox', ['$document', function ($document) {
        return {
            restrict: "E",
            replace: true,
            transclude:true,
            template: "<div>" +
                    "<div ng-show='toggleMenu' class='details-slider-cover'></div>" +
                    "<div class='details-slider-container'>" +
                        "<div ng-click='toggleSlideMenu()' style='position:absolute; top:50%; left:-40px; padding:11px 13px; background:#007DB8;color:#fff; cursor:pointer;'>" +
                            "<span class='glyphicon glyphicon-chevron-left' ng-class='{\"glyphicon-chevron-left\":!toggleMenu, \"glyphicon-chevron-right\":toggleMenu}'></span>" +
                        "</div>" +
                        "<div ng-transclude></div>" +
                    "</div>"+
                +"</div>",
            link: function (scope, element, attrs) {
                scope.toggleMenu = false;
                var sliderWidth = attrs.cpWidth || '80%';
                scope.toggleSlideMenu = function () {
                    hideSlide();
                }
                function hideSlide() {
                    scope.toggleMenu = !scope.toggleMenu;
                    var ele = element.find('.details-slider-container');
                    if (scope.toggleMenu) {
                        $(ele).css('width', sliderWidth);
                    } else {
                        $(ele).css('width', '0px');
                    }
                }
                $document.bind('keydown keypress', function (event) {
                    if (event.which === 27) {
                        if (scope.toggleMenu) {
                            hideSlide();
                            scope.$apply();
                        }
                    }
                })
            }
        }
    }])



})