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
    this.state = { checkedPageID: null, checkedPageName: null };
  }

  getCheckedPageData() {
    if (_.isArray(this.props.pagesData) && (!this.state.checkedPageID ||
      !this.state.checkedPageName)
    ) {
      return {
        checkedPageID: this.props.pagesData[0].id,
        checkedPageName: this.props.pagesData[0].name
      };
    }
    return this.state;
  }

  componentWillMount() {
    this.setInitialCheckedPageData();
    if (this.props.getPageIDFromMenu) {
      this.props.getPageIDFromMenu(this.getCheckedPageData());
    }
  }

  getSelectedPage(pageID, pageName, event) {
    this.setState({ checkedPageID: pageID, checkedPageName: pageName });
    this.props.getPageIDFromMenu(this.getCheckedPageData());
  }

  setInitialCheckedPageData() {
    var data = this.getCheckedPageData();
    this.setState({ 
      checkedPageID: data.checkedPageID,
      checkedPageName: data.checkedPageName
    });
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
              checked={page.id === this.getCheckedPageData()}
              onTouchTap={this.getSelectedPage.bind(this, page.id, page.name)}
            />
          )
        }
      </IconMenu>
    );
  }
}
