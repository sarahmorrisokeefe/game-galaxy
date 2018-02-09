'use strict';

angular
  .module('GameGalaxy')
  .controller('SearchCtrl', function($scope, BlogsFactory, $routeParams, FilterFactory) {

    $scope.title = "Search";

    $scope.searchterm = FilterFactory;

    BlogsFactory.getAllBlogs()
      .then(blogsArr => {
        $scope.blogs = blogsArr;
        console.log(blogsArr);
    });

  });