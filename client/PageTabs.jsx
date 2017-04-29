import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import utils from './utils';
import PagePosts from './PagePosts';
import NewPost from './NewPost';

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
    this.setPublishedPostsData = this.setPublishedPostsData.bind(this);
    this.setUnpublishedPostsData = this.setUnpublishedPostsData.bind(this);
    this.state = {
      firstClassCall: true,
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

  setPublishedPostsData(postData) {
    this.setState({ publishedPosts: postData });
  }

  setUnpublishedPostsData(postData) {
    this.setState({ unpublishedPosts: postData });
  }

  componentDidMount() {
    this.fetchPageData(this.props.pageID);
  }

  fetchPageData(pageID) {
    utils.getPublishedPagePosts(pageID, this.setPublishedPostsData);
    utils.getUnpublishedPagePosts(pageID, this.setUnpublishedPostsData);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageID !== nextProps.pageID) {
      this.fetchPageData(nextProps.pageID)
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
            <PagePosts
              postData={this.state.publishedPosts || []}
              isForPublishedPosts={true}
            />
          </div>
          <div style={styles.slide}>
            <PagePosts
              postData={this.state.unpublishedPosts || []}
              isForPublishedPosts={false}
            />
          </div>
          <div style={styles.slide}>
            <NewPost pageID={this.props.pageID} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
