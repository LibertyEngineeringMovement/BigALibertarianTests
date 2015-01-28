/// <reference path="../Scripts/_ref.js" />
(function(){
    'option strict';
    var app = angular.module('app', [
        'ngRoute',
        'ngSanitize'
    ]);

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
        me.currentQuestionIdx = 0;
        me.questionCount = 0;
        me.progressPercent = 100;
        me.showAssumptions = true;
        me.questionText = '';
        me.buttons = [];
        me.score = 0;
        me.summaryVisible = false;
        me.currentQuestionObj = {};
        me.btnComment = '';

        me.selectAnswer = selectAnswer;
        me.nextQuestion = nextQuestion;
        me.toggleAssumptions = toggleAssumptions;
        

        initialize();

        function initialize() {

            toastr.info("Loading the Test");

            me.selection = $routeParams.testId;

            $http.get('TestRepository/Test' + ('000' + me.selection.toString()).right(3) + '.json')
                .success(function (data, status, headers, config) {
                    toastr.success('Test Loaded');
                    prepareTestPage(data);
                })
                .error(function (data, status, headers, config) {
                    toastr.error("Didn't get test.");
                    me.test = [];
                })

        }

        function prepareTestPage(data) {
            me.test = data;
            me.questionCount = me.test.questions.length;

            if (me.questionCount === 0) { //we are done.
                toastr.warning('There are no questions.');
                return;
            } 

            me.progressPercent = (me.currentQuestionIdx / me.questionCount) * 100;

            loadQuestion();
        }

        function toggleAssumptions() {
            me.showAssumptions = !me.showAssumptions;
        }

        function selectAnswer(button) {

            for (var i = 0; i < me.buttons.length; i++) {
                me.buttons[i].selected = false;
            }
            button.selected = true;
            me.btnComment = button.selectedComment;

        }

        function nextQuestion() {
            me.currentQuestion = me.currentQuestion + 1;

            loadQuestion();
        }

        function loadQuestion() {
            if (me.currentQuestionIdx < me.questionCount) {
                me.currentQuestionObj = me.test.questions[me.currentQuestionIdx];
                me.questionText
                    = me.currentQuestionObj.question;
                me.buttons
                    = me.currentQuestionObj.buttons;
            }
            else {
                me.summaryVisible = true;
            }
        }
    }

})()
