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
    

    this.registerSession = (user, user_id) => {
        return $http({
            method: 'POST',
            url: '/register-session/' + user_id,
            data: user
        }).then((response) => {
            // console.log(response.data);
            return response;
        });
    };

    this.cancelUserSessions = () => {
        return $http({
          method: "DELETE",
          url: '/remove-session/' + id
        }).then((response) => {
            return response;
        })
      };

      this.updateUserSessions = () => {
        return $http({
          method: "PUT",
          url: '/update-session/' + id
        }).then((response) => {
            return response;
        })
      };
    
    this.login = function (username, password) {
        return $http.post('/login', {
                username: username,
                password: password
            })
            .then(function success(response) {
                return response.data;
            }, function err(err) {
                return err.data;
            });
    };

 

    this.getUser = function () {
        return $http.get('/me')
            .then(function (response) {
                return response;
            });
    };

    this.getSessions = function () {
        return $http.get('/sessions')
            .then(function (response) {
                return response;
            });
    };


    this.getUserSessions = function (user_id) {
        return $http.get('/client-session/' + user_id)
            .then(function (response) {
                console.log(response);
                return response;
            });
    };

  

    this.logout = function () {
        return $http.get('/logout')
            .then(function (response) {
                return response.data;
            });
    };

    this.trainers = function () {
        return $http.get('/trainers').then(function (response) {
            return response.data;
        })
    }

});