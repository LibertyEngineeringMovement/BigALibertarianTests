/// <reference path="../Scripts/_ref.js" />
(function(){
    'option strict';

    var app = angular.module('app', [
        'ngRoute',
        'ngSanitize'
    ]);

    app.config(['$routeProvider', buildRoute]);

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
          when('/build', {
              templateUrl: 'app/test/testBuild.html',
              controller: 'testBuildCtrl',
              controllerAs: 'ctrl'
          }).
          otherwise({
              redirectTo: '/lists'
          });
    }
})()
