import React from "react"
import "./SearchResult.css"

export const SearchResult = ({result}) => {
    return (
        // change onClick to make the SearchBar field display the clicked result
        <div className="search-result" onClick={(e) => alert (`You clicked on ${result.name}`)}>{result.name}</div>
    )
}