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
        return data.map( (key) => {
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
          if (data.length === 0) {
            $scope.noob = true;
            return;
          } else {
            $scope.noob = false;
            $scope.user.key = data[0].key;
            $scope.getFactoryFriends($scope.user.key);
            $scope.getFriendRequests($scope.user.key);       
          }
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
        UserFactory.getRequests($scope.user.key)
        .then(data => {
          $scope.newData = lodash.pull(data, requestID);
          UserFactory.addRequests($scope.user.key, data)
          .then(() => {
            // page reload? pop toast?
          });
        });     
      }); 
    };

    $scope.confirmFriend = (requestID) => {
      $scope.removeRequest(requestID);
      $scope.getUser = firebase.auth().currentUser;   
      UserFactory.checkForUserNoArray(requestID)
      .then(data => {
        $scope.friendData = Object.keys(data);
        UserFactory.getFriends($scope.friendData[0])
        .then(data => {
          if (data === null) {
            $scope.friendsNewData = [$scope.getUser.uid];          
            UserFactory.updateFriends($scope.friendData[0], $scope.friendsNewData);
          } else {
            data.push($scope.getUser.uid);
            $scope.friendsUpdateData = data;
            UserFactory.updateFriends($scope.friendData[0], $scope.friendsUpdateData);
          }
        });
      });   
      UserFactory.checkForUser($scope.getUser.uid)
      .then(data => {
        $scope.user.key = data[0].key;
        UserFactory.getFriends($scope.user.key)
        .then(data => {
          if (data === null) {
            $scope.newData = [requestID];          
            UserFactory.updateFriends($scope.user.key, $scope.newData)
              .then(() => {
              UserFactory.getRequests($scope.user.key)
              .then((data) => {
                $route.reload();
              });
            });
          } else {
            data.push(requestID);
            $scope.updateData = data;
            UserFactory.updateFriends($scope.user.key, $scope.updateData)
              .then(() => {
              UserFactory.getRequests($scope.user.key)
              .then((data) => {
                $route.reload();
              });
            });
          }
        });     
      }); 
    };

    $scope.removeFriend = (requestID) => {
      $scope.getUser = firebase.auth().currentUser;
      UserFactory.checkForUserNoArray(requestID)
      .then(data => {
        $scope.otherUser = Object.keys(data);
        UserFactory.getFriends($scope.otherUser[0])
        .then(data => {
          $scope.otherNewData = lodash.pull(data, $scope.getUser.uid);
          UserFactory.deleteFriend($scope.otherUser[0], $scope.otherNewData);
        });     
      });       
      UserFactory.checkForUser($scope.getUser.uid)
      .then(data => {
        $scope.user.key = data[0].key;
        UserFactory.getFriends($scope.user.key)
        .then(data => {
          $scope.newData = lodash.pull(data, requestID);
          UserFactory.deleteFriend($scope.user.key, $scope.newData)
          .then(() => {
            $route.reload();
          });
        });     
      }); 
    };

  });