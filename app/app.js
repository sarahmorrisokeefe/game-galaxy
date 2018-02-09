'use strict';

let authenticate = (AuthFactory) =>
  new Promise((resolve, reject) => {
    AuthFactory.usercheck().then(user => {
      if (user) {
        console.log("User check - true");
        resolve();
      } else {
        console.log("User check - false");
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
        // TODO: page still in progress        
        templateUrl: "partials/community.html",
        controller: "CommunityCtrl",
      })
      .when("/profile", {
        // TODO: add the ability to customize user image
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
      })
      .when("/community/view/:uid", {
        // TODO: page still in progress
        templateUrl: "partials/view-profile.html",
        controller: "ViewProfileCtrl",
      })
      .when("/blogs/new", {
        // TODO: fix toast pop on blog submit
        // TODO: add API search for game to attach game to post
        templateUrl: "partials/blog-edit.html",
        controller: "BlogNewCtrl",
        resolve: { authenticate }
      })
      .when("/blogs/:id", {
        // FIXME: every blog page needs it's own comment board...somehow
        // TODO: add game ID from API to each post to generate info box about game per blog
        templateUrl: "partials/blog.html",
        controller: "BlogCtrl",
      })
      .when("/blogs/:id/edit", {
        // TODO: page still in progress 
        // TODO: include ability to delete blog with confirmation modal on this page       
        templateUrl: "partials/blog-edit.html",
        controller: "BlogEditCtrl",
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