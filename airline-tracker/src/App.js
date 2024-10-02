import './App.css';
import { SearchUI } from './SearchUI.js';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<SearchUI/>}/>
      </Routes>
     </Router>
  );
}

export default App;
