import AppBar from 'material-ui/AppBar';
import BarMenu from './BarMenu';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FacebookLogin from 'react-facebook-login';
import IconMenu from 'material-ui/IconMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PageTabs from './PageTabs';
import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import utils from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.userInfoReceived = this.userInfoReceived.bind(this);
    this.userPagesDataReceived = this.userPagesDataReceived.bind(this);
    this.setPageID = this.setPageID.bind(this);
    this.state = { isLoggedIn: false };
  }

  componentWillMount() {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();
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

  setPageID(data) {
    this.setState({
      pageID: data.checkedPageID,
      pageName: data.checkedPageName
    });
  }

  getMenu() {
    const { pagesData } = this.state;
    return (
      <BarMenu
        pagesData={pagesData} 
        getPageIDFromMenu={this.setPageID}
      />
    );
  }

  getTitle() {
    if (this.state.isLoggedIn) {
      return `Welcome ${this.state.userName}`;
    } else {
      return 'Welcome To FB Page Manager';
    }
  }

  getWelcomeText() {
    var welcomeMessage = 'In the FB Page Manager App, you can post' +
      ' to your pages, review insights on your published posts, and preview' +
      ' your unpublished posts. ';
    return (
      <div>
        {welcomeMessage}
        <b>Log in to your Facebook below to get started!</b>
      </div>
    );
  }

  getPageInfoCard() {
    if (this.state.isLoggedIn) {
      var testAvatarURL = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12191835_890554757718779_6359650367402484387_n.png?_nc_log=1&oh=ef554e74238eec74f4eb701f80aa4bab&oe=5986933C";
      return this.state.pageName
        ? (<Card>
            <CardHeader
              avatar={testAvatarURL}
              title={this.state.pageName}
              subtitle={'Some test description'}
            />
          </Card>)
        : (<h1>Select a page with which to work.</h1>);
    }

    return <Subheader>{this.getWelcomeText()}</Subheader>
  }

  getPageNavBar() {
    if (this.state.isLoggedIn && this.state.pageID) {
      return <PageTabs pageID={this.state.pageID}/>
    }
    return null;
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
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={this.getTitle()}
            iconElementLeft={this.getMenu()}
          />
          {this.getPageInfoCard()}
          <div>{this.getPageNavBar()}</div>
          <div>{this.getFBLoginButton()}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
