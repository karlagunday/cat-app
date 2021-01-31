import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap';
import Breed from '../api/breed'
import { setImageFilter, fetchImages } from '../actions';

/**
 * Component for the breed selection
 */
class BreedSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new Breed(), // class to connect to the api
      breeds: [],
      value: this.props.selectedBreed // default to state
    }
  }
  componentDidMount() {
    // retrieve list of available breeds for filtering
    this.getBreeds()
      .then(breeds => {
        this.setState({
          breeds
        })
      })
  }
  handleChange = (event) => {

    // make sure the current state of the component is updated
    const breed = event.target.value
    this.setState({
      value: breed
    })

    // dispatch fetching of images with the provided filter params
    this.props.fetchImages({
      breed_id: breed,
      page: 0, // every time breed changes, start at the first page
      limit: 10 // @TODO - handle pagination better?
    })
  }
  render() {
    return (
      <React.Fragment>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          value={this.state.value}
          as="select"
          custom
          onChange={this.handleChange}
        >
          <option value="">Select Breed</option>
          {
            this.state.breeds.map(breed => {
              return <option key={breed.id} value={breed.id}>{breed.name}</option>
            })
          }
        </Form.Control>
      </React.Fragment>
     );
  }
  getBreeds() {
    return this.state.api.retrieve()
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapSteteToProps = state => {
  return {
    selectedBreed: state.filter.breed,
    images: state.images
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setImageFilter: (filter) => dispatch(setImageFilter(filter)),
    fetchImages: (filter) => dispatch(fetchImages(filter)),
  }
}
export default connect(
  mapSteteToProps,
  mapDispatchToProps
)(BreedSelect);
