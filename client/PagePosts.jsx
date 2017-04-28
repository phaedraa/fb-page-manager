import FlatButton from 'material-ui/FlatButton';
import PagePost from './PagePost';
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class PagePosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.postData || this.props.postData.length < 1) {
      return (
        <div><b>No posts to display. Create your first!</b></div>
      );
    }

    return (
      <div>
        {
          this.props.postData.map((post) => 
            <PagePost
              key={post.id}
              id={post.id}
              createdAt={post.created_time}
              message={post.message || ''}
              numReactions={post.reactions && post.reactions.data.length}
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
}
