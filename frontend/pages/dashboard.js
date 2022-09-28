import React from 'react';
import Admin_Layout from '../components/layouts/Admin_Layout';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    setIsLogged(localStorage.getItem('username'));
  }, []);

  return (
    <div>
      <Admin_Layout>
        <h1>Hello {isLogged}</h1>

        {/* <Test /> */}
      </Admin_Layout>
    </div>
  );
};

export default Dashboard;
