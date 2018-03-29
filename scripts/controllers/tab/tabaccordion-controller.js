
define(function () {
    var componentModule = angular.module('peshi')
    componentModule.registerController('TabaccordionCtrl', ['$scope', '$state', '$location', function ($scope, $state, $location) {
        $scope.pageTabs = [{ label: 'Angularjs', link: 'tabAccordion.angular' },
           { label: 'React', link: 'tabAccordion.react' },
           { label: 'Meteor', link: 'tabAccordion.meteor' },
           { label: 'Backbone', link: 'tabAccordion.backbone' }
        ];
        
        var pathLavel = $location.path().split('/').length;
        if (pathLavel < 3) {
            $state.go('tabAccordion.angular');
        }

        $scope.accordionData = [
           { label: 'Angularjs', templateUrl: '/views/tabs/angular.html' },
           { label: 'React', templateUrl: '/views/tabs/react.html' },
           { label: 'Meteor', templateUrl: '/views/tabs/meteor.html' },
           { label: 'Backbone', templateUrl: '/views/tabs/backbone.html' }

        ]



    }]);
})
