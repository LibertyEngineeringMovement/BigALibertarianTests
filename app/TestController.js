(function () {
'use strict';

    var app = angular.module('app');

    app.controller('testCtrl', ['$http', '$routeParams', buildTestController]);

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
        me.score = [];
        me.scoreTotal = 0;
        me.resultMessage = '';


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
            me.score[me.currentQuestionIdx] = button.value;
            me.scoreTotal = Math.sum(me.score);

            me.btnComment = button.selectedComment;

        }

        function nextQuestion() {
            me.currentQuestionIdx = me.currentQuestionIdx + 1;

            loadQuestion();
        }

        function loadQuestion() {
            if (me.currentQuestionIdx < me.questionCount) {
                me.progressPercent = (me.currentQuestionIdx / me.questionCount) * 100;

                me.currentQuestionObj = me.test.questions[me.currentQuestionIdx];

                me.questionText
                    = me.currentQuestionObj.question;
                me.buttons
                    = me.currentQuestionObj.buttons;

                me.btnComment = '';
            }
            else {
                me.progressPercent = 100;
                me.summaryVisible = true;

                var msg = me.test.results.find(
                    function (row) {
                        return row.score === me.scoreTotal;
                    }).caption;

                me.resultMessage = msg || '';

            }
        }
    }


})();