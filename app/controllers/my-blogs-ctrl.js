'use strict';

angular
  .module('GameGalaxy')
  .controller('MyBlogsCtrl', function($scope, BlogsFactory, $route, UserFactory, lodash) {

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

    $scope.readyToDelete = () => { 
      $('#myModal').modal('show');
      $scope.armForDelete.id = event.target.parentElement.parentElement.children[0].innerHTML;
      $scope.armForDelete.title = event.target.parentElement.parentElement.children[1].innerHTML;
    };

    $scope.deleteThis = id => {
      $('#myModal').modal('hide');
      BlogsFactory.deleteBlog(id)
      .then( () => {
        $route.reload();
      });
    };

    $scope.removeRequest = (requestID) => {
      $scope.getUser = firebase.auth().currentUser;      
      UserFactory.checkForUser($scope.getUser.uid)
      .then(data => {
        $scope.user.key = data[0].key;
        console.log('scope viewuser key', $scope.user.key);   
        UserFactory.getRequests($scope.user.key)
        .then(data => {
          console.log('got requests', data);
          $scope.newData = lodash.pull(data, requestID);
          console.log('after lodash pull', $scope.newData);
          UserFactory.addRequests($scope.user.key, data)
          .then(() => {
            console.log('friend request denied');
          });
        });     
      }); 
    };

    $scope.confirmFriend = (requestID) => {
      $scope.getUser = firebase.auth().currentUser;      
      UserFactory.checkForUser($scope.getUser.uid)
      .then(data => {
        $scope.user.key = data[0].key;
        console.log('scope viewuser key', $scope.user.key);   
        UserFactory.getFriends($scope.user.key)
        .then(data => {
          console.log('got friends', data);
          if (data === null) {
            $scope.newData = [requestID];          
            console.log('data after friendpush', $scope.newData);
            UserFactory.updateFriends($scope.user.key, $scope.newData)
              .then(() => {
              console.log('friend request accepted');
              UserFactory.getRequests($scope.user.key)
              .then((data) => {
                console.log('got requests after confirm friend', data);
              });
            });
          } else {
            $scope.updateData = data.push(requestID);
            console.log('data after friendpush', $scope.updateData);
            UserFactory.updateFriends($scope.user.key, $scope.updateData)
              .then(() => {
              console.log('friend request accepted');
              UserFactory.getRequests($scope.user.key)
              .then((data) => {
                console.log('got requests after confirm friend', data);
              });
            });
          }
        });     
      }); 
    };

    $scope.removeFriend = (requestID) => {
      $scope.getUser = firebase.auth().currentUser;      
      UserFactory.checkForUser($scope.getUser.uid)
      .then(data => {
        $scope.user.key = data[0].key;
        console.log('scope-view user key', $scope.user.key);   
        UserFactory.getFriends($scope.user.key)
        .then(data => {
          console.log('got requests', data);
          $scope.newData = lodash.pull(data, requestID);
          console.log('friends after lodash pull', $scope.newData);
          UserFactory.deleteFriend($scope.user.key, data)
          .then(() => {
            console.log('friend mother fucking deleeeted');
          });
        });     
      }); 
    };

  });