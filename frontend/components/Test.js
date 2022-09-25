import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Test = () => {
  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    setIsLogged(localStorage.getItem('jwt'));
  }, []);

  // Request API.
  axios
    .get('http://localhost:1337/api/users', {
      // place authorization header here
      headers: {
        Authorization: `Bearer ${isLogged}`,
      },
    })
    .then((response) => {
      // Handle success.
      console.log('Data: ', response.data);
    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test;
