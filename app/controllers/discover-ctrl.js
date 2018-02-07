'use strict';

angular
  .module('GameGalaxy')
  .controller('DiscoverCtrl', function($scope, BlogsFactory, $sanitize) {
    $scope.title = "Discover";

    BlogsFactory.getAllBlogs()
      .then(blogsArr => {
          $scope.blogs = blogsArr;
          console.log(blogsArr);
      });

  });