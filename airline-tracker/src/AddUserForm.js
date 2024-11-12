import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

export function AddUserForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerificationSent){
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
        const response = await axios.post('http://localhost:5001/add-user', {
          name,
          email,
        });

        console.log('User added:', response.data);
        setIsVerificationSent(true);
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
    }
    else {
      try {
        const response = await axios.post("http://localhost:5001/verify-user", {
          email,
          code: verificationCode,
        })
        console.log("User verified:", response.data);
        setIsVerified(true);
        setError("");
      } catch (error) {
        if (error.response && error.response.data){
          setError(error.response.data || "There was an error verifying the code.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div>
      <h1>{isVerified ? "Verify Your Email" : "Enter Your Information"}</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        {!isVerificationSent ? (
          <>
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
          </>
        ) : (
          <>
            <input 
              className="verification-input-field"
              type="text"
              placeholder="Enter your verification code..."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </>
        )}

        {error && <div className="error-message">{error}</div>}

        <button 
          className="submit-button" 
          type="submit">
            <strong>{isVerificationSent ? "VERIFY" : "SUBMIT"}</strong>
        </button>
      </form>
    </div>
  );
};