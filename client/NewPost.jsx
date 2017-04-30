import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReportProblem from 'material-ui/svg-icons/action/report-problem';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import utils from './utils';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      failedSubmit: false,
      postText: '',
      url: '',
      time: null,
      date: null
    };
    this.dateIsToday = this.dateIsToday.bind(this);
    this.getDateHoursToMs = this.getDateHoursToMs.bind(this);
    this.getDateSecondsToMs = this.getDateSecondsToMs.bind(this);
    this.getDateWithZerodTimeInMs = this.getDateWithZerodTimeInMs.bind(this);
    this.getDateMinutesToMs = this.getDateMinutesToMs.bind(this);
    this.getPostData = this.getPostData.bind(this);
    this.getPublishTimeInMs = this.getPublishTimeInMs.bind(this);
    this.getTimeDateToTimeInMs = this.getTimeDateToTimeInMs.bind(this);
    this.isTimeInThePast = this.isTimeInThePast.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.shouldNotSubmit = this.shouldNotSubmit.bind(this);
  };

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  }

  isTimeInThePast(date) {
    return date.getTime() <= (new Date()).getTime();
  }

  handleTimeChange(event, date) {
    var isDateToday = this.state.date &&
      this.dateIsToday(new Date(this.state.date));
    if (isDateToday && this.isTimeInThePast(date)) {
      this.setState({ failedSubmit: true });
    } else {
      this.setState({ time: date.getTime() });
    }
  }

  handleDateChange(event, date) {
    this.setState({ date: date.getTime() });
  }

  dateIsToday(date) {
    var currentTime = new Date();
    return date.getFullYear() === currentTime.getFullYear() &&
      date.getMonth() === currentTime.getMonth() &&
      date.getDate() === currentTime.getDate();
  }

  disablePastDate(date) {
    if (this.dateIsToday(date)) {
      return false;
    }
    return date.getTime() <= (new Date()).getTime()
  }

  getErrorText() {
    if (this.state.failedSubmit) {
      return 'Not so fast! Say something first!';
    }
  }

  handleTextChange(event) {
    this.setState({ postText: event.target.value, failedSubmit: false });
  }

  handleURLChange(event) {
    this.setState({ url: event.target.value, failedSubmit: false });
  }

  getDateHoursToMs(date) {
    // hours * sec/hr * milisec / sec
    return date.getHours() * 3600 * 1000;
  }

  getDateMinutesToMs(date) {
    // min * sec/min * milisec / sec
    return date.getMinutes() * 60 * 1000;
  }

  getDateSecondsToMs(date) {
    // sec * milisec / sec
    return date.getSeconds() * 1000;
  }

  getDateWithZerodTimeInMs(date) {
    var dateTimeToMs = this.getDateHoursToMs(date) +
      this.getDateMinutesToMs(date) + this.getDateSecondsToMs(date);
    return date.getTime() - dateTimeToMs;
  }

  getTimeDateToTimeInMs() {
    var timeDate = new Date(this.state.time);
    return this.getDateHoursToMs(timeDate) +
      this.getDateMinutesToMs(timeDate) + this.getDateSecondsToMs(timeDate)
  }

  getPublishTimeInMs() {
    if (!this.state.time || !this.state.date) {
      return null;
    }
    debugger;
    var date = new Date(this.state.date);
    var publishTimeInSec = this.dateIsToday(date)
      ? this.state.time
      : this.getDateWithZerodTimeInMs(date) + this.getTimeDateToTimeInMs();
    return Math.round(publishTimeInSec / 1000);
  }

  shouldNotSubmit() {
    debugger;
    return (!this.state.postText && !this.state.url) ||
      (this.state.date && !this.state.time) ||
      (this.state.time && !this.state.date);
  }

  getPostData() {
    return {
      message: this.state.postText,
      url: this.state.url,
      accessToken: this.props.accessToken
    };
  }

  publishPost() {
    var publishTime = this.getPublishTimeInMs();
    utils.publishOrSavePost(
      this.props.pageID,
      this.getPostData(),
      publishTime === null,
      publishTime
    );
  }

  savePost() {
    utils.publishOrSavePost(
      this.props.pageID,
      this.getPostData(),
      false /* save: publish later */,
    );
  }

  handleSubmitPost(event) {
    if (this.shouldNotSubmit()) {
      this.setState({ failedSubmit: true });
    } else {
      this.publishPost();
    }
  }

  handleSavePost(event) {
    if (!this.state.postText && !this.state.url) {
      this.setState({ failedSubmit: true });
    } else {
      this.savePost();
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
            onChange={this.handleTimeChange.bind(this)}
          />
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
        <TextField
          hintText="URL"
          errorText={this.getErrorText()}
          onChange={this.handleURLChange.bind(this)}
        />
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
