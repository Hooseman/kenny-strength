angular.module('kg-App').controller('loginCtrl', function ($scope, $stateParams, loginService) {


    // $scope.register = (new_user) => {
    //   let newUser = $scope.new_user;
    //   let firstName = $("[data-name='first_name']").val();
    //   let lastName = $("[data-name='last_name']").val();
    //   if (!firstName || !lastName) {
    //     return;
    //   }
    //   loginService.register(new_user).then((response) => {
    //     if (!response.data) {
    //       console.warn("Unable to create new user");
    //     } else {
    //       console.log("You created this new user", response.data);
    //       $state.go('login');
    //     }
    //   }).catch((err) => {
    //     alert("Unable to create new user");
    //   });
    // }
  
    // $scope.logout = () => {
    //   loginService.logout().then((response) => {
    //     console.log("Logged Out");
    //     $state.go('login');
    //   })
    // }
  
    $scope.login = function(user) {
  
      loginService.login(user).then(function(response) {
        if (!response.data) {
          alert('User does not exist');
          $scope.user.password = '';
        } else {
          $state.go('nextsession');
        }
      }).catch(function(err) {
        console.log("ERROR: ", err);
      });
    };
  
  });