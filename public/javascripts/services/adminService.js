angular.module('kg-App').service('adminService', function ($http) {

    this.registerAdmin = (user) => {
        
        return $http({
            method: 'POST',
            url: '/register-trainer',
            data: user
        }).then((response) => {
            return response;
        });
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

  

});