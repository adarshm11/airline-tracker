import './App.css';
import { FlightResults } from './FlightResults.js';
import { SearchUI } from './SearchUI.js';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchUI/>}/>
          <Route path="/search-results" element={<FlightResults/>}/>
        </Routes>
      </Router>
     </div>
  );
}

export default App;
