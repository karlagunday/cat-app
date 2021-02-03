import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CardColumns, Button } from 'react-bootstrap'
import CatCard from './CatCard'
import { showMoreCats, showError } from '../actions'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { LOAD_LIST_ERROR } from '../messages'

/**
 * Component to wrap the list of cats
 */
class CatList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleClick = () => {
    // make sure current page will be updated
    this.props.showMoreCats()
      .catch(error => {
        this.props.showError({
          message: LOAD_LIST_ERROR,
          details: error.message
        })
      })
  }

  /**
   * The list of cats represented in cards
   */
  render() {
    let content;
    if (this.props.cats && this.props.cats.length <= 0) {
      return (
        <p>No cats available</p>
      )
    }

    // display results as cards
    content = this.props.cats.map(cat => {
      return <CatCard key={cat.id} catData={cat} catUrl={cat.url} id={cat.id} />
    })

    // @TODO - CardColumns kind of messes up the arrangement of the cards
    // which i think is intentional since it tries to cram the cards in the spaces
    // and it is using vertical alignment
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
const mapStateToProps = state => {
  return {
    cats: state.cats,
    loading: state.loading,
    page: state.filter.page,
    endOfPage: state.endOfPage,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showMoreCats: () => dispatch(showMoreCats()),
    showError: (error) => dispatch(showError(error)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatList);