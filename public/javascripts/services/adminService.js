angular.module('kg-App').service('adminService', function ($http) {

    this.registerAdmin = (user) => {
        
        return $http({
            method: 'POST',
            url: '/register-admin',
            data: user
        }).then((response) => {
            console.log(response);
            return $http({
                method: 'POST',
                url: '/register-trainer',
                data: user
            }).then((response) => {
                return response;
            });
        });
        return response;
    };

    this.registerSuper = (user) => {
        
        return $http({
            method: 'POST',
            url: '/register-super',
            data: user
        }).then((response) => {
            console.log(response);
            return response;
        });
    };

    this.adminPayment = (id) => {
        console.log(id);
        
        return $http({
            method: 'PUT',
            url: '/admin-payment/' + id
        }).then((response) => {
            console.log(response);
            return response;
        });
    };

    this.cancelAdminSessions = (id) => {
        return $http({
          method: "DELETE",
          url: '/admin-session-cancel/' + id
        }).then((response) => {
            return response;
        })
      };

      this.getAllSessions = function () {
          console.log("hit");
        return $http.get('/get-all-sessions')
            .then(function (response) {
                console.log(response.data);
                return response;
            });
    };

    this.adminPermission = (secret_key) => {
        console.log(secret_key);
        return $http({
            method: 'POST',
            url: '/admin-permission/' + secret_key,
        }).then((response) => {
            console.log(response);
            return response;
        });
    };

    this.getUserInfo = (user_id) => {
        console.log(user_id);
        return $http({
            method: "GET",
            url: '/get-user-info/' + user_id,
        }).then((response) => {
            return response;
        });
    };

    this.logout = function () {
        return $http.get('/logout')
            .then(function (response) {
                return response.data;
            });
    };

    this.getUser = function () {
        return $http.get('/me')
            .then(function (response) {
                return response;
            });
    };

    this.getAdminSessions = function (user_id) {
        return $http.get('/admin-session/' + user_id)
            .then(function (response) {
                console.log(response);
                return response;
            });
    };
});