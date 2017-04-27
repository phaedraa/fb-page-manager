import React from 'react';
import {CardMedia, CardTitle} from 'material-ui/Card';

export default class PostAttachment extends React.Component {
  constructor(props) {
    super(props);
    this.getDescription = this.getDescription.bind(this);
  };

  getDescription(attachment) {
    return attachment.description
      ? `${attachment.type}: ${attachment.description}`
      : attachment.type;
  }

  render() {
    const downsizedImageStyle = {
      height: "50%", 
      width: "50%",
      maxWidth: "50%",
      minWidth: "50%"
    };
     
    return (
      <CardMedia
        expandable={this.props.expandable}
        overlay={
          <CardTitle
            title={this.props.attachment.title}
            subtitle={this.getDescription(this.props.attachment)}
          />
        }
      >
        <img
          style={downsizedImageStyle}
          src={this.props.attachment.media.image.src}
        />
      </CardMedia>
    );
  }
}
