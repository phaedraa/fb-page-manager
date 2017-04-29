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
  getPublishedPagePosts: function(pageID, callback) {
    const url = '/' + pageID +
      '/posts?fields=message,created_time,is_published,' +
      'reactions,permalink_url,admin_creator,attachments';
    const parsePosts = (response) => { callback(response.data); }
    FB.api(url, parsePosts);
  },
  getUnpublishedPagePosts: function(pageID, callback) {
    const url = '/' + pageID + '/promotable_posts?fields=id,message,' +
    'created_time,is_published,reactions,permalink_url,admin_creator,' +
    'attachments&is_published=false';
    const parsePosts = (response) => { callback(response.data); }
    FB.api(url, parsePosts);
  },
  getBasicPageInfo: function(pageID, callback) {
    const url = '/' + pageID + '/?fields=picture,about,name';
    const parsePageInfo = (response) => {
      callback({
        url: response.picture.data.url,
        about: response.about,
        name: response.name
      });
    }
    FB.api(url, parsePageInfo);
  },
  getPagePostInsights: function(
    pagePostID /* format: pageID_postID */,
    callback
  ) {
    const url = '/' + pagePostID + '/insights/page_posts_impressions_unique';
    const parsePagePostData = (response) => {
      callback(response.data);
    }
    FB.api(url, parsePagePostData);
  },
  publishPost: function(pageID, data, publishNow=true, publishTime=null) {
    //var url = '/' + pageID + '/feed?';
    //if (!publishNow) {
    //  url += 'published=false&amp;message=' + data.message;
    //  if (publishTime) {
    //    url += 'scheduled_publish_time=' + publishTime;
    //  }
    //}
    //var token = "EAACEdEose0cBAHtGc8JoveuRgUrZBwyBZBoYhS6vZCkqu4E8Tdg4h1llKN4ZBj5aTeSDRSDNZCDcz6tam1XWbJjftapJVPAAkHs2nS1EBPlo8yl5Fo4PmCoAByWZA9f6oGi4siXuRdeoopoAesqgFAFGfke9sDKfCS0Wa1uRZAqKJh4IZBxvZA51WY5qUmNEuMiZCYxKMBoKJgzwZDZD";
    var dataObj = {
      message: data.message,
      link: data.link,
      picture: data.picture,
      published: publishNow,
      //accessToken: token
    };
    if (publishTime) {
      dataObj.scheduled_publish_time = publishTime;
    }
    FB.api('/' + pageID + '/feed', 'post', dataObj,
      function (response) {
        debugger;
        console.log('response: ', response);
      }
    );
  }
};
