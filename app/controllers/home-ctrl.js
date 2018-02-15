'use strict';

angular
  .module('GameGalaxy')
  .controller('HomeCtrl', function($scope, $window) {

    $scope.title = "Home";

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        $window.location = `#!/myblogs/${user.id}`;
      }
    });
  });