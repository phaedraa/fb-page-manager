import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import ReportProblem from 'material-ui/svg-icons/action/report-problem';

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
    this.state = { expanded: false, isPastTimeSelected: false };
  };

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  }

  disablePastTime(event, date) {
    var isPastTime = date.getTime() <= (new Date()).getTime();
    this.setState({
      isPastTimeSelected: isPastTime
    });
    debugger;
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
          errorText="Not so fast! Say something first!"
          multiLine={true}
          rows={4}
          rowsMax={4}
        /><br />
        <CardActions>
          <FlatButton label="Submit" />
        </CardActions>
      </Card>
    );
  }
}
