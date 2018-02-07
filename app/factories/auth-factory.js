"use strict";

angular.module("GameGalaxy").factory("AuthFactory", (FBCreds, $q) => {

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
  }

  function logout() {
    return firebase.auth().signOut();
  }

  return {login, logout};
});