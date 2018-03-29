requirejs.config({
    baseUrl:'',
    paths: {
        'jquery': 'cp-core/common/library/jquery-1.9.1.min',
        'bootstrap': 'cp-core/common/library/bootstrap.min',
        'angular': 'cp-core/common/library/angular.min',
        'angular-animate': 'cp-core/common/library/angular-animate',
        'angular-message': 'cp-core/common/library/angular-messages.min',
        'angular-sanitize': 'cp-core/common/library/angular-sanitize.min',
        'angular-route': 'cp-core/common/library/AngularUI/ui-router.min',
        'angular-translate': 'cp-core/common/library/angular-translate.min',
        'angular-datepicker': 'cp-core/common/library/angular-datepicker',
        'ui-grid': 'cp-core/common/library/ui-grid',
        'libD3': 'cp-core/common/library/d3.min',
        'libnvD3': 'cp-core/common/library/nv.d3.min',
        'angular_nvd3': 'cp-core/common/library/angular-nvD3',


        'angularModalService': 'cp-core/common/library/angular-modal-service',
        'lazyLoad': 'cp-core/common/library/ocLazyLoad',
        'jstree': 'cp-core/common/library/jstree.min',

        'jstree-directive': 'cp-core/common/scripts/directives/jsTree.directive',
        //js tree library
        

       
        //template cache 
        'cp-template': 'cp-core/common/template/cp-templates',

        
        //Custom Directive 
        'element-directives': 'cp-core/common/scripts/directives/input-component',
        'navigation-element': 'cp-core/common/scripts/directives/navigation-component',
        'alert-element': 'cp-core/common/scripts/directives/modal-component',
        
        //angular configuration and module 
        'config': 'scripts/config',


        //services
       'alertmodalService': 'cp-core/common/scripts/services/alert-services',

        //translation 
        'locale-en':'cp-core/localization/locale-en',
        'locale-de': 'cp-core/localization/locale-de'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'libnvD3': {
            deps: ['libD3']
        },
        'angular_nvd3': {
            deps: ['angular', 'libnvD3']
        },        
       'angular-route': {
            deps: ['angular']
        },
        'angular-message': {
            deps: ['angular']
        },
        'angular-translate': {
            deps: ['angular',  'angular-sanitize']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-datepicker': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'element-directives':{
            deps:['angular']
        },
        'navigation-element': {
            deps:['angular']
        },
        'alertmodalService': {
            deps: ['angular']
        },
        'angularModalService': {
            deps: ['angular']
        },
        'alert-element': {
            deps:['angular']
        },
        'cp-template': {
            deps:['angular']        
        },
        'jstree-directive': {
            deps: ['angular']
        },
        'ui-grid': {
            deps: ['angular']
        },
    'lazyLoad': {
            deps:['angular']
        },
        'config': {
            deps: ['locale-en', 'locale-de', 'angular-route', 'angular-animate', 'angular-message', 'angular-sanitize', 'angular-translate', 'cp-template', 'element-directives', 'navigation-element', 'jstree', 'jstree-directive', 'alert-element', 'bootstrap', 'alertmodalService', 'angular-datepicker', 'lazyLoad', 'angularModalService', 'ui-grid', 'libD3', 'libnvD3', 'angular_nvd3']
        }
        
    }
})



requirejs(['config'], function () {
})

