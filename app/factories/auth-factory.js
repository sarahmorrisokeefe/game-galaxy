"use strict";

angular.module("GameGalaxy").factory("AuthFactory", (FBCreds, $q) => {

  let user = null;

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return firebase.auth().signInWithPopup(provider);
  }

  function logout() {
    return firebase.auth().signOut();
  }

  function usercheck() {
    return $q((resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        console.log("auth persisted");
        console.log(user);
        if (user) {
          user = user.uid;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  return {login, logout, usercheck};
});