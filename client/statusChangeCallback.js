import testAPI from './testAPI';

// This is called with the results from from FB.getLoginStatus().
export default function statusChangeCallback(response) {
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
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function hideFBLoginButton() {
  document.getElementsByClassName('my-facebook-button')[0].style.display = 'none';
}

function showFBLoginButton() {
  document.getElementsByClassName('my-facebook-button')[0].style.display; //('all');
}
