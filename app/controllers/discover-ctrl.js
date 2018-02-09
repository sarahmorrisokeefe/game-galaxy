'use strict';

angular
  .module('GameGalaxy')
  .controller('DiscoverCtrl', function($scope, BlogsFactory, FilterFactory, $route) {
    $scope.title = "Discover";

    $scope.limit = 3;
    
    BlogsFactory.getAllBlogs()
      .then(blogsArr => {
        $scope.blogs = FilterFactory.shuffleArr(blogsArr);
        console.log(blogsArr);
    });

    $(".diceImg").click(() => {
      $route.reload();
    });

  });