import './App.css';
import { FlightResults } from './FlightResults.js';
import { SearchUI } from './SearchUI.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddUserForm } from './AddUserForm.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchUI/>}/>
          <Route path="/search-results" element={<FlightResults/>}/>
          <Route path="/add-user" element={<AddUserForm/>}/>
        </Routes>
      </Router>
     </div>
  );
}

export default App;
