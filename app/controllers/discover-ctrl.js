'use strict';

angular
  .module('GameGalaxy')
  .controller('DiscoverCtrl', function($scope, BlogsFactory, $sanitize) {
    $scope.title = "Discover";

    const shuffleArr = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    BlogsFactory.getAllBlogs()
      .then(blogsArr => {
        $scope.blogs = shuffleArr(blogsArr);
        console.log(blogsArr);
    });


  });