'use strict';

angular
  .module('GameGalaxy')
  .controller('NavCtrl', function($scope, AuthFactory, $window, FilterFactory, UserFactory) {

    $scope.brand = "Game Galaxy";

    $scope.searchterm = FilterFactory;

    $scope.loginUser = () => {
      AuthFactory.login()
      .then((user) => {
          console.log("login success");
      })
      .catch(err => {
          console.log("login fail");
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
          console.log('user info because you suck', user);
          $scope.user = user;
      } else {
          $scope.$apply($scope.user = false);
      }
    });
    
  });