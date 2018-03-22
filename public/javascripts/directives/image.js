angular.module('kg-App').directive('imageTemplate', function() {
    return {
      restrict: 'EA',
      templateUrl:"./views/directiveviews/imagetemplate.html",
      controller: "mainCtrl"
    }
  });