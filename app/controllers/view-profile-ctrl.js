'use strict';

angular
  .module('GameGalaxy')
  .controller('ViewProfileCtrl', function($scope, UserFactory, $routeParams, BlogsFactory, AuthFactory) {

    $scope.title = "View User Profile";

    $scope.thisUser = {};

    $scope.requestsHolder = '';

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
      console.log('scope this user', $scope.thisUser);
      // $scope.requestsHolder.push($scope.thisUser.uid);   
      BlogsFactory.getUsersBlogs($scope.thisUser.uid)
      .then(blogs => {
        $scope.blogs = blogs;
        if ($scope.blogs.length === 0) {
          $(".filler-box").show();
        }
      });

      // Friend request mess

      firebase.auth().onAuthStateChanged(function(user) {
        // $scope.$apply($scope.user = true);
        $scope.user = user;
        UserFactory.checkForUser($scope.user.uid)
        .then(data => {
          $scope.requestsHolder = [];
          console.log('checkForUser data', data);
          $scope.user.id = data[0].uid;
          $scope.user.key = data[0].key;
          console.log('scope user id', $scope.user.id);
          console.log('scope viewuser key', $scope.thisUser.key);          
          $scope.requestsHolder.push($scope.user.id);                         
          UserFactory.getRequests($scope.thisUser.key)
          .then(data => {
            console.log('getRequests data', data);
            $scope.requestsHolder.push(Object.values(data));
            // data.forEach(function(item) {
            //   $scope.requestsHolder.push(item);
            // });
            console.log('requests at end', $scope.requestsHolder);
          });
        });
      });
    });

  });