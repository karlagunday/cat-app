import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BreedSelect from '../breed/BreedSelect'
import ImageList from '../image/ImageList'
import ImageSingle from '../image/ImageSingle'
import { setCurrentImage, showError } from '../actions'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Image from '../api/image';
import { CAT_NOT_FOUND } from '../messages'

/**
 * Component to render the homepage
 */
const Homepage = (prop) => {
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
      .catch(error => {

        // @TODO - dispatching this event will cause recursion
        // and do the API call again
        // how can this component be unsubscribed to any changes to the store?
        // workaround was to not let this component render altogether
        // which is handled in the root app component
        // @TODO - issue with this workaround is it throws a `Can't perform a React state update on an unmounted component` error
        dispatch(showError({
          message: CAT_NOT_FOUND,
          details: error.message
        }))
      })
  }
  const { currentImage } = useSelector(state => state)
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