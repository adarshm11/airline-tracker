import React, {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({setResults, searchType}) => {

    const [input, setInput] = useState("");
    const [results, setResultsLocal] = useState([]);

    const SearchResult = ({result}) => {
        return (
            <div className="search-result" onClick={() => handleClick(result.name)}>
                {result.name}
            </div>
        )
    }

    // 
    const SearchResults = ({results}) => {
        return (
            <div className="results-list">
                {results.map((result, id) => {
                    return <SearchResult result={result} key={id}/>;
                })}
            </div>
        );
    };

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users") 
        .then((response) => response.json())
        .then((json) => { 
            const filteredResults = json.filter((user) => { 
                return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase());
            });
            setResultsLocal(filteredResults); 
            setResults(filteredResults);
        });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    const handleClick = (value) => {
        setInput(value);
        setResultsLocal([]);
    }

    return (
        <div>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input 
                    placeholder={searchType} 
                    value={input} 
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="search-results">
                {results.length > 0 && <SearchResults results={results} />}
            </div>
        </div>
    );
};