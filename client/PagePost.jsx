import React from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
    this.getCreatedAtAnchoredText = this.getCreatedAtAnchoredText.bind(this);
  }

  getCreatedAtAnchoredText() {
    var timestamp = moment(this.props.createdAt);
    return (
      <a href={this.props.permalink}>
        {timestamp.format("MMMM d, YYYY")} at {timestamp.format("h:mm a")}
      </a>
    );
  }

  render() {
    var timestamp = this.props.createdAt;
    return (
      <Card>
        <CardText expandable={true}>
          {`${this.props.message}`}
        </CardText>
        <CardHeader
          title={this.getCreatedAtAnchoredText()}
          subtitle={`${this.props.numReactions} Reaction(s)`}
        />
        <CardText expandable={false}>
          {`${this.props.message}`}
        </CardText>
        <CardActions>
          <FlatButton label="Detailed Insights" />
        </CardActions>
      </Card>
    );
  }
}
