angular.module('kg-App').controller('loginCtrl', function ($scope, $state, $stateParams, loginService) {

  $scope.registerUser = (user) => {
    let newUser = $scope.user;
    let firstName = $("[data-name='username']").val();
    let lastName = $("[data-name='lastname']").val();
    if (!firstName || !lastName) {
      return;
    }
    loginService.registerUser(user).then((response) => {
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

  $scope.logout = () => {
    loginService.logout().then((response) => {
      console.log("Logged Out");
      $state.go('login');
    })
  }

  loginService.trainers().then(function(response){
    $scope.trainers = response;
  });

  $scope.register = {};
  $scope.register.sessionId = "1";

  $scope.register.sessions = [{
    id: "1",
    name: "Pick a session"
  }, {
    id: "2",
    name: "30 Minute"
  }, {
    id: "3",
    name: "1 Hour"
  }];
});


