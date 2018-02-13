'use strict';

angular
  .module('GameGalaxy')
  .controller('ProfileCtrl', function($scope, $routeParams, UserFactory, $window) {

    $scope.title = "Profile";

    UserFactory.checkForUser(firebase.auth().currentUser.uid)
    .then((data) => {
      console.log('data', data);
      if (data === {}) {
        $("#putBtn").hide();
      } else {
        $scope.key = data[0].key;
        $("#postBtn").hide();
        $scope.user.nickname = data[0].nickname;
        $scope.user.bio = data[0].bio;
        $scope.user.customPhoto = data[0].customPhoto;
        $scope.user.genre = data[0].genre[0];
      }
    });

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

    $scope.key = "";

    $scope.updateSubmit = () => {
      console.log($scope.key);
      UserFactory.updateUser($scope.key, $scope.user);
      console.log('user info update activated');
      $scope.popTheToast();
    };

    $scope.popTheToast = () => {
      var toast = document.getElementById("toastAlert");
      toast.className = "show";
      $window.setTimeout(function() {toast.className = "hide";}, 3000);
      toast.className = "hide";
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.user.uid = firebase.auth().currentUser.uid;
        $scope.user.formal = firebase.auth().currentUser.displayName;        
        $scope.user.joinDate = firebase.auth().currentUser.metadata.creationTime.slice(0, 17);        
      }
    });

  });