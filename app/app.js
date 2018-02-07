'use strict';

angular
  .module('GameGalaxy', ["ngRoute", "ngQuill", "angularUtils.directives.dirDisqus", "ngSanitize"])
  .constant("FBUrl", "https://galaxy-game-blog.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when("/home", {
        templateUrl: "partials/home-splash.html",
        controller: "HomeCtrl"
      })
      .when("/discover", {
        templateUrl: "partials/discover.html",
        controller: "DiscoverCtrl",
        // resolve: { isAuth }
      })
      .when("/community", {
        templateUrl: "partials/community.html",
        controller: "CommunityCtrl",
        // resolve: { isAuth }
      })
      .when("/me", {
        templateUrl: "partials/me.html",
        controller: "MeCtrl",
        // resolve: { isAuth }
      })
      .when("/community/:id", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        // resolve: { isAuth }
      })
      .when("/blogs/new", {
        templateUrl: "partials/blog-edit.html",
        controller: "BlogNewCtrl",
        // resolve: { isAuth }
      })
      .when("/blogs/:id", {
        templateUrl: "partials/blog.html",
        controller: "BlogCtrl",
        // resolve: { isAuth }
      })
      .when("/blogs/:id/edit", {
        templateUrl: "partials/blog-edit.html",
        controller: "BlogEditCtrl",
        // resolve: { isAuth }
      })
      .otherwise("/home");
  })
  .run(FBCreds => {
    let authConfig = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };
    firebase.initializeApp(authConfig);
  });