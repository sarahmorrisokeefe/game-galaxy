'use strict';

angular
  .module('GameGalaxy')
  .controller('SearchCtrl', function($scope, BlogsFactory, $routeParams) {

    $scope.title = "Search";


    BlogsFactory.searchBlogs($routeParams.title)
      .then(blogsArr => {
        $scope.blogs = blogsArr;
    });

  });