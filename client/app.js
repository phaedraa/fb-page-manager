import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import statusChangeCallback from './statusChangeCallback';

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <FacebookLogin
          appId="167040673631579"
          autoLoad={true}
          callback={checkLoginState}
          fields="name,email,picture"
          cssClass="my-facebook-button"
        ></FacebookLogin>
      </div>
    );
  }
}

export default App;
