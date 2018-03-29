angular.module('kg-App').controller('loginCtrl', function ($scope, $state, $stateParams, loginService) {


  $scope.registerUser = (new_user) => {
    let newUser = $scope.new_user;
    let firstName = $("[data-name='firstname']").val();
    let lastName = $("[data-name='lastname']").val();
    if (!firstName || !lastName) {
      return;
    }
    loginService.registerUser(new_user).then((response) => {
      if (!response.data) {
        console.warn("Unable to create new user");
      } else {
        console.log("You created this new user", response.data);
        $state.go('login');
      }
    }).catch((err) => {
      alert("Unable to create new user");
    });
  }

  $scope.login = function (username, password) {
    loginService.login(username, password)
      .then(function (response) {
        console.log(response);
        if (response === 'Unauthorized') {
          alert('Incorrect username or password');
          $state.go('login');
        } else {
          $state.go('nextsession');
        }
      });
  };

  $scope.logout = loginService.logout;
});

// mainService.getUserData(response)
//   .then(function (response) {
//     $scope.userData = response[0];
//     $scope.userId = response[0]['fb_id'];
//     console.log('userId: ', $scope.userId)
//   })


// loginService.getAll().then(function(response){
//   $scope.shotguns=response;
// })