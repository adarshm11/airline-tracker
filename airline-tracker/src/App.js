import logo from './logo.svg';
import './App.css';
import SearchUI from './index.js';
import { useState } from 'react'

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (searchTerm) => {
    // search logic
  }
  return (
    <div>
      <SearchUI search={handleSearch}/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <SearchUI search={items} />
    //   </header>
    // </div>
  );
}

export default App;
