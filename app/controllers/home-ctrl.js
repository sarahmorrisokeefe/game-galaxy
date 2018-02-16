'use strict';

angular
  .module('GameGalaxy')
  .controller('HomeCtrl', function($scope, $window, AuthFactory) {

    $scope.title = "Home";

    $scope.loginUser = () => {
      AuthFactory.login()
      .then((user) => {
          $window.location.href = "#!/myblogs/{{user.id}}";
      })
      .catch(err => {
      });
    };

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        $window.location = `#!/myblogs/${user.id}`;
      }
    });

    
  });