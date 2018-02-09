"use strict";

angular.module("GameGalaxy").factory("FilterFactory", function() {

  // Shuffle array function courtesy of Hunter

  const shuffleArr = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return { searchTerm: "", shuffleArr };

});
