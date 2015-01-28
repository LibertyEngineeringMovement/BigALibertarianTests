/// <reference path="../Scripts/_ref.js" />
(function(){
    'option strict';
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', buildRoute]);

    app.controller('listCtrl', ['$http', buildListController]);
    app.controller('testCtrl', ['$http', '$routeParams', buildTestController]);

    function buildRoute($routeProvider) {

        $routeProvider.
          when('/lists', {
              templateUrl: 'app/test/testList.html',
              controller: 'listCtrl',
              controllerAs: 'ctrl'
          }).
          when('/test/:testId', {
              templateUrl: 'app/test/testDetail.html',
              controller: 'testCtrl',
              controllerAs: 'ctrl'
          }).
          otherwise({
              redirectTo: '/lists'
          });
    }

    function buildListController($http) {
        var me = this;

        initialize();

        function initialize() {

            toastr.info("Loading Test Catalog");

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

    function buildTestController($http, $routeParams) {
        var me = this;
        me.selection = '';

        initialize();

        function initialize() {

            toastr.info("Loading the Test");

            me.selection = $routeParams.testId;

            $http.get('TestRepository/Test' + ('000' + me.selection.toString()).right(3) + '.json')
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

})()
