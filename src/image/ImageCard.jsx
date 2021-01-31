import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

/**
 * Component to render a card of an image
 */
class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <Card>
        <Card.Img variant="top" src={this.props.imageUrl} />
        <Card.Body>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>

     );
  }
}

export default ImageCard;