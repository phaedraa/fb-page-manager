// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
export default function testAPI() {
  var pagesData = {};
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me/accounts', function(response) {
    pagesData = getPagesData(response.data);
    console.log('pagesData: ', pagesData);
    console.log(response);
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    //window.location.href = "http://localhost:3000/" + date;
    FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
    FB.Event.subscribe('auth.statusChange', auth_status_change_callback);

    function getPagesData(responseData) {
      pagesData = response.data;
        for (var j = 0; j < pagesData.length; j++) {
        pagesData[j].posts = getPagePosts(pagesData[j].id);
      }
      return pagesData
    }

    function getPagePosts(pageID) {
      var posts = {unpublished: [], published: []};
      FB.api(
        '/'+pageID+'/posts?fields=message,created_time,is_published',
        function(response) {
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
  });
}

function auth_response_change_callback(response) {
  console.log("auth_response_change_callback");
  console.log(response);
}

function auth_status_change_callback(response) {
  console.log("auth_status_change_callback: " + response.status);
}

