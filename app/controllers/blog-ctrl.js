'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogCtrl', function($scope, BlogsFactory, $routeParams, GamesFactory) {

    $scope.title = "Single Blog";

    $scope.moby = {
      cover: "",
      game: "",
      release: "",
      platforms: "",
      description: "",
      genres: "",
    };

    BlogsFactory.getThisBlog($routeParams.id)
        .then(item => {
      console.log('item', item);
      item.id = $routeParams.id;
      $scope.thisBlog = item;
      GamesFactory.getBlogMobyGame($scope.thisBlog.mobyID)
      .then( (title) => {
        console.log(title.games[0]);
        $scope.moby.description = title.games[0].description;
        $scope.moby.cover = title.games[0].sample_cover.image;
        $scope.moby.release = title.games[0].platforms[0].first_release_date;   
        $scope.moby.platforms = title.games[0].platforms;   
        $scope.moby.genres = title.games[0].genres;                               
      });
    });

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: $routeParams.id,
      disqus_url: `http://localhost:8080/#!/blogs/${$routeParams.id}`
      // disqus_title: 'Per Blog Comments'
      // disqus_developer: 1
    };
  });

