'use strict';

angular
  .module('GameGalaxy')
  .controller('NavCtrl', function($scope, AuthFactory, $window, FilterFactory) {

    $scope.brand = "Game Galaxy";

    $scope.searchterm = FilterFactory;

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
        $("#navbarDropdown").dropdown('toggle');
        $window.location.href = "#!/home";
      });
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          $scope.$apply($scope.user = true);
      } else {
          $scope.$apply($scope.user = false);
      }
    });
    
  });