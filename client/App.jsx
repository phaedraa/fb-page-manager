import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import BarMenu from './BarMenu';
import IconMenu from 'material-ui/IconMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import statusChangeCallback from './statusChangeCallback';
import Toggle from 'material-ui/Toggle';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.state = { isLoggedIn: false };
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        this.setState({ isLoggedIn: true });
        utils.getUser
      }
    });
  }

  getMenu() {
    const { pageData } = this.state;

    return (
      <BarMenu pageData={pageData} />
    );
  }

  render() {
    console.log('state', this.state);

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Title"
            iconElementRight={this.getMenu()}
          />
          <FacebookLogin
            appId="167040673631579"
            autoLoad={true}
            callback={this.checkLoginState}
            fields="name,email,picture"
            cssClass="my-facebook-button"
            scope="publish_actions,manage_pages,public_profile,email"
          ></FacebookLogin>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
