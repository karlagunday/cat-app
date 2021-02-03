import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap';
import Breed from '../api/breed'
import { fetchCats, clearCats, showError } from '../actions';
import { STANDARD_ERROR, LOAD_LIST_ERROR } from '../messages'

/**
 * Component for the breed selection
 */
class BreedSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new Breed(), // class to connect to the api
      breeds: [],
      value: this.props.selectedParamValue, // default to state
    }
    this.select = React.createRef()
  }

  /**
   * Retrieves necessary data after the component has been mounted
   */
  componentDidMount() {
    // retrieve list of available breeds for filtering
    this.getBreeds()
      .then(breeds => {
        this.setState({
          breeds
        })
      })
      .catch(error => {
        this.props.showError({
          message: STANDARD_ERROR,
          details: error.message
        })
      })

      // execute fetching of cats if value (in params) is set
      const currentValue = this.select.current.getAttribute('data-selected')
      this.handleChange(currentValue)
  }
  handleChange = (breed) => {
    this.setState({
      value: breed
    })

    // since filter has been changed, the current list needs to be cleared first
    this.props.clearCats()

    // only fetch cats if breed filter is provided
    if (breed) {
      // dispatch fetching of cats with the provided filter params
      this.props.fetchCats({
        breed_id: breed,
        page: 0, // every time breed changes, start at the first page
        limit: 10,
        order: 'Asc'
      })
      .catch(error => {
        this.props.showError({
          message: LOAD_LIST_ERROR,
          details: error.message
        })
      })
    }
  }

  /**
   * A select box of available breeds for filter
   */
  render() {
    return (
      <React.Fragment>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          value={this.state.value}
          data-selected={this.props.selectedParamValue}
          as="select"
          onChange={(event) => {
            this.handleChange(event.target.value)
          }}
          disabled={this.props.loading}
          ref={this.select}
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

  /**
   * Retrieves all the available breeds
   */
  getBreeds() {
    return this.state.api.retrieve()
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapStateToProps = state => {
  return {
    selectedBreed: state.filter.breed_id,
    cats: state.cats,
    loading: state.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    clearCats: () => dispatch(clearCats()),
    fetchCats: (filter) => dispatch(fetchCats(filter)),
    showError: (error) => dispatch(showError(error))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreedSelect);
