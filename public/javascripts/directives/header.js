angular.module('kg-App').directive('headerTemplate', function() {
    return {
      restrict: 'EA',
      templateUrl:"./views/directiveviews/headertemplate.html",
      controller: "mainCtrl"
    }
  });