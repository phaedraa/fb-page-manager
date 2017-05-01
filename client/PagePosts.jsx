import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PagePost from './PagePost';
import CircularProgress from 'material-ui/CircularProgress';

export default class PagePosts extends Component {
  constructor(props) {
    super(props);
    this.getNoPostMessaging = this.getNoPostMessaging.bind(this);
  }

  getNoPostMessaging() {
    if (!this.props.isForPublishedPosts) {
      return (
        <div>
          <b>No scheduled posts. Schedule one in the Create New Post tab!</b>
        </div>
      );
    }
    return (
      <div>
        <b>No posts to display. Create one in the Create New Post tab!</b>
      </div>
    );
  }

  renderPosts() {
    return (
      <div>
        {
          this.props.postData.map((post) =>
            <PagePost
              key={post.id}
              id={post.id}
              isForPublishedPosts={this.props.isForPublishedPosts}
              createdAt={post.created_time}
              message={post.message || ''}
              reactions={(post.reactions && post.reactions.data) || []}
              permalink={post.permalink_url}
              createdByID={post.admin_creator && post.admin_creator.id}
              createdByName={post.admin_creator && post.admin_creator.name}
              attachments={post.attachments || {}}
            />
          )
        }
      </div>
    );
  }

  render() {
    if (!this.props.postData || this.props.postData.length < 1) {
      return this.getNoPostMessaging();
    }
    const style = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    };

    return (
      <div className='page-posts-container'>
        {
          this.props.isFetching ?
          <div style={style}><CircularProgress /></div> :
          this.renderPosts()
        }
      </div>
    );
  }
}
