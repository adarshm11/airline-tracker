import { useState } from "react";
import "./SearchUI.css";
import { SearchBar } from "./SearchBar";
import { useNavigate } from "react-router-dom";


export function SearchUI() {

    const navigate = useNavigate();

    // input fields for each search bar
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState(""); 

    // search results for each search bar
    const [results1, setResults1] = useState([]);
    const [results2, setResults2] = useState([]);

    // result that is selected via click for each search bar
    const [selectedResult1, setSelectedResult1] = useState(null);
    const [selectedResult2, setSelectedResult2] = useState(null);

    // when certain conditions are met, the 'GO' button should be unclickable
    const isGoButtonDisabled = !selectedResult1 || !selectedResult2 || selectedResult1 === selectedResult2;

    // error identifier for each search bar
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    
    // execute when the 'GO' button is clicked
    const handleGoClick = () => {
        navigate("/search-results");
        // next step: pass in the search queries for the API call
    };

    // change the display input of search bar #{barNumber} when it is updated to {value}
    const handleInputChange = (barNumber, value) => {

        if (barNumber === 1) { // departure search bar (#1)
            setInput1(value); // update display value -> new query
            if (!value) setSelectedResult1(null); // reset {selectedResult1} now that input was changed
        } 
        
        else { // arrival search bar (#2)
            setInput2(value);
            if (!value) setSelectedResult2(null);
        }

        // check if departure and arrival queries are identical -> should throw error
        const isIdentical = barNumber === 1 ? value === input2 : value === input1;

        if (isIdentical) {
            if (barNumber === 1) { // if the error was thrown from departure search bar (#1)
                setError1(true);
            } 
            
            else {
                setError2(true);
            }
        }

        else { // no error found
            if (barNumber === 1) {
                setError1(false);
            } else {
                setError2(false);
            }
        }
    };

    // when error is thrown, determine which error -> REDUNDANT TO CHECK FOR ERROR THEN CHECK WHICH ERROR
    const computeError = (barNumber, error) => {
        if (selectedResult1 && selectedResult2 && selectedResult1 === selectedResult2){
            return "Departure and arrival airports cannot be the same."
        } 
        else if (barNumber === 1){
            if (!selectedResult1) return "Enter departure airport."
            else return "Enter arrival airport."
        }
        else {
            if (!selectedResult2) return "Enter departure airport."
            else return "Enter arrival airport."
        }
    }

    return (
        <div>
            <div className="search-bar-container">
                <SearchBar 
                    setInput={(value) => {handleInputChange(1, value);}}
                    setResults={setResults1}
                    setSelectedResult={setSelectedResult1} 
                    searchType="Depart..." 
                    inputValue={input1}
                    error={error1}
                />
                <div className="error-message-wrapper">
                    {error1 && <div className="error-message">{computeError(1, error1)}</div>}
                </div>
            </div>
            <div className="search-bar-container">
                <SearchBar 
                    setInput={(value) => {handleInputChange(2, value);}}
                    setResults={setResults2} 
                    setSelectedResult={setSelectedResult2} 
                    searchType="Arrive..." 
                    inputValue={input2} 
                    error={error2}
                />
                <div className="error-message-wrapper">
                    {error2 && <div className="error-message">{computeError(2, error2)}</div>}
                </div>
            </div>
            <div className="search-bar-button">
                <button 
                    type="button" 
                    onClick={handleGoClick} 
                    disabled={isGoButtonDisabled} 
                >
                    GO
                </button>
            </div>
        </div>
    );
}