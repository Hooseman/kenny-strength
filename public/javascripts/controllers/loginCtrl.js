angular.module('kg-App').controller('loginCtrl', function ($scope, $state, $stateParams, loginService) {

  loginService.getUser().then((response) => {
    var str = response.data.username;
    var firstname = str.charAt(0).toUpperCase() + str.slice(1);;
    $scope.first = firstname;
    var str = response.data.lastname;
    // var lastname = str.toUpperCase().substring(0, 1);
    $scope.last = str;
    $scope.userId = response.data.id;
    // console.log(userId);
  });

  // Lists all user sessions and creates the next session window
  var currentIndex = 0;
  $scope.unpaid = 0;
  $scope.paid = 0;

  const getSessions = () => {
    loginService.getUser().then((response) => {
      var user_id = response.data.id;
      console.log("getUser returning this => ", response.data);
      loginService.getUserSessions(user_id).then((response) => {
        var sessions = response.data;
        console.log(sessions);
        sessions.forEach(e => e.next_class = e.next_class.substring(0, 10));

        $scope.new = sessions;

        // $scope.current = sessions[0];

        // $scope.class = $scope.current.next_class;
        // $scope.newClass = new Date($scope.class).toISOString().slice(0,10);
        // $scope.trainer = $scope.current.next_trainer;
        // $scope.time = $scope.current.next_time;
        // $scope.session = $scope.current.next_session;
      })
    })
  };

  getSessions();

  // flip to the next assigned session

  // $scope.nextPage = function() {
  //   if ( currentIndex < ($scope.new.length - 1) ) {
  //     currentIndex++;
  //     $scope.current = $scope.new[currentIndex]
  //     $scope.class = $scope.current.next_class;
  //     $scope.newClass = new Date($scope.class).toISOString().slice(0,10);
  //     $scope.trainer = $scope.current.next_trainer;
  //     $scope.time = $scope.current.next_time;
  //     $scope.session = $scope.current.next_session;
  //   }
  // }

  // flip back to previous session

  // $scope.prevPage = function() {
  //   if ( currentIndex > 0 ) {
  //     currentIndex--;
  //     $scope.current = $scope.new[currentIndex]
  //     $scope.class = $scope.current.next_class;
  //     $scope.newClass = new Date($scope.class).toISOString().slice(0,10);
  //     $scope.trainer = $scope.current.next_trainer;
  //     $scope.time = $scope.current.next_time;
  //     $scope.session = $scope.current.next_session;
  //   }
  // }


  // -------------------------------------------------------------------------------

  // register a new user

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
        swal("Thanks for signing up", response.data.username + " " + response.data.lastname, "success");
        $state.go('login');
      }
    }).catch((err) => {
      alert("Unable to create new user");
    });
  };



  // -------------------------------------------------------------------------------

  // registers a new session

  $scope.registerSession = (user) => {
    loginService.getUser().then((response) => {
      var user_id = response.data.id;
      console.log(user_id);
      loginService.registerSession(user, user_id).then((response) => {
        if (!response.data) {
          console.warn("There was an error");
        } else {
          console.log("you made a session", response.data);
          $state.go('user');
          $scope.getUserSessions();
        }
      }).catch((err) => {
        alert("There was an error creating new todo")
      });
    })
  };

  // -------------------------------------------------------------------------------

  $scope.getUserSessions = () => {
    loginService.getUser().then((response) => {
      var user_id = response.data.id;
      loginService.getUserSessions(user_id).then((response) => {})
    })
  };

  // -------------------------------------------------------------------------------

  // cancels a session

  $scope.cancelUserSessions = (id) => {
    loginService.cancelUserSessions(id).then((response) => {})
    getSessions();
  };

  // -------------------------------------------------------------------------------

  // edits a session

  $scope.updatelUserSessions = () => {
    loginService.updateUserSessions().then((response) => {})
  };

  // -------------------------------------------------------------------------------

  // login setup
  $scope.login = function (username, password) {
    loginService.login(username, password)
      .then(function (response) {
        var user = response;
        console.log(user);
        if (user === 'Unauthorized') {
          swal('Sorry!', 'Entered an incorrect username or password', 'warning');
          $state.go('login');
        } else if (user.role === 'client') {
          swal("Welcome back", user.username + " " + user.lastname, "success");
          $state.go('user');
        } else if (user.role === 'admin' && user.username === 'Kenny' && user.lastname === 'Golladay') {
          swal("Success", user.username + " " + user.lastname, "success");
          $state.go('superadmin');
        } else {
          swal("Success", user.username + " " + user.lastname, "success");
          $state.go('admin');
        }
      });
  };


  // -------------------------------------------------------------------------------

  // returns current logged in user

  loginService.getUser().then((response) => {
    var str = response.data.username;
    var firstname = str.charAt(0).toUpperCase() + str.slice(1);;
    $scope.first = firstname;
    var str = response.data.lastname;
    // var lastname = str.toUpperCase().substring(0, 1);
    $scope.last = str;
    $scope.userId = response.data.id;
  });

  // -------------------------------------------------------------------------------


  // logout user
  $scope.logout = () => {
    loginService.logout().then((response) => {
      console.log("Logged Out");
      $state.go('login');
    })
  };

  // -------------------------------------------------------------------------------

  // gets all available trainers
  loginService.trainers().then(function (response) {
    console.log(response);
    $scope.train = response;
  });

  // -------------------------------------------------------------------------------

  // session picker
  $scope.userMeetings = '';
  $scope.meetings = ('30_Minute' +
    ' Hour_Session').split(' ').map(function (meeting) {
    return {
      abbrev: meeting
    };
  });

  // -------------------------------------------------------------------------------

  // payment picker
  $scope.userPayment = '';
  $scope.payments = ('Paying-via-venmo' +
    ' Pay-now').split(' ').map(function (payment) {
    return {
      abbrev: payment
    };
  });

  // -------------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------------

  // Time picker
  $scope.userTime = '';
  $scope.times = ('5:30AM 6:00AM 6:30AM 7:00AM 7:30AM 8:00AM 8:30AM 9:00AM 9:30AM 10:00AM 10:30AM 11:00AM 11:30AM ' +
    '12:00PM 12:30PM 1:00PM 1:30PM 2:00PM 2:30PM 3:00PM 3:30PM 4:00PM 4:30PM 5:00PM 5:30PM 6:00PM 6:30PM 7:00PM 7:30PM 8:00PM ' +
    '8:30PM').split(' ').map(function (time) {
    return {
      abbrev: time
    };
  });

  $scope.data = true;
  // $scope.data.cb4 = false;
});