import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Graphql() {
  const [post, setPost] = React.useState(null);
  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    setIsLogged(localStorage.getItem('jwt'));
  }, []);

  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',
    headers: {
      Authorization: `Bearer ${isLogged}`,
    },
    data: {
      query: `{
        posts{data{id, attributes{title,createdAt}}}
          }`,
    },
  };

  React.useEffect(() => {
    axios.request(options).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      {post.data.posts.data.map((pos) => (
        <h1>{pos.attributes.title}</h1>
      ))}
    </div>
  );
}

export default Graphql;
