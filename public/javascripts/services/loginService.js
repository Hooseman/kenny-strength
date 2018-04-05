angular.module('kg-App').service('loginService', function ($http) {

  this.registerUser = (user) => {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then((response) => {
      return response;
    });
  };

//   this.registerUser = (user) => {
//     return $http.post(`/register/${username}/${lastname}/${email}/${phone}/${password}/${birth_date}/${age}/${sex}/${clientaddress}/${city}/${zip}/${info}`)
// }

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

this.trainers = function (){
    return $http.get('/trainers').then(function(response){
      return response.data;
    })
  }

});