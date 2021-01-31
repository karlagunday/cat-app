import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import ImageCard from './ImageCard'
import './ImageList.css'

/**
 * Component to wrap the list of images
 */
class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    let content;
    if (this.props.images && this.props.images.length <= 0) {
      return (
        <p>No cats available</p>
      )
    }

    // display results as cards
    content = this.props.images.map(image => {
      return <Col className="m-2" md={5}><ImageCard imageUrl={image.url} id={image.id} /></Col>
    })
    return (
      <Container className="list">
        <Row>
          { content }
        </Row>
      </Container>
     );
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapSteteToProps = state => {
  return {
    images: state.images,
    loading: state.loading
  }
}

export default connect(mapSteteToProps)(ImageList);