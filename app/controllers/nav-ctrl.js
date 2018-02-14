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
          $window.location.href = "#!/myblogs/{{user.id}}";
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
          console.log('user info provided by nav', user);
          $scope.user = user;
          UserFactory.checkForUser($scope.user.uid)
          .then(data => {
            console.log('nav user factory check', data);
            $scope.user.key = data[0].key;
          });
      } else {
          $scope.$apply($scope.user = false);
      }
    });
    
  });