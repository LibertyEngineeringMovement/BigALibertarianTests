/// <reference path="../Scripts/_ref.js" />
(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('listCtrl', ['$http', buildListController]);


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

})();