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

  // ----------------------------------------------------------------

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

  // ----------------------------------------------------------------

  $scope.registerSuper = (user) => {
    adminService.registerSuper(user).then((response) => {
      console.log(response);
    })
  };

  // ----------------------------------------------------------------

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

  // -------------------------------------------------------------------------------

  // Lists all user sessions and creates the next session window
  var currentIndex = 0;
  $scope.unpaid = 0;
  $scope.paid = 0;
  $scope.trainerSesh = [];
  $scope.unpaidSesh = [];
  $scope.paidSesh = [];

  const getSessions = () => {
    adminService.getUser().then((response) => {
      console.log(response);
      var user_id = response.data.id;
      var user = response.data.username;
      console.log("getUser returning this => ", response.data);
      adminService.getAdminSessions(user_id).then((response) => {
        var sessions = response.data;
        console.log(sessions);
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
    getSessions();
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
    console.log($scope.clientInfo);
  };

  // ----------------------------------------------------------------


    $scope.adminPayment = function (id) {
      adminService.adminPayment(id)
        .then(function (response) {
          if (!response.data) {
            console.warn("Unable to get creds");
          } else {
            console.log("session was paid");
            refreshSessions();
          }
        });
    };
  
    // ----------------------------------------------------------------

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
        console.log("deleted");
          });
        };
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

});