import React, {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({setInput, setResults, setSelectedResult, searchType, inputValue, error}) => {

    const [resultsLocal, setResultsLocal] = useState([]);

    const SearchResult = ({result}) => {
        return (
            <div className="search-result" onClick={() => handleClick(result.name)}>
                {result.name}
            </div>
        )
    }

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
        setSelectedResult(null);
    };

    const handleClick = (value) => {
        setInput(value);
        setResultsLocal([]);
        setSelectedResult(value);
    }

    return (
        <div>
            <div className={`input-wrapper ${error ? 'error' : ''}`}>
                <FaSearch id="search-icon" />
                <input 
                    placeholder={searchType} 
                    value={inputValue} 
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="search-results">
                {resultsLocal.length > 0 && <SearchResults results={resultsLocal} />}
            </div>
        </div>
    );
};