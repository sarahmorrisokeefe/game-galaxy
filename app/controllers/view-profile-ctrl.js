'use strict';

angular
  .module('GameGalaxy')
  .controller('ViewProfileCtrl', function($scope, UserFactory, $routeParams, BlogsFactory) {

    $scope.title = "View User Profile";

    $scope.thisUser = {};

    $scope.test = $scope.thisUser.uid; 

    UserFactory.getSingleUser($routeParams.key)
      .then(profile => {
      console.log('profile', profile);
      profile.key = $routeParams.key;
      $scope.thisUser = profile;
      BlogsFactory.getUsersBlogs($scope.thisUser.uid)
      .then(blogs => {
        // console.log($scope.thisUser.uid);
        $scope.blogs = blogs;
      });
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        // $scope.user.uid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser);
      }
    });


  });