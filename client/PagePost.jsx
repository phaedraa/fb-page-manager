import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import PostAttachment from './PostAttachment';
import React from 'react';
import ReactionCounts from './ReactionCounts';
import Toggle from 'material-ui/Toggle';
import utils from './utils';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

export default class PagePost extends React.Component {
  constructor(props) {
    super(props);
    this.getAnchorStyle = this.getAnchorStyle.bind(this);
    this.getAttachmentMedia = this.getAttachmentMedia.bind(this);
    this.getCreatedAtAnchoredText = this.getCreatedAtAnchoredText.bind(this);
    this.getCreatedByText = this.getCreatedByText.bind(this);
    this.getDetailedReactionsDiv = this.getDetailedReactionsDiv.bind(this);
    this.getKey = this.getKey.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getNumReactions = this.getNumReactions.bind(this);
    this.getReactionsDiv = this.getReactionsDiv.bind(this);
    this.pagePostDataReceived = this.pagePostDataReceived.bind(this);
    this.state = {
      hover: false,
      expanded: false,
      insights: null,
      showDetailedInsights: false
    };
  };

  pagePostDataReceived(data) {
    this.setState({ insights: data });
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps.id && nextProps.id !== this.props.id) {
    //  utils.getPagePostInsights(this.props.id, this.pagePostDataReceived);  
    //}
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  };

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  };

  handleGetDetailedInsights(event) {
    this.setState({ showDetailedInsights: !this.state.showDetailedInsights });
  }

  getMessage() {
    return this.props.message
      ? this.props.message
      : (<b>No text for this post.</b>);
  }

  getCreatedAtAnchoredText() {
    var timestamp = moment(this.props.createdAt);
    return (
      <a href={this.props.permalink} style={this.getAnchorStyle()}>
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

  getAnchorStyle() {
    if (!this.state.hover) {
      return { color: "darkslategrey", textDecorationLine: "none" };
    }

    return { color: "lightgray", textDecorationLine: "underline" };
  }

  getKey(index) {
    return this.props.id + ":" + index;
  }

  getAttachmentMedia() {
    if (!(this.props.attachments.data && this.props.attachments.data.length > 0)) {
      return (
        <CardText expandable={true}>
          <b>No Attachments</b>
        </CardText>
      );
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

  getNumReactions() {
    return !this.props.reactions || this.props.reactions.length < 1
      ? "0"
      : this.props.reactions.length;
  }

  getReactionsDiv() {
    return (
      <div><br/><b>{this.getNumReactions()} Reaction(s)</b></div>
    );
  }

  getDetailedInsightsButton() {
    return this.props.isForPublishedPosts
      ? (<RaisedButton
          label="Detailed Insights"
          primary={true}
          onTouchTap={this.handleGetDetailedInsights.bind(this)}
        />)
      : null;
  }

  getDetailedReactionsDiv() {
    if (this.state.showDetailedInsights && this.props.isForPublishedPosts) {
      return <ReactionCounts reactions={this.props.reactions} />;
    }
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
          onMouseOver={this.toggleHover.bind(this)}
          title={this.getCreatedAtAnchoredText()}
          subtitle={this.getCreatedByText()}
        />
        <CardText expandable={false}>
          {this.getMessage()}
        </CardText>
        <CardTitle
          actAsExpander={true}
          showExpandableButton={true}
        >
          {this.getReactionsDiv()}
        </CardTitle>
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
          {this.getDetailedInsightsButton()}
        </CardActions>
        {this.getDetailedReactionsDiv()}
      </Card>
    );
  }
}
