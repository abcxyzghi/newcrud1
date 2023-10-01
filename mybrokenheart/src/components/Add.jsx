import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCustomer = {
      name: name,
      email: email,
      age: age
    };

    try {
      await axios.post('https://13.229.50.210:8443/demo20/api/v1/customers',newCustomer); // replace with your API endpoint for adding a customer
      alert('Customer added successfully!');
      history.push('/');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" value={age} onChange={handleAgeChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Add;