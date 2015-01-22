/// <reference path="../Scripts/_ref.js" />
(function(){
    'option strict';
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', buildRoute]);

    app.controller('listCtrl', ['$http', buildListController]);
    app.controller('testCtrl', ['$http', buildTestController]);

    function buildRoute($routeProvider) {
        toastr.info("Building Route");

        $routeProvider.
          when('/lists', {
              templateUrl: 'app/test/testList.html',
              controller: 'listCtrl',
              controllerAs: 'ctrl'
          }).
          when('/test/:testId', {
              templateUrl: 'test/testDetail.html',
              controller: 'testCtrl'
          }).
          otherwise({
              redirectTo: '/lists'
          });
    }

    function buildListController($http) {
        var me = this;

        initialize();

        function initialize() {

            toastr.info("Initializing List");

            $http.get('TestRepository/TestIndex.json')
                .success(function (data, status, headers, config) {
                    toastr.success('Got Data', status);
                    me.tests = data;
                })
                .error(function (data, status, headers, config) {
                    toastr.error("Didn't get data.", data);
                    me.tests = [];
                })
        }
    }

    function buildTestController($http) {
        var me = this;
    }

})()
