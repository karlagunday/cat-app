import './App.css';
import Homepage from '../homepage/Homepage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cat Browser</h1>
      </header>
      <Router>
        <Homepage />
      </Router>
    </div>
  );
}

export default App;
