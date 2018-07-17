

angular.module('kg-App', ['ui.router','ngMaterial','ngMessages'])
.config(function($stateProvider, $urlRouterProvider ){

  // stripeProvider.setPublishableKey('pk_test_jlM2VKn7ZAbrk1hImLtHoJ4e');
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
    controller: "adminCtrl"
  })
  .state('nextsession', {
    url: '/nextsession',
    templateUrl:'./views/nextsession.html',
    controller: "loginCtrl"
  })
  .state('changesession', {
    url: '/changesession',
    templateUrl:'./views/changesession.html',
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
    controller: "adminCtrl"
  })
  .state('user', {
    url: '/user',
    templateUrl:'./views/user.html',
    controller: "loginCtrl"
  })
  .state('admin', {
    url: '/admin',
    templateUrl:'./views/admin.html',
    controller: "adminCtrl"
  })
  .state('superadmin', {
    url: '/superadmin',
    templateUrl:'./views/superadmin.html',
    controller: "adminCtrl"
  })
});