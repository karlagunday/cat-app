import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BreedSelect from '../breed/BreedSelect'
import CatList from '../cat/CatList'
import CatSingle from '../cat/CatSingle'
import { setCurrentCat, showError } from '../actions'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Cat from '../api/cat';
import { CAT_NOT_FOUND } from '../messages'

/**
 * Component to render the homepage
 */
const Homepage = (prop) => {
  // if currently located to a single page on initial load, update state to have the currentCat
  // of the selected cat
  const location = useLocation();
  const dispatch = useDispatch();
  const catId = location.pathname.replace(/^\/+|\/+$/g, '')
  if (catId) {
    new Cat().retrieveById(catId)
      .then(result => {
        dispatch(setCurrentCat(result))
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

  // render as single page if an cat is selected
  const { currentCat } = useSelector(state => state)
  if (currentCat) {
    return (
      <CatSingle data={currentCat}/>
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
          <CatList />
        </Col>
      </Row>
    </Container>
    );
}
export default Homepage;