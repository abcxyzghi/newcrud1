import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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
      <h1>Danh sách đối tượng</h1>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.email} - {item.age}
            <button><Link to={`/edit/${item.id}`} state={{ originalData: item }}>Chỉnh sửa</Link></button>
            <button onClick={() => handleDelete(item.id)}>Xóa</button>
            <button><Link to={`/read/${item.id}`}>More details</Link></button>
          </li>
        ))}
      </ul>
      <Link to="/add">Thêm mới</Link>
    </div>
  );
}

export default Home;