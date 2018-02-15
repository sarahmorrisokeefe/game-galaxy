'use strict';

angular
  .module('GameGalaxy')
  .controller('ViewProfileCtrl', function($scope, UserFactory, $routeParams, BlogsFactory) {

    $scope.title = "View User Profile";

    $scope.thisUser = {};

    $scope.test = $scope.thisUser.uid; 

    UserFactory.getSingleUser($routeParams.key)
      .then(profile => {
      profile.key = $routeParams.key;
      $scope.thisUser = profile;
      BlogsFactory.getUsersBlogs($scope.thisUser.uid)
      .then(blogs => {
        $scope.blogs = blogs;
        if ($scope.blogs.length === 0) {
          $(".filler-box").show();
        }
      });
    });

  });