angular.module('kg-App').controller('loginCtrl', function ($scope, $state, $stateParams, loginService) {

  // register a new client

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

  // $scope.registerSession = (user) => {
  //   console.log("hit");
  //   loginService.registerSession(user).then((response) => {
  //     if (!response.data) {
  //       swal('Sorry, this didnt work');
  //     }else{
  //       console.log("you made a session", response.data);
  //       $state.go('login');
  //     }
  //   }).catch((err) => {
  //     alert("Unable to create session");
  //   });
  // }

  // login
  $scope.login = function (username, password) {
    loginService.login(username, password)
      .then(function (response) {
        var user = response;
        if (user === 'Unauthorized') {
          swal('Sorry!','Entered an incorrect username or password','warning');
          $state.go('login');
        } else {
          swal( "Success","","success" );
          $state.go('nextsession');
        }
      });
  };

  loginService.getUser().then((response) => {
    var str = response.data.username;
    var firstname = str.charAt(0).toUpperCase() + str.slice(1);;
    $scope.first = firstname;
    var str = response.data.lastname;
    var lastname = str.toUpperCase().substring(0, 1);
    $scope.last = lastname;
  });

  // logout
  $scope.logout = () => {
    loginService.logout().then((response) => {
      console.log("Logged Out");
      $state.go('login');
    })
  }

  // gets all available trainers
  loginService.trainers().then(function (response) {
    $scope.train = response;
    });

  // session picker
  $scope.userSession = '';
  $scope.sessions = ('30_Minute' +
    ' Hour_Session').split(' ').map(function (session) {
    return {
      abbrev: session
    };
  });

   // payment picker
   $scope.userPayment = '';
   $scope.payments = ('Paying-via-venmo' +
      ' Pay-now').split(' ').map(function (payment) {
     return {
       abbrev: payment
     };
   });

  // Date picker
  $scope.myDate = new Date();

  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() - 2,
    $scope.myDate.getDate());

  $scope.maxDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() + 2,
    $scope.myDate.getDate());

  $scope.onlyWeekdaysPredicate = function (date) {
    var day = date.getDay();
    return day === 1 || day === 2 || day === 3 || day === 4 || day === 5;
  };

  // Time picker
  $scope.userTime = '';
  $scope.times = ('5:30AM 6:00AM 6:30AM 7:00AM 7:30AM 8:00AM 8:30AM 9:00AM 9:30AM 10:00AM 10:30AM 11:00AM 11:30AM ' +
    '12:00PM 12:30PM 1:00PM 1:30PM 2:00PM 2:30PM 3:00PM 3:30PM 4:00PM 4:30PM 5:00PM 5:30PM 6:00PM 6:30PM 7:00PM 7:30PM 8:00PM ' +
    '8:30PM').split(' ').map(function (time) {
    return {
      abbrev: time
    };
  });
});