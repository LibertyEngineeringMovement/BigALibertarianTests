/// <reference path="../Scripts/_ref.js" />
(function () {
    'use strict';
    var app = angular.module('app');

    app.controller('testBuildCtrl', ['$http', buildTestBuildController]);
    app.directive('inputFile', buildFileHandlerDirective);

    function buildTestBuildController($http) {
        var me = this;
        me.test = {};
        me.tabid === 0;

        me.changeTab = changeTab;

        initialize();
        function initialize() {
        }

        function changeTab(TabId) {
            if (me.tabid === TabId) {
                me.tabid = -1;
            }
            else {
                me.tabid = TabId;
            }
        }
    }

    function buildFileHandlerDirective() {
        return {
            scope: {
                fileModel: "="
            },
            restrict: 'E',
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    var rawData = {};

                    //reader.onabort = function (eventArg) { console.log("ABORT!", eventArg); };
                    //reader.onerror = function (eventArg) { console.log("ERROR!", eventArg); };
                    //reader.onloadstart = function (eventArg) { console.log("START!", eventArg); };
                    //reader.onloadend = function (eventArg) { console.log("END!", eventArg); };
                    //reader.onprogress = function (eventArg) { console.log("PROGRESS!", eventArg); };

                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            rawData = loadEvent.target.result;
                            scope.fileModel = JSON.parse(rawData);
                            //console.log("READ!", rawData);
                        });
                        //console.log("LOAD!", loadEvent);
                    }
                    reader.readAsText(changeEvent.target.files[0]);
                    //console.log("FILES!", changeEvent.target.files);
                });
            },
            template: '<input type="file" class="form-control" accept="application/json" />'
        }
    }

})();

