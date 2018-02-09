'use strict';

angular
  .module('GameGalaxy')
  .controller('ProfileCtrl', function($scope, $routeParams, UserFactory) {

    $scope.title = "Profile";

    $scope.user = {
      nickname: "",
      genre: "",
      bio: "",
      customPhoto: ""
    };

    $scope.clickSubmit = () => {
      UserFactory.addNewUser($scope.user);
      console.log('new user added to database');
    };

  });