'use strict';

angular
  .module('GameGalaxy')
  .controller('ViewProfileCtrl', function($scope, UserFactory, $routeParams, BlogsFactory, AuthFactory, lodash, $window) {

    $scope.title = "View User Profile";

    $scope.thisUser = {};

    $scope.requestsHolder = '';

    $scope.popTheToast = () => {
      let toast = document.getElementById("toastAlertBlue");
      toast.className = "show";
      $window.setTimeout(function() {toast.className = toast.className.replace("show", "");}, 3000);
    };


    $scope.sendFriendRequest = () => {
      UserFactory.addRequests($routeParams.key, $scope.requestsHolder)
      .then(() => {
        $("#requestBtn").html("Request Sent");
        $('#requestBtn').attr('disabled', 'disabled');
        $scope.popTheToast();
      });
    };

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

      // Add Toast and update button on request send

      firebase.auth().onAuthStateChanged(function(user) {
        $scope.user = user;
        UserFactory.checkForUser($scope.user.uid)
        .then(data => {
          UserFactory.getRequests($scope.user.key)
          .then((data) => {
            if (lodash.includes(data, $scope.thisUser.uid)) {
              $("#requestBtn").html("They requested you! Use Dashboard to respond");
              $('#requestBtn').attr('disabled', 'disabled');
            }
          });
          UserFactory.getFriends($scope.user.key)
          .then((data) => {
            if (lodash.includes(data, $scope.thisUser.uid)) {
              $("#requestBtn").html("You are already friends! 👻");
              $('#requestBtn').attr('disabled', 'disabled');
            }
          });
          $scope.requestsHolder = [];
          $scope.user.id = data[0].uid;
          $scope.user.key = data[0].key;
          if ($scope.user.id === $scope.thisUser.uid) {
            $("#requestBtn").html("Hey, it's you! :)");
            $('#requestBtn').attr('disabled', 'disabled');
          } else {
            $scope.requestsHolder.push($scope.user.id);                         
            UserFactory.getRequests($scope.thisUser.key)
            .then(data => {
              if (data === null) {
                data = {};
              }
              $scope.requestsHolder.push(Object.values(data));
              if (lodash.includes($scope.requestsHolder[1], $scope.user.id)) {
                $("#requestBtn").html("Request Sent");
                $('#requestBtn').attr('disabled', 'disabled');
              } 
            });
          } 
        });
      });
    });

  });