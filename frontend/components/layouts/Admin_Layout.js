import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header_Dashboard from '../admin/Header_Dashboard';

function Layout({ children }) {
  const [post, setPost] = React.useState(null);
  const [isLogged, setIsLogged] = useState('');
  const [user, setUser] = useState('');

  const adminRole = 3;
  let isAdmin = false;

  useEffect(() => {
    setIsLogged(localStorage.getItem('jwt'));
    setUser(parseInt(localStorage.getItem('id')));
  }, []);

  console.log(user);
  console.log(isLogged);

  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',
    headers: {
      Authorization: `Bearer ${isLogged}`,
    },
    data: {
      query: `{
        usersPermissionsUser(id:14){
            data{
                attributes{
                role{
                  data{
                    id, 
                  }
                }
              }
            }
          }
    }`,
    },
  };

  useEffect(() => {
    axios.request(options).then((response) => {
      setPost(
        response.data.data.usersPermissionsUser.data.attributes.role.data,
      );
    });
  }, []);

  if (!post) return null;

  const currentRole = parseInt(post.id);

  if (currentRole === adminRole) {
    isAdmin = true;
  }

  return (
    <>
      {isAdmin ? (
        <Header_Dashboard>{children}</Header_Dashboard>
      ) : (
        <p> No way</p>
      )}
    </>
  );
}

export default Layout;
