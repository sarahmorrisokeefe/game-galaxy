'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogCtrl', function($scope, BlogsFactory, $routeParams) {

    $scope.title = "Single Blog";

    BlogsFactory.getThisBlog($routeParams.id)
        .then(item => {
      console.log(item);
      item.id = $routeParams.id;
      $scope.thisBlog = item;
    });

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: $routeParams.id,
      disqus_url: 'http://localhost:8080/#!/blogs/$routeParams.id',
      disqus_title: 'Per Blog Comments'
      // disqus_developer: 1
    };
  });

