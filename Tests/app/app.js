(function(){
    'option strict';
    var app = angular.module('app', []);

    app.controller('listCtrl', ['$http', buildListController]);
    app.controller('testCtrl', ['$http', buildTestController]);

    function buildListController($http) {
        var me = this;
    }

    function buildTestController($http) {
        var me = this;
    }

})()
