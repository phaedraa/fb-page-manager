import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import BarMenu from './BarMenu';
import IconMenu from 'material-ui/IconMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import utils from './utils';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.userInfoReceived = this.userInfoReceived.bind(this);
    this.state = { isLoggedIn: false };
  }

  userInfoReceived(userInfo) {
    this.setState({
      userName: userInfo.name,
      userID: userInfo.id
    });
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.setState({ isLoggedIn: true });
        utils.getUserInfo(this.userInfoReceived)
      }
    });
  }

  getMenu() {
    const { pageData } = this.state;

    return (
      <BarMenu pageData={pageData} />
    );
  }

  getTitle() {
    if (this.state.isLoggedIn) {
      return `Welcome ${this.state.userName}`;
    } else {
      return 'Please log in';
    }
  }

  render() {
    console.log('state', this.state);

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={this.getTitle()}
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
