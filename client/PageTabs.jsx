import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import utils from './utils';
import PagePosts from './PagePosts';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class PageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setPageData = this.setPageData.bind(this);
    this.state = {
      slideIndex: 0,
      publishedPosts: null,
      unpublishedPosts: null
    };
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  setPageData(postData) {
    this.setState({
      publishedPosts: postData.published,
      unpublishedPosts: postData.unpublished
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageID !== nextProps.pageID) {
      utils.getPagePosts(this.props.pageID, this.setPageData);
    }
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Published Posts" value={0} />
          <Tab label="Unpublished Posts" value={1} />
          <Tab label="Create New Post" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <br />
            <PagePosts postData={this.state.publishedPosts || []} />
          </div>
          <div style={styles.slide}>
            <PagePosts postData={this.state.unpublishedPosts || []} />
          </div>
          <div style={styles.slide}>
            Create NEW Post!
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
