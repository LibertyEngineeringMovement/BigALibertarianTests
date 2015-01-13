(function(){
'option strict';
      var appx = angular.module('appx', []);
      appx.controller('xCtrl', function ($scope) {
        reset($scope)();
        $scope.reset = reset($scope);
        $scope.getTotal = function(){
          return ($scope.q0 
            + $scope.q1 
            + $scope.q2 
            + $scope.q3 
            + $scope.q4 
            + $scope.q5 
            + $scope.q6 
            + $scope.q7 
            + $scope.q8 
            + $scope.q9);
        };
      });
      function reset($scope){
        return function(){
          $scope.currentPanel=0; 
          $scope.q0 = 0; 
          $scope.q1 = 0; 
          $scope.q2 = 0; 
          $scope.q3 = 0; 
          $scope.q4 = 0; 
          $scope.q5 = 0; 
          $scope.q6 = 0; 
          $scope.q7 = 0; 
          $scope.q8 = 0; 
          $scope.q9 = 0;
        }
      }

})()
