import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ImageCard from './ImageCard'
import './ImageList.css'
import { showMoreImages } from '../actions'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

/**
 * Component to wrap the list of images
 */
class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleClick = () => {
    // make sure current page will be updated
    this.props.showMoreImages()
  }

  /**
   * The list of images represented in cards
   */
  render() {
    let content;
    if (this.props.images && this.props.images.length <= 0) {
      return (
        <p>No cats available</p>
      )
    }

    // display results as cards
    content = this.props.images.map(image => {
      return <Col key={image.id} className="m-2" md={5}><ImageCard imageData={image} imageUrl={image.url} id={image.id} /></Col>
    })
    // @TODO - use <CardDeck> or <CardColumns>
    return (
      <Container className="list">
        <Router>
          <Row>
            { content }
          </Row>
        </Router>
        { this.props.endOfPage === false ? <Button onClick={this.handleClick} variant="primary">Load More</Button>: '' }
      </Container>

     );
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapSteteToProps = state => {
  return {
    images: state.images,
    loading: state.loading,
    page: state.filter.page,
    endOfPage: state.endOfPage,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showMoreImages: () => dispatch(showMoreImages()),
  }
}

export default connect(mapSteteToProps, mapDispatchToProps)(ImageList);