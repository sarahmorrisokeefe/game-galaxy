'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogNewCtrl', function($scope, BlogsFactory) {

    $scope.title = "New Blog Post";

    $scope.blog = {
      title: "",
      header: "",
      body: "",
      date: "",
      uid: "",
      author: "",
      userphoto: ""
    };

    $scope.submitBlog = () => {
      BlogsFactory.submitNewBlog($scope.blog);
      console.log("Submitted!");
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.blog.uid = firebase.auth().currentUser.uid;
        $scope.blog.author = firebase.auth().currentUser.displayName;     
        $scope.blog.author = firebase.auth().currentUser.photoURL;                   
      }
    });
    
    $scope.disqusConfig2 = {
      disqus_shortname: 'gamegalaxy',
      disqus_identifier: '22222',
      disqus_url: 'http://localhost:8080/#!/blogs/new',
      disqus_title: 'New Blog'
      // disqus_developer: 1
    };

    $scope.today = new Date();
    $scope.dd = $scope.today.getDate();
    $scope.mm = $scope.today.getMonth()+1; //January is 0!
    $scope.yyyy = $scope.today.getFullYear();

    if ($scope.dd < 10) {
      $scope.dd = '0' + $scope.dd;
    } 

    if ($scope.mm < 10) {
      $scope.mm = '0' + $scope.mm;
    } 

    $scope.today = $scope.mm + '/' + $scope.dd + '/' + $scope.yyyy;
    $scope.blog.date = $scope.today;

  });