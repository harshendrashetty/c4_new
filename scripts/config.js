define(function () {
    var cpModule = angular.module('peshi', ['ui.router', 'constant.module', 'factory.module', 'ui.grid', 'angularModalService', 'ngAnimate', 'custom.directive', 'navigation.component', 'pascalprecht.translate', 'ngMessages', 'cp.templates', 'alert.service', 'alertmodal.component', '720kb.datepicker', 'oc.lazyLoad', 'jsTree.directive', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.pagination', 'nvd3', 'template.controller']);

    require(['locale-en', 'locale-de'], function (translate_en, translate_de) {
        cpModule.config(function ($translateProvider) {
            $translateProvider.translations('en', translate_en);
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.translations('de', translate_de);
            $translateProvider.determinePreferredLanguage();
            $translateProvider.fallbackLanguage('en');
        });
    })
    //controller registration 
    cpModule.config(['$controllerProvider', function ($controllerProvider) {
        cpModule.registerController = $controllerProvider.register;
    }])
    //state routing configuration
    cpModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/home/home.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/schedule',
            templateUrl: '/views/home/schedule.html',
            controller: 'ScheduleController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/home/schedule-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('map', {
            url: '/map',
            templateUrl: '/views/home/map.html',
            controller: 'MapController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/home/map-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })

        .state('component', {
            url: '/component',
            templateUrl: '/views/component/component.html',
            controller: 'ComponentController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/component/component-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
         .state('manage', {
             url: '/manage',
             templateUrl: '/views/manage/manage.html',
             controller: 'ManageController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/manage-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
        .state('deployment', {
            url: '/deployment',
            templateUrl: '/views/deployment/deployment.html',
            controller: 'DeploymentController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/deployment/deployment-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('tabAccordion', {
            url: '/tabAccordion',
            templateUrl: '/views/tabs/tab.html',
            controller: 'TabaccordionCtrl',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/tab/tabaccordion-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
         .state('tree', {
             url: '/tree',
             templateUrl: '/views/tree/tree.html',
             controller: 'TreeController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/tree/tree-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
        .state('tabAccordion.angular', {
            url: '/angular',
            templateUrl: '/views/tabs/angular.html'
        })
        .state('tabAccordion.react', {
            url: '/react',
            templateUrl: '/views/tabs/react.html',
        })
        .state('tabAccordion.meteor', {
            url: '/meteor',
            templateUrl: '/views/tabs/meteor.html',
        })
        .state('tabAccordion.backbone', {
            url: '/backbone',
            templateUrl: '/views/tabs/backbone.html',
        })
        .state('devices', {
            url: '/device',
            templateUrl: '/views/manage/device/device.html',
            controller: 'DeviceController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/device-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('devices.details', {
            url: '/deviceDetails',
            templateUrl: '/views/manage/device/devicedetails.html',
            controller: 'DeviceDetailController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/device-details-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('devices.alets', {
            url: '/deviceAlerts',
            templateUrl: '/views/manage/device/devicealerts.html',
            controller: 'DeviceAlertController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/device-alert-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('deviceinfo', {
            url: '/deviceinfo/:id',
            templateUrl: '/views/manage/device/deviceinfo.html',
            controller: 'DeviceInfoController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/device-info-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('deviceinfo.overview', {
            url: '/overview',
            templateUrl: '/views/manage/device/overview.html',
            controller: 'OverviewController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/overview-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('deviceinfo.alerts', {
            url: '/alerts',
            templateUrl: '/views/manage/device/device-details-alerts.html',
            controller: 'DeviceDetailsAlertController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/device/device-details-alerts-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('devicesearch', {
            url: '/devicesearch',
            templateUrl: '/views/manage/devicesearch/devicesearch.html',
            controller: 'DeviceSearchController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/devicesearch/devicesearch-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
         .state('discoveryinventory', {
             url: '/discoveryinventory',
             templateUrl: '/views/manage/discoveryinventory/discoveryinventory.html',
             controller: 'DiscoveryInventoryController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/discoveryinventory/discovery-inventory-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
         .state('discoveryinventory.discoveryportal', {
             url: '/discoveryportal',
             templateUrl: '/views/manage/discoveryinventory/discoveryportal.html',
             controller: 'DiscoveryPortalController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/discoveryinventory/discovery-portal-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
         .state('discoveryinventory.alldiscoveryrange', {
             url: '/alldiscoveryrange',
             templateUrl: '/views/manage/discoveryinventory/alldiscoveryrange.html',
             controller: 'DiscoveryRangeController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/discoveryinventory/allDiscovery-range-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })

        .state('alerts', {
            url: '/alerts',
            templateUrl: '/views/manage/alerts/alerts.html',
            controller: 'ManageAlertController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/alerts/alert-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
         .state('alerts.logs', {
             url: '/logs',
             templateUrl: '/views/manage/alerts/logs.html',
             controller: 'LogController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/alerts/log-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
        .state('alerts.logs.alertLog', {
            url: '/alertlog',
            templateUrl: '/views/manage/alerts/alertlog.html',
            controller: 'AlertsLogController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/manage/alerts/log-tab-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('alerts.logs.alertdefinition', {
            url: '/alertdefinition',
            templateUrl: '/views/manage/alerts/alertdefinition.html',
        })
        .state('alerts.logs.alertprivacy', {
            url: '/alertprivicy',
            templateUrl: '/views/manage/alerts/alertpolicy.html',
        })




         .state('alerts.category', {
             url: '/category',
             templateUrl: '/views/manage/alerts/categories.html',
             controller: 'CategoryController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/alerts/category-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })

          .state('systemupdate', {
              url: '/systemupdate',
              templateUrl: '/views/manage/system-update/system-update.html',
              controller: 'SystemUpdateController',
              resolve: {
                  load: ['$q', function ($q) {
                      var deferred = $q.defer();
                      require(['scripts/controllers/manage/system-update/system-update-controller'], function () {
                          deferred.resolve();
                      });
                      return deferred.promise;
                  }]
              }
          })
         .state('systemupdate.home', {
             url: '/home',
             templateUrl: '/views/manage/system-update/home.html',
             controller: 'HomeController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/system-update/home-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
         .state('systemupdate.createupdate', {
             url: '/createupdate',
             templateUrl: '/views/manage/alerts/categories.html',
             controller: 'CategoryController',
             resolve: {
                 load: ['$q', function ($q) {
                     var deferred = $q.defer();
                     require(['scripts/controllers/manage/alerts/category-controller'], function () {
                         deferred.resolve();
                     });
                     return deferred.promise;
                 }]
             }
         })
            // discoveryinventory.alldiscoveryrange



        /*
          .state('device.alertLog', {
              url: '/alertlog',
              templateUrl: '/views/device/alertlog.html',
              controller: 'AlertlogController',
              resolve: {
                  load: ['$q', function ($q) {
                      var deferred = $q.defer();
                      require(['scripts/controllers/device/alertlog-controller'], function () {
                          deferred.resolve();
                      });
                      return deferred.promise;
                  }]
              }
          })
        .state('device.alertdefinition', {
            url: '/alertdefinition',
            templateUrl: '/views/device/alertdefinition.html',
        })
        .state('device.alertprivacy', {
            url: '/alertprivicy',
            templateUrl: '/views/device/alertpolicy.html',
        })

*/
        .state('development', {
            url: '/development',
            templateUrl: '/views/jobs/development.html',
            controller: 'DevelopmentController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/form/form-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }

        })
        .state('designer', {
            url: '/design',
            templateUrl: '/views/jobs/design.html'
        })
         .state('user', {
             url: '/user',
             templateUrl: '/views/settings/user.html'
         })
         .state('management', {
             url: '/management',
             templateUrl: '/views/settings/management.html',
             controller: 'ManageController',
             resolve: ['$q', function ($q) {
                 var deferred = $q.defer();
                 require(['scripts/controllers/manage/manage-controller'], function () {
                     deferred.resolve();
                 });
                 return deferred.promise;
             }]
         })
        .state('advanced', {
            url: '/advanced',
            templateUrl: '/views/settings/advanced.html'
        })
        .state('form', {
            url: '/form',
            templateUrl: '/views/component/form-component.html',
            controller: 'FormController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/form/form-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('applicationlog', {
            url: '/applicationlog',
            templateUrl: '/views/application-log/applicationlog.html',
            controller: 'ApplicationLogController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/application-log/application-log-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })

        .state('dellsolutions', {
            url: '/dellsolutions',
            templateUrl: '/views/dell-solutions/dellsolutions.html',
            controller: 'DellSolutionsController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/dell-solutions/dell-solutions-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
          .state('settings', {
              url: '/settings',
              templateUrl: '/views/settings/settings.html',
              controller: 'settingsController',
              resolve: {
                  load: ['$q', function ($q) {
                      var deferred = $q.defer();
                      require(['scripts/controllers/settings/settings-controller'], function () {
                          deferred.resolve();
                      });
                      return deferred.promise;
                  }]
              }
          })
        .state('settings.alerts', {
            url: '/alerts',
            templateUrl: '/views/settings/alerts.html',
            controller: 'ApplicationSettingController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/settings/application-settings-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('settings.customurl', {
            url: '/customurl',
            templateUrl: '/views/settings/custom-url.html',
            controller: 'ApplicationSettingController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/settings/application-settings-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('settings.deployment', {
            url: '/deployment',
            templateUrl: '/views/settings/deployment.html',
            controller: 'ApplicationSettingController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/settings/application-settings-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('settings.devicetree', {
            url: '/devicetree',
            templateUrl: '/views/settings/device-tree.html',
            controller: 'ApplicationSettingController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/settings/application-settings-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })
            .state('settings.discovery', {
                url: '/discovery',
                templateUrl: '/views/settings/discovery.html',
                controller: 'ApplicationSettingController',
                resolve: {
                    load: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(['scripts/controllers/settings/application-settings-controller'], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            })

             .state('settings.email', {
                 url: '/email',
                 templateUrl: '/views/settings/email.html',
                 controller: 'ApplicationSettingController',
                 resolve: {
                     load: ['$q', function ($q) {
                         var deferred = $q.defer();
                         require(['scripts/controllers/settings/application-settings-controller'], function () {
                             deferred.resolve();
                         });
                         return deferred.promise;
                     }]
                 }
             })
             .state('settings.general', {
                 url: '/general',
                 templateUrl: '/views/settings/general.html',
                 controller: 'ApplicationSettingController',
                 resolve: {
                     load: ['$q', function ($q) {
                         var deferred = $q.defer();
                         require(['scripts/controllers/settings/application-settings-controller'], function () {
                             deferred.resolve();
                         });
                         return deferred.promise;
                     }]
                 }
             })
             .state('settings.mobile', {
                 url: '/mobile',
                 templateUrl: '/views/settings/mobile.html',
                 controller: 'ApplicationSettingController',
                 resolve: {
                     load: ['$q', function ($q) {
                         var deferred = $q.defer();
                         require(['scripts/controllers/settings/application-settings-controller'], function () {
                             deferred.resolve();
                         });
                         return deferred.promise;
                     }]
                 }
             })
            .state('settings.purge', {
                url: '/purge',
                templateUrl: '/views/settings/purge.html',
                controller: 'ApplicationSettingController',
                resolve: {
                    load: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(['scripts/controllers/settings/application-settings-controller'], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            })
             .state('settings.task', {
                 url: '/task',
                 templateUrl: '/views/settings/task.html',
                 controller: 'ApplicationSettingController',
                 resolve: {
                     load: ['$q', function ($q) {
                         var deferred = $q.defer();
                         require(['scripts/controllers/settings/application-settings-controller'], function () {
                             deferred.resolve();
                         });
                         return deferred.promise;
                     }]
                 }
             })
            .state('settings.warranty', {
                url: '/warranty',
                templateUrl: '/views/settings/warranty.html',
                controller: 'ApplicationSettingController',
                resolve: {
                    load: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(['scripts/controllers/settings/application-settings-controller'], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            })


        .state('applicationdetails', {
            url: '/application/:id',
            templateUrl: '/views/application/appdetails.html'
        })
        .state('reports', {
            url: '/reports',
            templateUrl: '/views/reports/report.html',
            controller: 'ReportController',
            resolve: {
                load: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require(['scripts/controllers/reports/report-controller'], function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        })



    }])

    require(['scripts/controller-reference'], function (refrence) {
        require(refrence, function () {
            angular.bootstrap(document, ['peshi']);
        })
    })
})

