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

});