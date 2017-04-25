import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class BarMenu extends Component {
  render() {
    if (_.isArray(this.props.pagesData)) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          {
            this.props.pagesData.map((page, idx) =>
              <MenuItem
                primaryText={page.name}
                key={page.id}
                checked={idx === 0}
              />
            )
          }
        </IconMenu>
      );
    } else {
      return null;
    }
  }
}
