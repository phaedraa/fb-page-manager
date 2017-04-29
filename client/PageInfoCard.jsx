import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { Card, CardHeader } from 'material-ui/Card';
import utils from './utils';

export default class PageInfoCard extends Component {
  constructor(props) {
    super(props);
    this.pageInfoReceived = this.pageInfoReceived.bind(this);
    this.state = {};
  }

  pageInfoReceived(data) {
    this.setState({
      pagePhotoURL: data.url || '',
      pageAbout: data.about || '',
      pageName: data.name || ''
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageID && nextProps.pageID !== this.props.pageID) {
      utils.getBasicPageInfo(nextProps.pageID, this.pageInfoReceived);
    }
  }

  getPageInfo() {
    if (!this.props.pageID) {
      return (<b>Select a page with which to work.</b>);
    }

    return (
      <Card>
        <CardHeader
          avatar={this.state.pagePhotoURL}
          title={this.state.pageName}
          subtitle={this.state.pageAbout}
        />
      </Card>
    );
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

  render() {
    if (this.props.isLoggedIn) {
      return this.getPageInfo();
    }

    return <Subheader>{this.getWelcomeText()}</Subheader>
  }
}
