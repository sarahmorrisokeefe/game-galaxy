'use strict';

angular
  .module('GameGalaxy')
  .controller('MyBlogsCtrl', function($scope, BlogsFactory, $route) {

    $scope.title = "Your Blogs";


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

    $scope.deleteThis = id => {
      BlogsFactory.deleteBlog(id)
      .then( () => {
        $route.reload();
      });
    };



  });