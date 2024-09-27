import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// function SearchUI(){
//   const [searchTerm, , setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);
//   };

//   return (
//     <div>
//       <input
//         type = "text"
//         value = {searchTerm}
//         onChange = {handleSearch}
//         placeholder = "Search..."
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         {/*search logic*/}
//         {results.map((result) => (
//           <div key={result.id}>{result.name}</div>
//         ))}
//       </div>
//     </div>
//     );
// }
// export default SearchUI;