import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BreedSelect from '../breed/BreedSelect'
import ImageList from '../image/ImageList'
import ImageSingle from '../image/ImageSingle'
import { setCurrentImage } from '../actions'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Image from '../api/image';

/**
 * Component to render the homepage
 */
const Homepage = () => {
  // if currently located to a single page on initial load, update state to have the currentImage
  // of the selected image
  const location = useLocation();
  const dispatch = useDispatch();
  const imageId = location.pathname.replace(/^\/+|\/+$/g, '')
  if (imageId) {
    new Image().retrieveById(imageId)
      .then(result => {
        dispatch(setCurrentImage(result))
      })
  }
  const currentImage = useSelector(state => state.currentImage)
  if (currentImage) {
    return (
      <ImageSingle data={currentImage}/>
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
export default Homepage;