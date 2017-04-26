import FlatButton from 'material-ui/FlatButton';
import PagePost from './PagePost';
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class PagePosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.postData.map((post) => 
            <PagePost
              key={post.id}
              createdAt={post.created_time}
              message={post.message}
              numReactions={post.reactions.data.length}
            />
          )
        }
      </div>
    );
  }
}
