import './App.css';
import { FlightResults } from './FlightResults.js';
import { SearchUI } from './SearchUI.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddUserForm } from './AddUserForm.js';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="nav-bar">
          <a href="/"><img src={logo} className="logo" alt="HOME"/></a>
        </nav>
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
