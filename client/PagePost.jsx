import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import PostAttachment from './PostAttachment';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
    this.getAttachmentMedia = this.getAttachmentMedia.bind(this);
    this.getCreatedAtAnchoredText = this.getCreatedAtAnchoredText.bind(this);
    this.getCreatedByText = this.getCreatedByText.bind(this);
    this.getKey = this.getKey.bind(this);
    this.getReactionsDiv = this.getReactionsDiv.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    //this.getAnchorStyle = this.getAnchorStyle.bind(this);
    this.state = { hover: false, expanded: false };
  };

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  };

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
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

  getKey(index) {
    return this.props.id + ":" + index;
  }

  getAttachmentMedia() {
    if (!(this.props.attachments.data && this.props.attachments.data.length > 0)) {
      return null;
    }
    
    return this.props.attachments.data.map((attachment, idx) => {
      return attachment.media && attachment.media.image.src
        ? (<PostAttachment
            key={this.getKey(idx)}
            attachment={attachment}
            expandable={true}
          />)
        : null;
    });
  }

  getReactionsDiv() {
    var numReactions = !this.props.numReactions ? "0" : this.props.numReactions;
    return (
      <div><br/><b>{numReactions} Reaction(s)</b></div>
    );
  }

  toggleHover(){
    this.setState({hover: !this.state.hover})
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange.bind(this)}>
        <CardHeader
          onMouseOver={this.toggleHover}
          title={this.getCreatedAtAnchoredText()}
          subtitle={this.getCreatedByText()}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={false}>
          {this.props.message}
        </CardText>
        <CardText expandable={false}>
          {this.getReactionsDiv()}
        </CardText>
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle.bind(this)}
            labelPosition="right"
            label="Show Attachments"
          />
        </CardText>
        {this.getAttachmentMedia()}
        <CardActions>
          <FlatButton label="Detailed Insights" />
        </CardActions>
      </Card>
    );
  }
}
