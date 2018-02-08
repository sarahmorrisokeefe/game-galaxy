'use strict';

angular
  .module('GameGalaxy')
  .controller('HomeCtrl', function($scope, $routeParams) {

    $scope.title = "Home";

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: $routeParams.uid,
      disqus_url: `http://localhost:8080/#!/community/${$routeParams.uid}`,
      disqus_title: 'Home'
      // disqus_developer: 1
    };
  });