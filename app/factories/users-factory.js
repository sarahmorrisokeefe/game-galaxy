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

  function getAllUsers() {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users.json`)
      .then(({ data }) => {
        let usersArr = Object.keys(data).map(userKey => {
          data[userKey].id = userKey;
          return (data[userKey]);
        });
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  return { addNewUser, getAllUsers };

});