export default {
  getUserInfo: function(callback) {
    FB.api('/me', function(response) {
      callback(response);
      console.log('Successful login for: ' + response.name);
    });
  },
  getPagesData: function(callback) {
    FB.api('/me/accounts', function(response) {
      callback(response);
      FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
      FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
    });

    function auth_response_change_callback(response) {
      //console.log("auth_response_change_callback");
    }

    function auth_status_change_callback(response) {
      //console.log("auth_status_change_callback: " + response.status);
    }
  },
  getPagePosts: function(pageID, callback) {
    var posts = {unpublished: [], published: []};
    FB.api(
      '/' + pageID + '/posts?fields=message,created_time,is_published,' +
      'reactions,permalink_url,admin_creator,attachments',
      function (response) {
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_published) {
            posts.published.push(data[i]);
          } else {
            posts.unpublished.push(data[i]);
          }
        }
        callback(posts);
      }
    );
  },
  getBasicPageInfo: function(pageID, callback) {
    FB.api(
      '/' + pageID + '/?fields=picture,about,name',
      function (response) {
        callback({
          url: response.picture.data.url,
          about: response.about,
          name: response.name
        });
      }
    )
  },
  publishPost: function(pageID, data) {
    FB.api(
      '/' + pageID + '/feed',
      'post',
      data,
      function (response) {
        //console.log('published: ', response);
      }
    );
  }
};
