"use strict";

angular.module("GameGalaxy").factory("BlogsFactory", (FBUrl, $http, $q) => {

  function submitNewBlog(blogObject) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/blogs.json`, JSON.stringify(blogObject))
        .then(data => {
          console.log("New Item posted", data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  function getAllBlogs() {
    // returns a promise for all images from the blogs collection in firebase
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/blogs.json`)
      .then(({ data }) => {
        let blogsArr = Object.keys(data).map(blogKey => {
          data[blogKey].id = blogKey;
          return (data[blogKey]);
        });
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getThisBlog(blogId) {
    return $q((resolve, reject) => {
      $http
        .get(`${FBUrl}/blogs/${blogId}.json`)
        .then(item => {
          resolve(item.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function searchBlogs(title) {
    console.log("clicked search");
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/blogs.json?orderBy="title"&equalTo="${title}"`)
      .then(({ data }) => {
        console.log("search data returned", data);
        let searchArr = Object.keys(data).map(blogKey => {
          data[blogKey].id = blogKey;
          return (data[blogKey]);
        });
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getUsersBlogs(uid) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/blogs.json?orderBy="uid"&equalTo="${uid}"`)
      .then(({ data }) => {
        console.log("user blogs returned", data);
        let blogsArr = Object.keys(data).map(blogKey => {
          data[blogKey].id = blogKey;
          return (data[blogKey]);
        });
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function deleteBlog(id) {
    return $q((resolve, reject) => {
      $http
        .delete(`${FBUrl}/blogs/${id}.json`)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  

  return { submitNewBlog, getAllBlogs, getThisBlog, searchBlogs, getUsersBlogs, deleteBlog };

});