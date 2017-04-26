import React from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
    //this.getCreatedAtAnchoredText = this.getCreatedAtAnchoredText.bind(this);
    //this.getAnchorStyle = this.getAnchorStyle.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.state = { hover: false };
  };

  //getCreatedAtAnchoredText() {
  //  var timestamp = moment(this.props.createdAt);
  //  return (
  //    <a href={this.props.permalink}>
  //      style={this.getAnchorStyle()}
  //      {timestamp.format("MMMM d, YYYY")} at {timestamp.format("h:mm a")}
  //    </a>
  //  );
  //}

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
    var timestamp = moment(this.props.createdAt);
    var anchoredTitle =
      <a href={this.props.permalink}>
        {timestamp.format("MMMM d, YYYY")} at {timestamp.format("h:mm a")}
      </a>;

    return (
      <Card>
        <CardText expandable={true}>
          {`${this.props.message}`}
        </CardText>
        <CardHeader
          onMouseOver={this.toggleHover}
          title={anchoredTitle}
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
