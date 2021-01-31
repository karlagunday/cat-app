import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Breed from '../api/breed'

class BreedSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new Breed(), // class to connect to the api
      breeds: []
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
  render() {
    return (
      <React.Fragment>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control as="select">
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

export default BreedSelect;