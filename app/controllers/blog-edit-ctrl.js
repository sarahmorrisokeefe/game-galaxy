'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogEditCtrl', function($scope, $routeParams, BlogsFactory, $route, $window) {

    $scope.title = "Edit Your Post";

    $scope.popTheToast = () => {
      var toast = document.getElementById("toastAlert");
      toast.className = "show";
      $window.setTimeout(
        function() {
          toast.className = "hide";
        }, 3000);
    };

    BlogsFactory.getThisBlog($routeParams.id)
    .then(data => {
      $scope.blog = data;

      $scope.today = new Date();
      $scope.dd = $scope.today.getDate();
      $scope.mm = $scope.today.getMonth()+1; //January is 0!
      $scope.yyyy = $scope.today.getFullYear();
  
      if ($scope.dd < 10) {
        $scope.dd = '0' + $scope.dd;
      } 
  
      if ($scope.mm < 10) {
        $scope.mm = '0' + $scope.mm;
      } 
  
      $scope.today = $scope.mm + '/' + $scope.dd + '/' + $scope.yyyy;
      $scope.blog.date = $scope.today;
      
      $scope.editCheck = $routeParams.id;
    });


    $scope.updatePost = () => {
      BlogsFactory.updateBlog($routeParams.id, $scope.blog)
      .then((data) => {
        $scope.popTheToast();
      });
    };
  });