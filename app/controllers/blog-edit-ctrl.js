'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogEditCtrl', function($scope, $routeParams, BlogsFactory) {

    $scope.title = "Edit Your Post";

    console.log($routeParams.id);

    BlogsFactory.getThisBlog($routeParams.id)
    .then(data => {
      console.log(data);
      $scope.blog = data;
      $scope.editCheck = $routeParams.id;
    });

    $scope.updatePost = () => {
      BlogsFactory.updateBlog($routeParams.id, $scope.blog)
      .then((data) => {
        console.log("Blog updated", data);
      });
    };
    
  });