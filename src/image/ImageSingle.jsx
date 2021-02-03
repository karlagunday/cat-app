import React, { useDispatch } from "react-redux";
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { goBackToList } from '../actions'

const ImageSingle = (props) => {
  props = {
    ...props,
    data: {
      ...props.data,
      breeds: null,
      breed: props.data.breeds[0], // assumin an image always has a single breed
    }
  }
  const dispatch = useDispatch()
  const history = useHistory();
  return (
    <div className="d-flex justify-content-center m-4">
      <Card className="w-50">
        <Card.Header className="text-left">
          <Button
            variant="primary"
            onClick={() => {
              dispatch(goBackToList())
              history.goBack()
            }}
          >
            Back
          </Button>
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

export default ImageSingle
