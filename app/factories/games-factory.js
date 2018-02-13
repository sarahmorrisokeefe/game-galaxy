"use strict";

angular.module("GameGalaxy").factory("GamesFactory", (APICreds, $http, $q) => {

  function searchMobyGames(searchQuery) {
    return $q((resolve,reject) => {
      $http.get(`https://api.mobygames.com/v1/games?title=${searchQuery}&api_key=${APICreds.apiKey}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getBlogMobyGame(mobyGameID) {
    return $q((resolve,reject) => {
      $http.get(`https://api.mobygames.com/v1/games?id=${mobyGameID}&api_key=${APICreds.apiKey}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  
  return { searchMobyGames, getBlogMobyGame };

});