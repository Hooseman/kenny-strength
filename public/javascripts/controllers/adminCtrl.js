angular.module('kg-App').controller('adminCtrl', function ($scope, adminService, $stateParams, $state) {

  // -------------------------------------------------------------------------------
  // gets the current logged in user


  adminService.getUser().then((response) => {
    var str = response.data.username;
    var firstname = str.charAt(0).toUpperCase() + str.slice(1);;
    $scope.first = firstname;
    var str = response.data.lastname;
    // var lastname = str.toUpperCase().substring(0, 1);
    $scope.last = str;
    $scope.userId = response.data.id;
    $scope.username = response.data.id;
  });
  // -------------------------------------------------------------------------------

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

  // ----------------------------------------------------------------

  $scope.registerSuper = (user) => {
    adminService.registerSuper(user).then((response) => {
      console.log(response);
    })
  };

  // ----------------------------------------------------------------

  $scope.adminPermission = function (secret_key) {
    adminService.adminPermission(secret_key)
      .then(function (response) {
        if (!response.data) {
          console.warn("Unable to get creds");
        } else {
          $state.go('newadmin');
        }
      });
  };

  // ----------------------------------------------------------------

  //  Gets all the sessions related to the entire gym
  $scope.totalUnpaid = 0;
  $scope.totalPaid = 0;
  $scope.totalHalfDue = 0;
  $scope.totalHourDue = 0;
  $scope.totalBuisness = 0;
  $scope.totalUnpaidSesh = [];
  $scope.totalPaidSesh = [];

  const getTheSessions = () => {
    adminService.getAllSessions().then((response) => {
      console.log(response);
      response.data.forEach(e => e.next_class = e.next_class.substring(0, 10));
      $scope.allSessions = response.data;

      for (var payment in $scope.allSessions) { // iterate through all payments
        if ($scope.allSessions[payment].payment == 'Paid') { // if the person has paid
          $scope.totalPaid++; // count a payment
          $scope.totalPaidSesh.push($scope.trainerSesh[payment]);
        } else { // if the person hasn't paid
          $scope.totalUnpaid++; // count a non-payment
          $scope.totalUnpaidSesh.push($scope.allSessions[payment]);
        }
      }

      for (var next_session in $scope.totalUnpaidSesh) {
        if ($scope.totalUnpaidSesh[next_session].next_session == '30_Minute') {
          $scope.totalHalfDue = $scope.totalHalfDue + 25;
        } else if ($scope.totalUnpaidSesh[next_session].next_session == 'Hour_Session') {
          $scope.totalHourDue = $scope.totalHourDue + 50;
        }
      }

      $scope.totalBuisness = $scope.totalHalfDue + $scope.totalHourDue;

    });
  };


  getTheSessions();


  // -------------------------------------------------------------------------------

  // Lists all user sessions and populates into unpaid or paid
  var currentIndex = 0;
  $scope.unpaid = 0;
  $scope.paid = 0;
  $scope.halfDue = 0;
  $scope.hourDue = 0;
  $scope.total = 0;
  $scope.trainerSesh = [];
  $scope.unpaidSesh = [];
  $scope.paidSesh = [];

  const getSessions = () => {
    adminService.getUser().then((response) => {
      console.log(response);
      var user_id = response.data.id;
      var user = response.data.username;
      // console.log("getUser returning this => ", response.data);
      adminService.getAdminSessions(user_id).then((response) => {
        var sessions = response.data;
        // console.log(sessions);
        sessions.forEach(e => e.next_class = e.next_class.substring(0, 10));

        for (var next_trainer in sessions) { // iterate through all payments
          if (sessions[next_trainer].next_trainer === user) { // if the person has paid
            $scope.trainerSesh.push(sessions[next_trainer]) // count a payment
            console.log(sessions[next_trainer]);
            console.log($scope.trainerSesh);
          } else { // if the person hasn't paid
          }
        }

        for (var payment in $scope.trainerSesh) { // iterate through all payments
          if ($scope.trainerSesh[payment].payment == 'Paid') { // if the person has paid
            $scope.paid++; // count a payment
            $scope.paidSesh.push($scope.trainerSesh[payment]);
          } else { // if the person hasn't paid
            $scope.unpaid++; // count a non-payment
            $scope.unpaidSesh.push($scope.trainerSesh[payment]);
          }
        }
        for (var next_session in $scope.unpaidSesh) {
          if ($scope.unpaidSesh[next_session].next_session == '30_Minute') {
            $scope.halfDue = $scope.halfDue + 25;
          } else if ($scope.unpaidSesh[next_session].next_session == 'Hour_Session') {
            $scope.hourDue = $scope.hourDue + 50;
          }
        }
        $scope.total = $scope.halfDue + $scope.hourDue;
        // console.log($scope.total);
        $scope.new = $scope.trainerSesh;
      })
    })
  };

  getSessions();

  // -------------------------------------------------------------------------------

  // sets the sessions to zero

  const refreshSessions = () => {
    $scope.unpaid = 0;
    $scope.paid = 0;
    $scope.trainerSesh = [];
    $scope.halfDue = 0;
    $scope.hourDue = 0;
    $scope.unpaidSesh = [];
    $scope.paidSesh = [];

    // ------Buisness Managment--------
    $scope.totalUnpaid = 0;
    $scope.totalPaid = 0;
    $scope.totalHalfDue = 0;
    $scope.totalHourDue = 0;
    $scope.totalBuisness = 0;
    $scope.totalUnpaidSesh = [];
  };
  // -------------------------------------------------------------------------------

  $scope.showUnpaid = false;
  $scope.showUnpaidList = () => {
    $scope.showUnpaid = !$scope.showUnpaid;
  };

  $scope.hideLogout = true;
  $scope.hideLogoutOne = () => {
    $scope.hideLogout = !$scope.hideLogout;
  };

  // ----------------------------------------------------------------

  $scope.clientInfo = false;
  $scope.clickForInfo = () => {
    $scope.clientInfo = !$scope.clientInfo;
    // console.log($scope.clientInfo);
  };

  // ----------------------------------------------------------------

  $scope.showInfo = false;
  $scope.showUserInfo = () => {
    $scope.showInfo = !$scope.showInfo;
  };

  // ----------------------------------------------------------------

  $scope.hideUserInfo = () => {
    $scope.showInfo = !$scope.showInfo;
    $scope.info = [];
  };

  // ----------------------------------------------------------------

  // confirms a payment

  $scope.adminPayment = function (id) {
    if (currentIndex <= 0) {
      swal({
          title: "Are you sure?",
          text: "Session will be marked as paid",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Paid",
          cancelButtonText: "Cancel",
          animation: "slide-from-top"
        },
        () => {
          adminService.adminPayment(id)
            .then(function (response) {
              if (!response.data) {
                console.warn("Unable to get creds");
              } else {
                console.log("session was paid");
                refreshSessions();
                getSessions();
                getTheSessions();
              };
            });
        });
    }
  };

  // ----------------------------------------------------------------

  // deletes a session
  $scope.cancelAdminSessions = (id) => {
    if (currentIndex <= 0) {
      swal({
          title: "Are you sure?",
          text: "Session will be deleted",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Keep Session",
          animation: "slide-from-top"
        },
        () => {
          adminService.cancelAdminSessions(id).then((response) => {})
          refreshSessions();
          getSessions();
          getTheSessions();
          console.log("deleted");
        });
    };
  };

  // ----------------------------------------------------------------

  // $scope.info = [];

  $scope.getUserInfo = (user_id) => {
    console.log(user_id);
    adminService.getUserInfo(user_id).then((response) => {
      $scope.info = response.data[0];
      $scope.infoUsername = $scope.info.username;
      $scope.infoLastname = $scope.info.lastname;
      $scope.infoPhone = $scope.info.phone;
      $scope.infoEmail = $scope.info.email;
      $scope.infoAddress = $scope.info.clientaddress;
      $scope.infoCity = $scope.info.city;
      $scope.infoZip = $scope.info.zip;
      $scope.infoInfo = $scope.info.info;
      console.log($scope.info);
    })
  };

  // ----------------------------------------------------------------

  // logout user
  $scope.logout = () => {
    adminService.logout().then((response) => {
      console.log("Logged Out");
      $state.go('login');
    })
  };

  // ----------------------------------------------------------------
  // Jquery

  $(() => {
    $('.admin-tab-buisness').on('click', () => {
      $('.admin-tab-account').css({
        "background": 'grey'
      });
      $('.admin-tab-buisness').css({
        "background": 'darkgrey'
      });
    });

    $('.admin-tab-account').on('click', () => {
      $('.admin-tab-account').css({
        "background": 'darkgrey'
      });
      $('.admin-tab-buisness').css({
        "background": 'grey'
      });
    });

    $('.admin-user-info-box-container').on('click', () => {
      console.log("hit");
      $('.admin-user-info-text').fadeOut(500);
      $('.showUserOtherInfo').fadeOut(500);
      $('.admin-user-info-text-two').delay(1000).fadeIn(500);
    });


  });

});