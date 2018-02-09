'use strict';

angular
  .module('GameGalaxy')
  .controller('ProfileCtrl', function($scope, $routeParams, UserFactory) {

    $scope.title = "Profile";

    $scope.user = {
      nickname: "",
      genre: "",
      bio: "",
      customPhoto: "",
      uid: ""
    };

    $scope.clickSubmit = () => {
      UserFactory.addNewUser($scope.user);
      console.log('new user added to database');
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.user.uid = firebase.auth().currentUser.uid;
      }
    });

  });