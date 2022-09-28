import React from 'react';
import Admin from '../components/layouts/Admin';
import Graphql from '../components/Graphql';
import Layout from '../components/Layout';
import Test from '../components/Test';
import { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';

const Dashboard = () => {
  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    setIsLogged(localStorage.getItem('username'));
  }, []);

  return (
    <div>
      <Layout>
        <Navbar />
        <h1>Hello {isLogged}</h1>
        <Graphql />
        {/* <Test /> */}
      </Layout>
    </div>
  );
};

export default Dashboard;
