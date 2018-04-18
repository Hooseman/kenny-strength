

angular.module('kg-App', ['ui.router','ngMaterial','ngMessages'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl:'./views/login.html',
    controller: "loginCtrl"
  })
  .state('adminlogin', {
    url: '/adminlogin',
    templateUrl:'./views/adminlogin.html',
    controller: "adminLoginCtrl"
  })
  .state('nextsession', {
    url: '/nextsession',
    templateUrl:'./views/nextsession.html',
    controller: "loginCtrl"
  })
  .state('newuser', {
    url: '/newuser',
    templateUrl:'./views/newformviews/newuserTemplate.html',
    controller: "loginCtrl"
  })
  .state('newadmin', {
    url: '/newadmin',
    templateUrl:'./views/newformviews/newadminTemplate.html',
    controller: "mainCtrl"
  })
  .state('admin', {
    url: '/admin',
    templateUrl:'./views/admin.html',
    controller: "adminCtrl"
  })
  .state('superadmin', {
    url: '/superadmin',
    templateUrl:'./views/superadmin.html',
    controller: "superadminCtrl"
  })
});