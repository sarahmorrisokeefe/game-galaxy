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
      mobyID: ""
    };

    $scope.getMobyResults = (searchQuery) => {
      GamesFactory.searchMobyGames(searchQuery)
      .then(data => {
        console.log(data);
        $scope.games = data.games;
      });
    };

    $scope.popTheToast = () => {
      var toast = document.getElementById("toastAlert");
      toast.className = "show";
      $window.setTimeout(function() {toast.className = toast.className.replace("show", "");}, 3000);
    };

    $scope.submitBlog = () => {
      BlogsFactory.submitNewBlog($scope.blog);
      $('.alert').alert();
      console.log("New article submitted to database");
      $scope.popTheToast();
      $window.location.href = "#!/discover";
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $scope.blog.uid = firebase.auth().currentUser.uid;
        $scope.blog.author = firebase.auth().currentUser.displayName;     
        $scope.blog.userphoto = firebase.auth().currentUser.photoURL;                   
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