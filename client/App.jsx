import AppBar from 'material-ui/AppBar';
import BarMenu from './BarMenu';
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
import PageInfoCard from './PageInfoCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.userInfoReceived = this.userInfoReceived.bind(this);
    this.userPagesDataReceived = this.userPagesDataReceived.bind(this);
    this.setPageID = this.setPageID.bind(this);
    this.state = { isLoggedIn: false, isPageIDChanged: false, pageID: null };
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

  setPageID(id) {
    if (this.state.pageID !== id) {
      this.state.isPageIDChanged = true;
      this.setState({ pageID: id });
    }
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
        scope="publish_actions,manage_pages,read_insights,public_profile,email,read_stream"
      ></FacebookLogin>
    );
  }

  render() {
    const { isLoggedIn, pageID } = this.state;

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={this.getTitle()}
            iconElementLeft={this.getMenu()}
          />
          <PageInfoCard isLoggedIn={isLoggedIn} pageID={pageID} />
          {this.getPageNavBar()}
          {this.getFBLoginButton()}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
