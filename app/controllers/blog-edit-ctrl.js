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
      console.log(data);
      $scope.blog = data;
      $scope.editCheck = $routeParams.id;
    });

    $scope.updatePost = () => {
      BlogsFactory.updateBlog($routeParams.id, $scope.blog)
      .then((data) => {
        console.log("Blog updated", data);
        // $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.popTheToast();
      });
    };
    
  });