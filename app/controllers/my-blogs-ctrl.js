'use strict';

angular
  .module('GameGalaxy')
  .controller('MyBlogsCtrl', function($scope, BlogsFactory, $route, UserFactory) {

    $scope.friends = [];
    $scope.requests = [];

    $scope.getFactoryFriends = (userKey) => {
      $scope.callForFriends = UserFactory.getFriends(userKey)
      .then((data) => {
        if (data === null) {
          $scope.nofriends = true;
        } else {
        return data.map((key) => {
          UserFactory.checkForUserNoArray(key)
          .then(data2 => {
            let userArr = Object.keys(data2).map(userKey => {
              data2[userKey].key = userKey;
              return (data2[userKey]);
            }); 
            $scope.friends.push(userArr);
          });
        });
      }
      });
    };

    $scope.getFriendRequests = (userKey) => {
      $scope.callForRequests = UserFactory.getRequests(userKey)
      .then((data) => {
        if (data === null) {
          $scope.norequests = true;
        } else {
        return data.map((key) => {
          UserFactory.checkForUserNoArray(key)
          .then(data3 => {
            console.log('data', data3);
            let userArr2 = Object.keys(data3).map(userKey => {
              data3[userKey].key = userKey;
              return (data3[userKey]);
            }); 
            $scope.requests.push(userArr2);
          });
        });
      }  
      });
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          $scope.$apply($scope.user = true);
          $scope.user = user;
          UserFactory.checkForUser($scope.user.uid)
          .then(data => {
            $scope.user.key = data[0].key;
            $scope.getFactoryFriends($scope.user.key);
            $scope.getFriendRequests($scope.user.key);            
            });
      } else {
          $scope.$apply($scope.user = false);
      }
    });

    $scope.title = "Dashboard";

    $scope.armForDelete = {
      title: "",
      id: ""
    };


    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.thisUser = firebase.auth().currentUser;
        BlogsFactory.getUsersBlogs($scope.thisUser.uid)
        .then(blogs => {
          $scope.blogs = blogs;
          if ($scope.blogs.length === 0) {
            $(".filler-box").show();
          }
        });
      }
    });

    $scope.readyToDelete = ($event) => { 
      $('#myModal').modal('show');
      $scope.armForDelete.id = $event.target.parentElement.parentElement.children[0].innerHTML;
      $scope.armForDelete.title = $event.target.parentElement.parentElement.children[1].innerHTML;
    };

    $scope.deleteThis = id => {
      $('#myModal').modal('hide');
      BlogsFactory.deleteBlog(id)
      .then( () => {
        // $route.reload();
      });
    };


  });