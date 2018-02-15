'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogCtrl', function($scope, BlogsFactory, $routeParams, GamesFactory, $location) {

    $scope.title = "Single Blog";

    $scope.moby = {
      cover: "",
      game: "",
      release: "",
      platforms: "",
      description: "",
      genres: "",
    };

    $scope.viewObject = {
      views: ""
    };

    BlogsFactory.getThisBlog($routeParams.id)
        .then(item => {
      console.log('item', item);
      item.id = $routeParams.id;
      $scope.thisBlog = item;
      $scope.viewObject.views = $scope.thisBlog.views + 1;
      BlogsFactory.addView($scope.viewObject, $scope.thisBlog.id)
      .then( (views) => {
        $scope.thisBlog.views = views.data.views;
      });
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

    $scope.path = $location.path();

    console.log($scope.path);

    $scope.disqusConfig = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: `${$routeParams.id}`,
      disqus_url: `localhost:8080/#!/blogs/${$routeParams.id}`
    };
  });

