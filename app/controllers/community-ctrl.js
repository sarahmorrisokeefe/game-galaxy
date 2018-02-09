'use strict';

angular
  .module('GameGalaxy')
  .controller('CommunityCtrl', function($scope, UserFactory, FilterFactory) {

    $scope.title = "Community";

    $scope.searchname = "";

    UserFactory.getAllUsers()
    .then(userArr => {
      $scope.users = FilterFactory.shuffleArr(userArr);
      console.log(userArr);
    });

  });