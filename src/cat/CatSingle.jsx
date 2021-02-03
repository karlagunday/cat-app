import React from "react";
import { useDispatch } from "react-redux";
import { Card } from 'react-bootstrap';
import { goBackToList } from '../actions'
import CatLinkButton from './CatLinkButton'

const CatSingle = (props) => {
  props = {
    ...props,
    data: {
      ...props.data,
      breeds: null,
      breed: props.data.breeds[0], // assuming a cat always has a single breed
    }
  }
  const dispatch = useDispatch()
  return (
    <div className="d-flex justify-content-center m-4">
      <Card className="w-50">
        <Card.Header className="text-left">
          <CatLinkButton
              to={`?breed=${props.data.breed.id}`}
              className="btn btn-primary"
              onClick={() => {
                dispatch(goBackToList())
              }}
            >
              Back
          </CatLinkButton>
        </Card.Header>
        <Card.Img className="p-4" variant="top" src={props.data.url} />
        <Card.Body className="text-left">
          <Card.Title>{props.data.breed.name}</Card.Title>
          <Card.Title>Origin: {props.data.breed.origin}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"> {props.data.breed.temperament}</Card.Subtitle>
          <Card.Text>
            {props.data.breed.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CatSingle
