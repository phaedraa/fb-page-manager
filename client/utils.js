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
    const parsePagePostData = (response) => { callback(response.data); }
    FB.api(url, parsePagePostData);
  },
  publishOrSavePost: function(pageID, data, publishNow, publishTime) {
    if (!data.link && !data.message) {
      throw new Error("Must enter at least a message or a link!");
    }
    publishNow = publishNow || publishNow === null || publishNow === undefined;
    if (publishNow && publishTime) {
      throw new Error("Cannot publish now and in the future!");
    }

    FB.api(
      builURLForAPI(),
      'post',
      function (response) { console.log(response.id || response.error); }
    );

    function builURLForAPI() {
      var url = '/' + pageID + '/feed?';
      url += 'published=' + publishNow + '&';
      url += data.message ? 'message=' + data.message + '&' : '';
      url += data.link ? 'link=' + data.link + '&' : '';
      url += publishTime ? 'scheduled_publish_time=' + publishTime + '&' : '';
      url += 'access_token=' + data.accessToken;
      return url;
    }
  }
};
