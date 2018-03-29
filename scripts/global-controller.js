define(function () {
    var cpModule = angular.module('peshi');
    cpModule.controller('GlobalController', ['$scope', '$rootScope', '$ocLazyLoad', 'ModalService', function ($scope, $rootScope, $ocLazyLoad, ModalService) {


        $scope.aboutOME = function () {
            $ocLazyLoad.load('scripts/controllers/modals/modal-controller.js').then(function () {
                ModalService.showModal({
                    templateUrl: "/views/content/about.html",
                    controller: "ModalController"
                }).then(function (modal) {
                    // modal.element.modal();
                    modal.close.then(function (result) {
                        //this section will execute when close the modal
                    });
                });
            });


          
        }



        $scope.leftNavigationData = [
           { label: 'Home', link: 'home', id: 'home', subMenu: [] },
           { label: 'Form', link: 'form', id: 'profile', subMenu: [] },
           { label: 'Tree Component', link: 'tree', id: 'treee', subMenu: [] },
           { label: 'Tabs & Accordions', link: 'tabAccordion', subMenu: [] },
          {
              label: 'UI Element', link: '#', id: 'UIElement', subMenu: [
                   { label: 'CSS3 Animation', link: '#/cssAnimation', subMenu: [] },
                   { label: 'General', link: '#/general', subMenu: [] },
                   { label: 'Buttons', link: '#/buttons', subMenu: [] },
                   { label: 'Typography', link: '#/typography', subMenu: [] },
                   { label: 'FontAwesome', link: '#/fontAwesome', subMenu: [] },
                   { label: 'Slider', link: '#/slider', subMenu: [] },
                   { label: 'Panels', link: '#/panels', subMenu: [] },
                   { label: 'Widgets', link: '#/widgets', subMenu: [] },
                   { label: 'Bootstrap Model', link: '#/bootstrap', subMenu: [] }
              ]
          },
           { label: 'About', link: '#/about', subMenu: [] },
           { label: 'Contact Us', id: 'contactus',  link: '#/contactus', subMenu: [] },
           { label: 'Messages', id: 'messages', link: '#/messages', subMenu: [] }
        ];

        $scope.stickyNavigationData = [
                        {
                            label: "Home",
                            icon: "home",
                            link: 'home'
                        }, {
                            label: "Component",
                            icon: "tasks",
                            link: 'component'
                        }, {
                            label: "Manage",
                            icon: "user",
                            link: 'manage'
                        }, {
                            label: "Deployment",
                            icon: "tags",
                            link: 'deployment'
                        }, {
                            label: "Devices",
                            icon: "refresh",
                            link: '.',
                            children: [{
                                label: "Server",
                                icon: 'defrag',
                                link: 'server'
                            }, {
                                label: "PDU",
                                icon: 'convert',
                                link: 'pdu'
                            }, {
                                label: "Chassis",
                                icon: 'convert',
                                link: 'chasis'
                            }]
                        }, {
                            label: "Jobs",
                            icon: "refresh",
                            link: '.',
                            children: [{
                                label: "Development",
                                icon: 'defrag',
                                link: 'development'
                            }, {
                                label: "Designer",
                                icon: 'convert',
                                link: 'designer'
                            }]
                        },  {
                            label: "Settings",
                            icon: "wrench",
                            link: 'javascript:void(0)',
                            children: [{
                                label: "Users",
                                icon: 'user',
                                link: 'user'
                            }, {
                                label: "Appliance Management for the user portal",
                                icon: 'applicance',
                                link: 'management'
                            }, {
                                label: "Advanced",
                                icon: 'advanced',
                                link: 'advanced'
                            }]
                }];


        //top navigation Data
        $scope.topNavigationData = [{
            label: "Home",
            icon: "home",
            link: 'home'
        }, {
            label: "Component",
            icon: "tasks",
            link: 'component'
        }, {
            label: "Manage",
            icon: "user",
            link: 'manage'
        }, {
            label: "Deployment",
            icon: "tags",
            link: 'deployment'
        }, {
            label: "Devices",
            icon: "laptop",
            link: 'device'
        }, {
            label: "Jobs",
            icon: "refresh",
            link: '.',
            children: [{
                label: "Development",
                icon: 'defrag',
                link: 'development'
            }, {
                label: "Designer",
                icon: 'convert',
                link: 'designer'
            }]
        }, {
            label: "Settings",
            icon: "wrench",
            link: 'javascript:void(0)',
            children: [{
                label: "Users",
                icon: 'user',
                link: 'user'
            }, {
                label: "Appliance Management for the user portal",
                icon: 'applicance',
                link: 'management'
            }, {
                label: "Advanced",
                icon: 'advanced',
                link: 'advanced'
            }]
        }];
    //notification alert data
    $scope.alertsData = [
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "exclamation-triangle", "status": "warning", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "info-sign", "status": "info", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "exclamation-triangle", "status": "warning", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "info-sign", "status": "info", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "exclamation-triangle", "status": "warning", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" },
           { "name": "Admin", "icon": "times", "status": "danger", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy", "date": "20-16-2016" }
        ]

        // user dialog box data
    $scope.userDetails = { name: 'Abc', designation: 'Admin User', lastLogin: '08-11-2016' };

    $rootScope.$on('WizardService.open', function (event, data) {
        $ocLazyLoad.load('scripts/controllers/deployment/deplopmentWizard-controller.js').then(function () {
            ModalService.showModal({
                templateUrl: "views/wizard-template.html",
                controller: 'DevlopmentWizardController',
 
            }).then(function (modal) {
                //modal.element.modal();
                modal.close.then(function (result) {
                    $scope.message = result ? "You said Yes" : "You said No";
                });
            });


        })

    })




    }])

})
