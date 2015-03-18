/// <reference path="../Scripts/_ref.js" />
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('testBuildCtrl', ['$http', buildTestBuildController]);
    function buildTestBuildController($http) {
        var me = this;
        initialize();
        function initialize() {
        }
    }
})();