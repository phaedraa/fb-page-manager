import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class BarMenu extends Component {
  render() {
    if (_.isArray(this.props.pagesData)) {
      var menuItems = [];
      console.log('in BarMenu 2: ', this.props.pagesData);
      for (var i = 0; i < this.props.pagesData.length; i++) {
        menuItems.push(
          <MenuItem
            primaryText={this.props.pagesData[i].name}
            key={this.props.pagesData[i].id}
          />);
      }
      debugger;

      return (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          {menuItems}
        </IconMenu>
      );
    } else {
      return null;
    }
  }
}
