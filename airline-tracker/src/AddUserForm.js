import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

export function AddUserForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === ""){
      setError("Please enter your name.")
      return;
    }

    if (!emailRegex.test(email) || email.trim() === "") {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/users', {
        name,
        email,
      });

      console.log('User added:', response.data);
      // Optionally, reset the form
      setName('');
      setEmail('');
    } catch (error) {

      if (error.response && error.response.data) {
        setError(error.response.data.message || 'There was an error adding the user.');
      } 
      
      else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Enter Your Information</h1>
      <form className="form-container" onSubmit={handleSubmit}>
          <input className="name-input-field"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input className="email-input-field"
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        {error && <div className="error-message">{error}</div>}

        <button 
          className="submit-button" 
          type="submit">
            <strong>SUBMIT</strong>
        </button>
      </form>
    </div>
  );
};