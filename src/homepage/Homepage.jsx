import React, { Component } from 'react';
import BreedSelect from '../breed/BreedSelect'
import { Container, Row, Col, Form } from 'react-bootstrap'

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form className="filter">
              <BreedSelect label="Breed" name="breed" id="breed"/>
            </Form>
          </Col>
        </Row>
      </Container>
     );
  }
}

export default Homepage;