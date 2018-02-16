'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogNewCtrl', function($scope, BlogsFactory, $window, $route, GamesFactory) {

    $scope.title = "New Blog Post";

    $scope.searchQuery = "";

    $scope.blog = {
      title: "",
      header: "",
      body: "",
      date: "",
      uid: "",
      author: "",
      userphoto: "",
      mobyID: "",
      game: "",
      cover: "",
      tags: [],
      views: 0
    };

    $scope.getMobyResults = (searchQuery) => {
      GamesFactory.searchMobyGames(searchQuery)
      .then(data => {
        $scope.games = data.games;
      });
    };

    $scope.selectMobyGame = (id, game, cover) => {
      $scope.blog.mobyID = id;
      $scope.blog.game = game;
      $scope.blog.cover = cover;      
      $("#mobyResults").hide();
      $("#selectedGame").show();
    };

    $scope.undoGameSelect = () => {
      $scope.blog.mobyID = "";
      $scope.blog.game = "";
      $scope.blog.cover = "";
      $("#mobyResults").show();
      $("#selectedGame").hide();
    };

    $scope.popTheToast = () => {
      var toast = document.getElementById("toastAlert");
      toast.className = "show";
      $window.setTimeout(function() {toast.className = toast.className.replace("show", "");}, 3000);
    };

    $scope.submitBlog = () => {
      BlogsFactory.submitNewBlog($scope.blog);
      $('.alert').alert();
      $scope.popTheToast();
      $window.location.href = "#!/home";
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.blog.uid = firebase.auth().currentUser.uid;
        $scope.blog.author = firebase.auth().currentUser.displayName;     
        $scope.blog.userphoto = firebase.auth().currentUser.photoURL;                   
      }
    });

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