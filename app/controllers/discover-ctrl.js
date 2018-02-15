'use strict';

angular
  .module('GameGalaxy')
  .controller('DiscoverCtrl', function($scope, BlogsFactory, FilterFactory, $route, $window) {
    $scope.title = "Discover";

    $scope.limit = 3;
    
    BlogsFactory.getAllBlogs()
      .then(blogsArr => {
        $scope.blogs = FilterFactory.shuffleArr(blogsArr);
    });

    $(".diceImg").click(() => {
      $route.reload();
    });

    function move() {
      var elem = document.getElementById("myBar");   
      var width = 1;
      var id = $window.setInterval(frame, 14);
      function frame() {
        if (width >= 100) {
          $window.clearInterval(id);
          document.getElementById('content').style.display='block';
          document.getElementById('myProgress').style.display='none';          
        } else {
          width++; 
          elem.style.width = width + '%'; 
        }
      }
    }

    move();

  });