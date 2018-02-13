'use strict';

let authenticate = (AuthFactory) =>
  new Promise((resolve, reject) => {
    AuthFactory.usercheck().then(user => {
      if (user) {
        console.log("user check - pass");
        resolve();
      } else {
        console.log("user check - fail");
        reject();
      }
  });
});

angular
  .module('GameGalaxy', ["ngRoute", "ngQuill", "angularUtils.directives.dirDisqus", "ngSanitize"])
  .constant("FBUrl", "https://galaxy-game-blog.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when("/home", {
        // TODO:  add more jumbotrons detailing features and instructions
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
        // TODO: fix profile header display bc it is ugly
        templateUrl: "partials/view-profile.html",
        controller: "ViewProfileCtrl",
      })
      .when("/myblogs/:uid", {
        templateUrl: "partials/my-blogs.html",
        controller: "MyBlogsCtrl",
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
        // TODO: page still in progress 
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