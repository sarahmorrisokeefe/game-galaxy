'use strict';

angular
  .module('GameGalaxy')
  .controller('NavCtrl', function($scope, AuthFactory, $window) {

    $scope.brand = "Game Galaxy";

    $scope.loginUser = () => {
      AuthFactory.login()
      .then((user) => {
          console.log("Yay, logged in", user);
      })
      .catch(err => {
          console.log("You're supposed to login you goober.");
      });
    };

    $scope.logoutUser = () => {
      AuthFactory.logout()
      .then(() => {
        console.log("see ya later");
        $window.location.href = "#!/home";
      })
    };

  });