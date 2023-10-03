import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Home.css'

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://13.229.50.210:8443/demo20/api/v1/customers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://13.229.50.210:8443/demo20/api/v1/customers/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Customer list</h1>
      <input type="text" placeholder="Search" onChange={handleSearch}/>
      <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
          </tr>
        </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            <td>{item.id} </td> 
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.age}</td>
            <td>
            <button><Link to={`/edit/${item.id}`} state={{ originalData: item }}>Edit</Link></button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button><Link to={`/read/${item.id}`}>View details</Link></button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default Home;