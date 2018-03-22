angular.module('kg-App').service('loginService', function($http){

    // this.register = (new_user) => {
    //     return $http({
    //       method: 'POST',
    //       url: '/register',
    //       data: new_user
    //     }).then((response) => {
    //       console.log("loginService: ", response);
    //       return response;
    //     });
    //   };
    
      this.login = function(user) {
        return $http({
          method: 'POST',
          url: '/login',
          data: user
        }).then(function(response) {
          return response;
        });
      };
    
      // this.logout = function() {
      //   return $http({
      //     method: 'GET',
      //     url: '/logout'
      //   }).then(function(response) {
      //     return response;
      //   });
      // };
    
      // this.getCurrentUser = function() {
      //   return $http({
      //     method: 'GET',
      //     url: '/me'
      //   })
      // };
    
      // this.registerUser = function(user) {
      //   return $http({
      //     method: 'POST',
      //     url: '/register',
      //     data: user
      //   }).then(function(response) {
      //     return response;
      //   });
      // };
    
      // this.editUser = function(id, user) {
      //   return $http({
      //     method: 'PUT',
      //     url: "/user/" + id,
      //     data: user
      //   }).then(function(response) {
      //     return response;
      //   });
      // };
    
      // //USERSERVICE//
      // this.getUser = function() {
      //   return $http({
      //     method: 'GET',
      //     url: '/user'
      //   }).then(function(response) {
      //     return response;
      //   });
      // };
    
      // this.getUserById = function(id) {
      //   return $http({
      //     method: 'GET',
      //     url: '/user?_id=' + id
      //   }).then(function(response) {
      //     return response;
      //   });
      // };
});