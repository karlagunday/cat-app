import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';
import LinkButton from './CatLinkButton'
import { setCurrentCat } from '../actions';

/**
 * Component to render a card of an cat
 */
class CatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleClick = (catData) => {
    // add current cat data to state to avoid refetching from API
    // and instead reuse whatever data has already been fetched for the selected cat
    this.props.setCurrentCat(catData)
  }

  /**
   * A card that represents a single cat
   */
  render() {
    return (
      <Card>
        <Card.Img variant="top" src={this.props.catUrl} />
        <Card.Body>
          <LinkButton
            to={`/${this.props.id}`}
            className="btn btn-primary btn-block"
            onClick={() => {
              this.handleClick(this.props.catData)
            }}
          >
            View Details
          </LinkButton>
        </Card.Body>
      </Card>

     );
  }
}

// connect component to store
// @TODO - create a `selectors` file?
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentCat: (cat) => dispatch(setCurrentCat(cat)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatCard);