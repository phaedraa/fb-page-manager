import _ from 'lodash';
import React from 'react';
import { CardText } from 'material-ui/Card';

export default class ReactionCounts extends React.Component {
  constructor(props) {
    super(props);
    this.getReactionsTextFromCounts = this.getReactionsTextFromCounts.bind(this);
    this.getReactionsText = this.getReactionsText.bind(this);
    this.getReactionCountsToString = this.getReactionCountsToString.bind(this);
  };

  getReactionCountsToString(reactionCounts) {
    var text = '';
    _.forEach(
      reactionCounts,
      function (value, key) { text += value + ' ' + key + '\'s; '; }
    );
    return text;
  }

  getReactionsTextFromCounts() {
    var reactions = this.props.reactions;
    var reactionCounts = {};
    for (var i = 0; i < reactions.length; i++) {
      if (reactionCounts[reactions[i].type]) {
        reactionCounts[reactions[i].type] += 1
      } else {
        reactionCounts[reactions[i].type] = 1;
      }
    }
    return this.getReactionCountsToString(reactionCounts);
  }

  getReactionsText() {
    if (!this.props.reactions || this.props.reactions.length < 1) {
      return "No Reactions :("
    }
    return this.getReactionsTextFromCounts();
  }

  render() {
    return (
      <CardText>
        <b>{this.getReactionsText()}</b>
      </CardText>
    );
  }
}
