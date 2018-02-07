'use strict';

angular
  .module('GameGalaxy')
  .controller('CommunityCtrl', function($scope) {

    $scope.title = "Community";

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: '33333',
      disqus_url: 'http://localhost:8080/#!/blogs',
      disqus_title: 'Blogs'
      // disqus_developer: 1
    };
  });