import { useNavigate } from 'react-router-dom';

export function FlightResults() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/add-user");
    }

    return (
        <div>
            <h1>Under Construction</h1>
            <p>This page, which displays the results of your search, is not yet functional. Please check back later!</p>
            <p>To continue to enter your information to enable notifications, click the button below</p>
            <button type="button" onClick={handleClick}>PROCEED</button>
        </div>
    )
}