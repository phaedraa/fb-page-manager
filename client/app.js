import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import statusChangeCallback from './statusChangeCallback';
import Toggle from 'material-ui/Toggle';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Page 1" />
    <MenuItem primaryText="Page 2" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: {}, pageData: {}, result: []};
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      var data = statusChangeCallback(response);
      this.state.userData = data.userData;
      this.state.pageData = data.pageData;
    });
  }


  render() {
    console.log('state', this.state);

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Title"
            iconElementLeft={<Logged />}
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
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
