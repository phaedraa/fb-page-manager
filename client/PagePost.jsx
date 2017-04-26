import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardText expandable={true}>
          {`${this.props.message}`}
        </CardText>
        <CardHeader
          title={`Created at: ${this.props.createdAt}`}
          subtitle={`${this.props.numReactions} Reaction(s)`}
          actAsExpander={false}
          showExpandableButton={false}
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
