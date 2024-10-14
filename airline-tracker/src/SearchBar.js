import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";
import airportData from "./airport_codes.json";

export const SearchBar = ({setInput, setResults, setSelectedResult, searchType, inputValue, error}) => {

    const [resultsLocal, setResultsLocal] = useState([]);

    const SearchResult = ({result}) => {
        return (
            <div className="search-result" onClick={() => handleClick(result.id)}>
                {result.id} - {result.name}
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
        const filteredResults = airportData.filter((entry) => { // must make better filtering algorithm
            return value && entry && entry.name && entry.id &&
            (entry.name.toLowerCase().includes(value.toLowerCase()) || 
            entry.id.toLowerCase().includes(value.toLowerCase()));
            
        });
        setResultsLocal(filteredResults); 
        setResults(filteredResults);
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