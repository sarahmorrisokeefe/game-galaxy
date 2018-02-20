'use strict';

angular
  .module('GameGalaxy')
  .controller('ViewProfileCtrl', function($scope, UserFactory, $routeParams, BlogsFactory, AuthFactory) {

    $scope.title = "View User Profile";

    $scope.thisUser = {};

    $scope.requestsHolder = [];

    $scope.sendFriendRequest = () => {
      UserFactory.addRequests($routeParams.key, $scope.requestsHolder)
      .then(() => {
        console.log("request sent!");
      });
    };

    UserFactory.getSingleUser($routeParams.key)
      .then(profile => {
      profile.key = $routeParams.key;
      $scope.thisUser = profile;  
      console.log($scope.thisUser);
      $scope.requestsHolder.push($scope.thisUser.uid);   
      BlogsFactory.getUsersBlogs($scope.thisUser.uid)
      .then(blogs => {
        $scope.blogs = blogs;
        if ($scope.blogs.length === 0) {
          $(".filler-box").show();
        }
      });
      firebase.auth().onAuthStateChanged(function(user) {
        $scope.$apply($scope.user = true);
        $scope.user = user;
        UserFactory.checkForUser($scope.user.uid)
        .then(data => {
          $scope.user.key = data[0].key;
          UserFactory.getRequests($scope.user.key)
          .then(data => {
            data.forEach(function(item) {
              $scope.requestsHolder.push(item);
            });
          });
        });
      });
    });

    console.log($scope.requestsHolder);

  });