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