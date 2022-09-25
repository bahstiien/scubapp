import React from 'react';
import Admin from '../components/Admin';
import Graphql from '../components/Graphql';
import Layout from '../components/Layout';
import Test from '../components/Test';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    setIsLogged(localStorage.getItem('username'));
  }, []);

  return (
    <div>
      <Layout>
        <h1>Hello {isLogged}</h1>
        <Graphql />
        {/* <Test /> */}
      </Layout>
    </div>
  );
};

export default Dashboard;
