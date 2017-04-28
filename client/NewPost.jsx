import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class NewPost extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader
          title="Create a post"
          subtitle="Write something!"
        />
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
