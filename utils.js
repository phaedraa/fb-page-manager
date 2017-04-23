function Util () {}

Util.getPages() {

}

Util.getPagePosts(pageID) = function {
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
}

Util.publishPost(pageID, data) {
  FB.api(
    '/' + pageID + '/feed',
    'post',
    data,
    function (response) {
      console.log('published: ', response);
    }
  );
}