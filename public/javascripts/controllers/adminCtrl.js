angular.module('kg-App').controller('adminCtrl', function($scope,adminService,$stateParams,$state) {

    $scope.registerAdmin = (user) => {
        let newUser = $scope.user;
        let firstName = $("[data-name='username']").val();
        let lastName = $("[data-name='lastname']").val();
        if (!firstName || !lastName) {
          return;
        }
        adminService.registerAdmin(user).then((response) => {
          if (!response.data) {
            console.warn("Unable to create new admin");
          } else {
            console.log("You created this new admin", response.data);
            var first = response.data.username;
            var last = response.data.lastname;
            var full = first + last;
            swal("Thanks for signing up",response.data.username +" "+ response.data.lastname,"success");
            $state.go('login');
          }
        }).catch((err) => {
          alert("Unable to create new user");
        });
      }
   

});