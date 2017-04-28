import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReportProblem from 'material-ui/svg-icons/action/report-problem';
import SvgIcon from 'material-ui/SvgIcon';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import utils from './utils';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const iconStyles = {
  marginRight: 24,
};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

function getTimeErrorIcon(showIcon) {
  if (showIcon) {
    return (
      <CardText>
        <ReportProblem style={iconStyles} color={red500} />
        {"Please pick a future date or untoggle the future post selection."}
      </CardText>
    );
  }
  return null;
}

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.getPublishTime = this.getPublishTime.bind(this);
    this.state = {
      expanded: false,
      failedSubmit: false,
      isPastTimeSelected: false,
      postText: '',
      time: null,
      date: null
    };
  };

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  }

  disablePastTime(event, date) {
    var isPastTime = date.getTime() <= (new Date()).getTime();
    this.setState({ isPastTimeSelected: isPastTime });
    if (!isPastTime) {
      this.setState({ time: date.getTime() });
    }
  }

  handleDateChange(event, date) {
    if (!this.disablePastDate(date)) {
      this.setState({ date: date.getTime() });
    }
  }

  disablePastDate(date) {
    var currentTime = new Date();
    if (
      date.getFullYear() === currentTime.getFullYear() &&
      date.getMonth() === currentTime.getMonth() &&
      date.getDate() === currentTime.getDate()
    ) {
      return false;
    }

    return date.getTime() <= currentTime.getTime()
  }

  getErrorText() {
    if (!this.state.postText && this.state.failedSubmit) {
      return 'Not so fast! Say something first!';
    }
  }

  handleTextChange(event) {
    this.setState({
      postText: event.target.value
    });
  }

  getPublishTime() {
    if (this.state.time && this.state.date) {
      // do something;
    }
    return null;
  }

  handleSubmitPost(event) {
    if (!this.state.postText) {
      this.setState({ failedSubmit: true });
    } else {
      var publishTime = this.getPublishTime();
      utils.publishPost(
        this.props.pageID,
        { message: this.state.postText },
        true,
        publishTime
      );
    }
  }

  handleSavePost(event) {
    if (!this.state.postText) {
      this.setState({ failedSubmit: true });
    } else {
      utils.publishPost(
        this.props.pageID,
        {
          message: this.state.postText,
        },
        false /* save: publish later */
      );
    }
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange.bind(this)}>
        <CardHeader
          title="Write something!"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle.bind(this)}
            labelPosition="right"
            label="Schedule post for later"
          />
        </CardText>
        <CardText expandable={true}>
          <DatePicker
            hintText="Pick a date"
            onChange={this.handleDateChange.bind(this)}
            shouldDisableDate={this.disablePastDate.bind(this)}
          />
        </CardText>
        <CardText expandable={true}>
          <TimePicker
            hintText="Pick a time"
            onChange={this.disablePastTime.bind(this)}
          />
          {getTimeErrorIcon(this.state.isPastTimeSelected)}
        </CardText>
        <TextField
          hintText="Hint Text"
          errorText={this.getErrorText()}
          multiLine={true}
          rows={4}
          rowsMax={4}
          onChange={this.handleTextChange.bind(this)}
        />
        <br />
        <CardActions>
          <RaisedButton
            label="Submit"
            onTouchTap={this.handleSubmitPost.bind(this)}
          />
          <RaisedButton
            label="Save Draft"
            onTouchTap={this.handleSavePost.bind(this)}
          />
        </CardActions>
      </Card>
    );
  }
}
