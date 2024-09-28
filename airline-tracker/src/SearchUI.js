import { useState } from "react"
import "./SearchUI.css"
import { SearchBar } from "./search-ui-components/SearchBar";
import { SearchResults } from "./search-ui-components/SearchResults";

function SearchUI() {

    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    return (
        <div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults} searchType="Depart..." />
                <SearchResults results={results} />
            </div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults2} searchType="Destination..." />
                <SearchResults results={results2} />
            </div>
            <div className="search-bar-button">
                <button type="button" onClick={(e) => window.confirm("Proceed?")}>GO</button>
            </div>
        </div>

    )
}

export default SearchUI;