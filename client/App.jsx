import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import BarMenu from './BarMenu';
import IconMenu from 'material-ui/IconMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
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
    this.userPagesDataReceived = this.userPagesDataReceived.bind(this);
    this.state = { isLoggedIn: false };
  }

  userInfoReceived(userInfo) {
    this.setState({
      userName: userInfo.name,
      userID: userInfo.id
    });
  }

  userPagesDataReceived(userPagesData) {
    this.setState({
      pagesData: userPagesData.data,
    });
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.setState({ isLoggedIn: true });
        utils.getUserInfo(this.userInfoReceived)
        utils.getPagesData(this.userPagesDataReceived);
      }
    });
  }

  setPageID(id) {
    console.log('setPageID');
    debugger;
    this.setState({ pageID: id });
  }

  getMenu() {
    const { pagesData } = this.state;
    return (
      <BarMenu
        pagesData={pagesData} 
        getPageIDFromMenu={id => this.setPageID(id)}
      />
    );
  }

  getTitle() {
    if (this.state.isLoggedIn) {
      return `Welcome ${this.state.userName}`;
    } else {
      return 'Please log in';
    }
  }

  getSubheaderText() {
    if (this.state.isLoggedIn) {
      var strr =  'Welcome to the FB Page Manager App where you can post' +
        ' to your pages, review insights on your published posts, and preview' +
        ' your unpublished posts';
      return strr;
    } else {
      return 'Log in to your Facebook below to use the FB Page Manager App!';
    }
  }

  getFBLoginButton() {
    if (this.state.isLoggedIn) {
      return null;
    }
    return (
      <FacebookLogin
        appId="167040673631579"
        autoLoad={true}
        callback={this.checkLoginState}
        fields="name,email,picture"
        cssClass="my-facebook-button"
        scope="publish_actions,manage_pages,public_profile,email"
      ></FacebookLogin>
    );
  }

  render() {
    console.log('state', this.state);
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={this.getTitle()}
            iconElementLeft={this.getMenu()}
          />
          <Subheader>{this.getSubheaderText()}</Subheader>
          <div>{this.getFBLoginButton()}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
