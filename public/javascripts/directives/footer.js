angular.module('kg-App').directive('footerTemplate', function() {
    return {
      restrict: 'EA',
      templateUrl:"./views/directiveviews/footertemplate.html",
      controller: "mainCtrl"
    }
  });