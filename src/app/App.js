import './App.css';
import { useSelector } from 'react-redux';
import Homepage from '../homepage/Homepage';
import { Container, Row, Alert } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const error = useSelector((state) => state.error);
  let content = null;
  if (error) {
    content = (
      <Container>
        <Row>
          <Alert variant="danger" className="w-100">
            <h4>{error.message}</h4>
            <p>{error.details}</p>
          </Alert>
        </Row>
      </Container>
    );
  } else {
    content = (
      <Router>
        <Homepage />
      </Router>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cat Browser</h1>
      </header>
      {content}
    </div>
  );
}

export default App;
