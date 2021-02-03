import React, { Component } from 'react';
import { connect } from 'react-redux'
import BreedSelect from '../breed/BreedSelect'
import ImageList from '../image/ImageList'
import ImageSingle from '../image/ImageSingle'
import { Container, Row, Col, Form } from 'react-bootstrap'

/**
 * Component to render the homepage
 */
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  /**
   * Renders the homepage and wraps the form, list component
   */
  render() {
    if (this.props.currentImage) {
      return (
        <ImageSingle data={this.props.currentImage}/>
      );
    }
    return (
      <Container>
        <Row>
          <Col sm={3}>
            <Form className="filter">
              <Form.Group controlId="filter.SelectBreed" className="text-left">
                <BreedSelect label="Breed" name="breed" id="breed"/>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <ImageList />
          </Col>
        </Row>
      </Container>
     );
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapSteteToProps = state => {
  return {
    currentImage: state.currentImage
  }
}

export default connect(mapSteteToProps)(Homepage);