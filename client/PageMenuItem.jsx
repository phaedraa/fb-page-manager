import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';

export default class PageMenuItem extends Component {  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <MenuItem primaryText={page.name} /></MenuItem>
    );
  }
}
