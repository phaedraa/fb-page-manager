import React from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
    this.getCreatedAtAnchoredText = this.getCreatedAtAnchoredText.bind(this);
    this.getCreatedByText = this.getCreatedByText.bind(this);
    //this.getAnchorStyle = this.getAnchorStyle.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.state = { hover: false };
  };

  getCreatedAtAnchoredText() {
    var timestamp = moment(this.props.createdAt);
    return (
      <a href={this.props.permalink}>
        {timestamp.format("MMMM d, YYYY")} at {timestamp.format("h:mm a")}
      </a>
    );
  }

  getCreatedByText() {
    return `Created by: ${this.props.createdByName}`;
    //return
    //  <a href={`https://www.facebook.com/${this.props.createdByID}`}>
    //    {`Created by: ${this.props.createdByName}`}
    //  </a>;
  }

  //getAnchorStyle() {
  //  if (this.state.hover) {
  //    return { color: "gray", textDecorationLine: "none" };
  //  }
//
  //  return {
  //      color: "lightgray",
  //      display: "flex",
  //      textDecorationLine: "underline",
  //  };
  //}

  toggleHover(){
    this.setState({hover: !this.state.hover})
  }

  render() {
    return (
      <Card>
        <CardHeader
          onMouseOver={this.toggleHover}
          title={this.getCreatedAtAnchoredText()}
          subtitle={this.getCreatedByText()}
        />
        <CardText>
          {`${this.props.message}`}
          {<div><br/><b>{this.props.numReactions} Reaction(s)</b></div>}
        </CardText>
        <CardActions>
          <FlatButton label="Detailed Insights" />
        </CardActions>
      </Card>
    );
  }
}
