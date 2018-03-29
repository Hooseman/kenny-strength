angular.module('kg-App').service('loginService', function ($http) {

  this.registerUser = (new_user) => {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then((response) => {
      return response;
    });
  };

  this.login = function(username, password) {
    return $http.post('/login', {username: username, password: password})
    .then(function success(response) {
        return response.data;
    }, function err(err) {
        return err.data;
    });
};

this.getUser = function() {
    return $http.get('/me')
    .then(function(response) {
        return response.data;
    });
};

this.logout = function() {
    return $http.get('/logout')
    .then(function(response) {
        return response.data;
    });
};

// this.getUserData = function(id) {
//   return $http.get('/getUser/' + id).then(function(response) {

//       return response.data;
//   })
// }

  // this.getAll = function (){
  //   return $http.get('/get-all').then(function(response){
  //     return response.data;
  //   })
  // }
});