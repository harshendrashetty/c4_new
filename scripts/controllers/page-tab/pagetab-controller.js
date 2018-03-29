define(function () {
    var pageTabModule = angular.module('peshi');
    pageTabModule.registerController('TabController', ['$scope', '$state', function ($scope, $state) {
        $scope.pageTabs = [{ label: 'Angularjs', link: 'tab.angular' },
          { label: 'React', link: 'tab.react' },
          { label: 'Meteor', link: 'tab.meteor' },
          { label: 'Backbone', link: 'tab.backbone' }
        ];

    }]);

})
