import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';
import LinkButton from './ImageLinkButton'
import { setCurrentImage } from '../actions';

/**
 * Component to render a card of an image
 */
class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleClick = (imageData) => {
    // add current image data to state to avoid refetching from API
    // and instead reuse whatever data has already been fetched for the selected image
    this.props.setCurrentImage(imageData)
  }

  /**
   * A card that represents a single image
   */
  render() {
    return (
      <Card>
        <Card.Img variant="top" src={this.props.imageUrl} />
        <Card.Body>
          <LinkButton
            to={`/${this.props.id}`}
            className="btn btn-primary btn-block"
            onClick={() => {
              this.handleClick(this.props.imageData)
            }}
          >
            View Details
          </LinkButton>
        </Card.Body>
      </Card>

     );
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapSteteToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentImage: (image) => dispatch(setCurrentImage(image)),
  }
}

export default connect(mapSteteToProps, mapDispatchToProps)(ImageCard);