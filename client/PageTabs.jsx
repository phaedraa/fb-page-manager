import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

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
    this.getPublishedPosts = this.getPublishedPosts.bind(this);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  getPublishedPosts() {
    return <h1>Insert Published Posts HERE</h1>
  }

  render() {
    return (
      <div>
        <Tabs
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
            <h2 style={styles.headline}>Published Posts!</h2>
            Swipe to see the next slide.<br />
            {this.getPublishedPosts()}
          </div>
          <div style={styles.slide}>
            Unpublished Posts!
          </div>
          <div style={styles.slide}>
            Create NEW Post!
          </div>
        </SwipeableViews>
      </div>
    );
  }
}