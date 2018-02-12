'use strict';

angular
  .module('GameGalaxy')
  .controller('ProfileCtrl', function($scope, $routeParams, UserFactory) {

    $scope.title = "Profile";

    $scope.user = {
      nickname: "",
      formal: "",
      genre: "",
      bio: "",
      customPhoto: "",
      uid: "",
      joinDate: ""
    };

    $scope.clickSubmit = () => {
      UserFactory.addNewUser($scope.user);
      console.log('new user added to database');
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.user.uid = firebase.auth().currentUser.uid;
        $scope.user.formal = firebase.auth().currentUser.displayName;        
        $scope.user.joinDate = firebase.auth().currentUser.metadata.creationTime.slice(0, 17);        
      }
    });

  });