import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class BarMenu extends Component {
  constructor(props) {
    super(props);
    this.getCheckedPageData = this.getCheckedPageData.bind(this);
    this.state = { checkedPageID: null };
  }

  getCheckedPageData() {
    if (_.isArray(this.props.pagesData) && !this.state.checkedPageID) {
      return this.props.pagesData[0].id;
    }
    return this.state.checkedPageID;
  }

  componentWillMount() {
    this.setInitialCheckedPageData();
    if (this.props.getPageIDFromMenu) {
      this.props.getPageIDFromMenu(this.getCheckedPageData());
    }
  }

  getSelectedPage(pageID, event) {
    this.setState({ checkedPageID: pageID });
    this.props.getPageIDFromMenu(pageID);
  }

  setInitialCheckedPageData() {
    this.setState({ checkedPageID: this.getCheckedPageData() });
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        targetOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {
          this.props.pagesData.map((page) =>
            <MenuItem
              primaryText={page.name}
              key={page.id}
              checked={page.id === this.state.checkedPageID}
              onTouchTap={this.getSelectedPage.bind(this, page.id)}
            />
          )
        }
      </IconMenu>
    );
  }
}
