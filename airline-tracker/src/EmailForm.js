import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      console.error('Error adding user:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddUserForm;