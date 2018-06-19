angular.module('kg-App').controller('adminCtrl', function ($scope, adminService, $stateParams, $state) {

  // Creates new trainers and creates super

  $scope.registerAdmin = (user) => {
    let newUser = $scope.user;
    let userName = $("[data-name='username']").val();
    let lastName = $("[data-name='lastname']").val();
    if (!userName || !lastName) {
      return;
    }
    adminService.registerAdmin(user).then((response) => {
      if (!response.data) {
        console.warn("Unable to create new admin");
      } else {
        if (response.data.username === 'Kenny' && response.data.lastname === 'Golladay') {
          $scope.registerSuper(user);
          console.log("You created the super", response.data);
          swal("Thanks for signing up", response.data.username + " " + response.data.lastname, "success");
          $state.go('login');
        } else {
          console.log("You created this new admin", response.data);
          var first = response.data.username;
          var last = response.data.lastname;
          var full = first + last;
          swal("Thanks for signing up", response.data.username + " " + response.data.lastname, "success");
          $state.go('login');
        }
      }
    }).catch((err) => {
      alert("Unable to create new user");
    });
  };

  $scope.registerSuper = (user) => {
    adminService.registerSuper(user).then((response) => {
    })
  };

  $scope.adminPermission = function (secret_key) {
    adminService.adminPermission(secret_key)
      .then(function (response) {
        if (!response.data) {
          console.warn("Unable to get creds");
        } else{ 
          $state.go('newadmin');
        }
      });
  };

});