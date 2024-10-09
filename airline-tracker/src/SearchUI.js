import { useState } from "react"
import "./SearchUI.css"
import { SearchBar } from "./search-ui-components/SearchBar";
import { useNavigate } from "react-router-dom";


export function SearchUI() {

    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    return (
        <div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults} searchType="Depart..." />
            </div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults2} searchType="Destination..." />
            </div>
            <div className="search-bar-button">
                <button type="button" onClick={() => navigate("/search-results")}>GO</button>
            </div>
        </div>

    )
}