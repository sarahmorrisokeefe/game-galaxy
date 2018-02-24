'use strict';

angular
  .module('GameGalaxy')
  .controller('NavCtrl', function($scope, AuthFactory, $window, FilterFactory, UserFactory) {

    $scope.brand = "Game Galaxy";

    $scope.searchterm = FilterFactory;

    $scope.loginUser = () => {
      AuthFactory.login()
      .then((user) => {
          $window.location.href = "#!/discover";
      })
      .catch(err => {
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
          $scope.user = user;
          UserFactory.checkForUser($scope.user.uid)
          .then(data => {
            console.log(data[0]);
            if (data[0] === undefined) {
              return;
            } else {
              $scope.user.key = data[0].key;
            }
          });
      } else {
          $scope.$apply($scope.user = false);
      }
    });
    
  });