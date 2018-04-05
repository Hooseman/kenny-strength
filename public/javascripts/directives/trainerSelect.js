angular.module('kg-App').directive('trainerSelectTemplate', function() {
    return {
      restrict: 'EA',
      templateUrl:"./views/directiveviews/trainerSelectTemplate.html",
      controller: "mainCtrl"
    }
  });