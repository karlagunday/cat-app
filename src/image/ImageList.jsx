import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CardColumns, Button } from 'react-bootstrap'
import ImageCard from './ImageCard'
import { showMoreImages, showError } from '../actions'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { LOAD_LIST_ERROR } from '../messages'

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
      .catch(error => {
        this.props.showError({
          message: LOAD_LIST_ERROR,
          details: error.message
        })
      })
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
      return <ImageCard key={image.id} imageData={image} imageUrl={image.url} id={image.id} />
    })

    return (
      <div className="m-4">
        <Router>
          <CardColumns className="list">
              { content }
          </CardColumns>
        </Router>
        { this.props.endOfPage === false ?
          <Button
            onClick={this.handleClick}
            variant="primary"
            disabled={this.props.loading}
          >
            { this.props.loading ? "Loading..." : "Load More" }
          </Button>
        : '' }
      </div>

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
    showError: (error) => dispatch(showError(error)),
  }
}

export default connect(mapSteteToProps, mapDispatchToProps)(ImageList);