'use strict';

angular
  .module('GameGalaxy')
  .controller('HomeCtrl', function($scope) {

    $scope.title = "Home";

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: '11111',
      disqus_url: 'http://localhost:8080/#!/home',
      disqus_title: 'Home'
      // disqus_developer: 1
    };
  });