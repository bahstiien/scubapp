import React from 'react';
import { useState, useEffect } from 'react';

const Admin = ({ children }) => {
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('jwt'));
  }, []);

  return <>{isLogged ? <main>{children}</main> : <p> No way</p>}</>;
};

export default Admin;
