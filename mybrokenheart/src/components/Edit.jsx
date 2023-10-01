import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';

function Edit() {
  const [edit, setEdited] = useState({ 
    name: '', 
    email: '',
    age: ''
  });
  const history = useHistory();
  const id  = Number(window.location.pathname.substring(6,window.location.pathname.length));

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://13.229.50.210:8443/demo123123/api/v1/customer/${id}`);
      setEdited(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleEdit = async (event) => { 
    event.preventDefault();
    try {
      await axios.put(`https://13.229.50.210:8443/demo123123/api/v1/customers/${id}`, edit);
      alert('Customer updated successfully')
      history.push('/');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleNameChange = (e) => {
    setEdited({ ...edit, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEdited({ ...edit, email: e.target.value });
  };

  const handleAgeChange = (e) => {
    setEdited({ ...edit, age: e.target.value });
  };

  return (
    <div>
      <h1>Chỉnh sửa đối tượng</h1>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          placeholder="Name"
          value={edit.name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Email"
          value={edit.email}
          onChange={handleEmailChange}
        />
        <input
          type="text"
          placeholder="Age"
          value={edit.age}
          onChange={handleAgeChange}
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default Edit;