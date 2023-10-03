import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import './Read.css'
function Read() {
  const [customer, setCustomer] = useState({ 
    name: '', 
    email: '',
    age: ''
  });
  const history = useHistory();
  const id  = Number(window.location.pathname.substring(6,window.location.pathname.length));


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://13.229.50.210:8443/demo123123/api/v1/customer/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <div>
      <h1>Chi tiết đối tượng</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={customer.name}
          readOnly
        />
        <input
          type="text"
          placeholder="Email"
          value={customer.email}
          readOnly
        />
        <input
          type="text"
          placeholder="Age"
          value={customer.age}
          readOnly
        />
      </form>
      <Link to="/">Quay lại danh sách</Link>
    </div>
  );
}

export default Read;