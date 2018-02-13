'use strict';

angular
  .module('GameGalaxy')
  .controller('CommunityCtrl', function($scope, UserFactory, FilterFactory, $window) {

    $scope.title = "Community";

    $scope.searchname = "";

    UserFactory.getAllUsers()
    .then(userArr => {
      $scope.users = FilterFactory.shuffleArr(userArr);
      console.log(userArr);
    });

    function move() {
      var elem = document.getElementById("myBar2");   
      var width = 1;
      var id = $window.setInterval(frame, 8);
      function frame() {
        if (width >= 100) {
          $window.clearInterval(id);
          document.getElementById('content').style.display='block';
          document.getElementById('myProgress2').style.display='none';          
        } else {
          width++; 
          elem.style.width = width + '%'; 
        }
      }
    }

    move();

  });