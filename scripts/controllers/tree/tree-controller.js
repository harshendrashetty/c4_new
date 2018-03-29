define(function () {
    var treeModule = angular.module('peshi');
    treeModule.registerController('TreeController', ['$scope', function ($scope) {

        $scope.treeModel = [{ "id": "ajson1", "parent": "#", "text": "Simple root node" },
                            { "id": "ajson2", "parent": "#", "text": "Root node 2" },
                            { "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
                            { "id": "ajson4", "parent": "ajson2", "text": "Child 2" },
                           { "id": "ajson5", "parent": "ajson1", "text": "Child 3" }]

        $scope.readyCB = function () {
            console.log('tree is loaded');

        }

        $scope.changeTree = function (e, data) {
            console.log(data);
        }
        $scope.openNodeCB = function (e, data) {
            console.log(data);
        }

    }])

})