// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    hideFBLoginButton();
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    console.log('uid: ', uid);
    console.log('accessToken', accessToken);
  } else {
    showFBLoginButton();
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function hideFBLoginButton() {
  document.getElementById('fblogin').style.display = 'none';
}

function showFBLoginButton() {
  document.getElementById('fblogin').style.display; //('all');
}

var auth_response_change_callback = function(response) {
  console.log("auth_response_change_callback");
  console.log(response);
}

var auth_status_change_callback = function(response) {
  console.log("auth_status_change_callback: " + response.status);
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
window.checkLoginState = function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '167040673631579',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
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