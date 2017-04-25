import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class BarMenu extends Component {
  constructor(props) {
    super(props);
    this.getCheckedPageID = this.getCheckedPageID.bind(this);
    this.state = { checkedPageID: null };
  }

  getCheckedPageID() {
    if (_.isArray(this.props.pagesData) && !this.state.checkedPageID) {
      return this.props.pagesData[0].id;
    }
    return this.state.checkedPageID;
  }

  componentWillMount() {
    this.setInitialCheckedPageID();
    if (this.props.getPageIDFromMenu) {
      this.props.getPageIDFromMenu(this.getCheckedPageID());
    }
  }

  getSelectedPage(pageID, event) {
    this.setState({ checkedPageID: pageID });
    this.props.getPageIDFromMenu(this.getCheckedPageID());
  }

  setInitialCheckedPageID() {
    var id = this.getCheckedPageID();
    this.setState({ checkedPageID: id });
  }

  render() {
    if (!_.isArray(this.props.pagesData)) {
      return null;
    }

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {
          this.props.pagesData.map((page) =>
            <MenuItem
              primaryText={page.name}
              key={page.id}
              checked={page.id === this.getCheckedPageID()}
              onTouchTap={this.getSelectedPage.bind(this, page.id)}
            />
          )
        }
      </IconMenu>
    );
  }
}
