"use strict";

angular.module("GameGalaxy").factory("BlogsFactory", (FBUrl, $http, $q) => {

  function submitNewBlog(blogObject) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/blogs.json`, JSON.stringify(blogObject))
        .then(data => {
          resolve(data);
        })
        .catch(error => {
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
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/blogs.json?orderBy="title"&equalTo="${title}"`)
      .then(({ data }) => {
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

  function updateBlog(key, blogObject) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/blogs/${key}.json`, JSON.stringify(blogObject))
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function addView(views, key) {
    return $q((resolve, reject) => {
      $http
        .patch(`${FBUrl}/blogs/${key}.json`, JSON.stringify(views))
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  

  return { submitNewBlog, getAllBlogs, getThisBlog, searchBlogs, getUsersBlogs, deleteBlog, updateBlog, addView };

});