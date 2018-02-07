'use strict';

angular
  .module('GameGalaxy')
  .controller('HomeCtrl', function($scope) {

    $scope.title = "Home";
    $scope.blog = "";

    $scope.submitBlog = () => {
      console.log("Submitted!");
    };
    
    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: '00001',
      disqus_url: 'http://localhost:8080/#!/home',
      disqus_developer: 1
    };

  });