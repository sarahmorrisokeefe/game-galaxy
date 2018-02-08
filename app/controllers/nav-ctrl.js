'use strict';

angular
  .module('GameGalaxy')
  .controller('NavCtrl', function($scope, AuthFactory) {

    $scope.brand = "Game Galaxy";

    $scope.loginUser = () => {
      AuthFactory.login()
      .then( (user) => {
          console.log("Yay, logged in", user);
      })
      .catch(err => {
          console.log("You're supposed to login you goober.");
      });
    };

  });