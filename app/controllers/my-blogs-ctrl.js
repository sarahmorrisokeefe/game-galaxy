'use strict';

angular
  .module('GameGalaxy')
  .controller('MyBlogsCtrl', function($scope, BlogsFactory, $route) {

    $scope.title = "Your Blogs";


    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        // $scope.user.uid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser);
        $scope.thisUser = firebase.auth().currentUser;
        BlogsFactory.getUsersBlogs($scope.thisUser.uid)
        .then(blogs => {
          $scope.blogs = blogs;
        });
      }
    });

    // let openModal = () => {
    //   $('#myModal').on('shown.bs.modal', function () {
    //     $('#myInput').trigger('focus');
    //   });
    // };

    $scope.deleteThis = id => {
      BlogsFactory.deleteBlog(id)
      .then( () => {
        console.log("blog post deleted");
        $route.reload();
      });
    }



  });