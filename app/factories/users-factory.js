"use strict";

angular.module("GameGalaxy").factory("UserFactory", (FBUrl, $http, $q) => {

  function addNewUser(userObject) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/users.json`, JSON.stringify(userObject))
        .then(data => {
          console.log("New User saved", data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  return { addNewUser };

});