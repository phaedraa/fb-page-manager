export default {
  getPagesData: function(responseData) {
    pagesData = response.data;
      for (var j = 0; j < pagesData.length; j++) {
      pagesData[j].posts = getPagePosts(pagesData[j].id);
    }
    return pagesData;
  },
  getUserInfo: function() {
    console.log('in getUserInfo');
    userData = {};
    FB.api('/me', function(response) {
      console.log('in getUserInfo API call');
      userData = response.data;
    });
    console.log('userData', userData);
    return userData;
  },
  getPageData: function() {
    console.log('Welcome!  Fetching your information...');
    pageData = {};
    FB.api('/me/accounts', function(response) {
      pageData = response.data;
      console.log(response.data);
      console.log('Successful login for: ' + response.name);
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!';
      //window.location.href = "http://localhost:3000/" + date;
      FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
      FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
    });
    return pageData;

    function auth_response_change_callback(response) {
      console.log("auth_response_change_callback");
      console.log(response);
    }
    
    function auth_status_change_callback(response) {
      console.log("auth_status_change_callback: " + response.status);
    }
  },
  getPagePosts: function(pageID) {
    var posts = {unpublished: [], published: []};
    FB.api(
      '/' + pageID + '/posts?fields=message,created_time,is_published',
      function (response) {
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_published) {
            posts.published.push(data[i]);
          } else {
            posts.unpublished.push(data[i]);
          }
        }
      }
    );
    return posts;
  },
  publishPost: function(pageID, data) {
    FB.api(
      '/' + pageID + '/feed',
      'post',
      data,
      function (response) {
        console.log('published: ', response);
      }
    );
  }
};
