import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import statusChangeCallback from './statusChangeCallback';

class App extends Component {
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
          appId="167040673631579"
          autoLoad={true}
          callback={this.checkLoginState}
          fields="name,email,picture"
          cssClass="my-facebook-button"
        ></FacebookLogin>
      </div>
    );
  }
}

export default App;
