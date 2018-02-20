'use strict';

let authenticate = (AuthFactory) =>
  new Promise((resolve, reject) => {
    AuthFactory.usercheck().then(user => {
      if (user) {
        resolve();
      } else {
        reject();
      }
  });
});

angular
  .module('GameGalaxy', ["ngRoute", "ngTagsInput", "ngQuill", "angularUtils.directives.dirDisqus", "ngSanitize", "ngTagsInput", "ngLodash"])
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
      })
      .when("/community", {
        templateUrl: "partials/community.html",
        controller: "CommunityCtrl",
      })
      .when("/profile", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        resolve: { authenticate }        
      })
      .when("/community/view/:key", {
        templateUrl: "partials/view-profile.html",
        controller: "ViewProfileCtrl",
      })
      .when("/myblogs/:uid", {
        templateUrl: "partials/my-blogs.html",
        controller: "MyBlogsCtrl",
        resolve: { authenticate }                
      })
      .when("/blogs/new", {
        templateUrl: "partials/blog-edit.html",
        controller: "BlogNewCtrl",
        resolve: { authenticate }
      })
      .when("/blogs/:id", {
        templateUrl: "partials/blog.html",
        controller: "BlogCtrl",
      })
      .when("/blogs/:id/edit", {
        templateUrl: "partials/blog-edit.html",
        controller: "BlogEditCtrl",
        resolve: { authenticate }        
      })
      .when("/search/:title", {
        templateUrl: "partials/search.html",
        controller: "SearchCtrl",
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