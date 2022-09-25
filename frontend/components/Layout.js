import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Layout({ children }) {
  const [post, setPost] = React.useState(null);
  const [isLogged, setIsLogged] = useState('');
  const [user, setUser] = useState('');

  const adminRole = 4;
  let isAdmin = false;

  useEffect(() => {
    setIsLogged(localStorage.getItem('jwt'));
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem('id'));
  }, []);

  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',
    headers: {
      Authorization: `Bearer ${isLogged}`,
    },
    data: {
      query: `{
        usersPermissionsUser(id:8){
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

  React.useEffect(() => {
    axios.request(options).then((response) => {
      setPost(
        response.data.data.usersPermissionsUser.data.attributes.role.data,
      );
    });
  }, []);

  if (!post) return null;

  const currentRole = parseInt(post.id);

  console.log(user);
  if (currentRole === adminRole) {
    isAdmin = true;
  }

  console.log('isAdmin', isAdmin);
  //   console.log('id of user ' + user);
  //   console.log('id of admin ' + adminRole);
  //   console.log(
  //     'current role ' +
  //       post.data.usersPermissionsUser.data.attributes.role.data.id,
  //   );
  //   {
  //     post.data.usersPermissionsUser.map((pos) => console.log('hello'));
  //   }

  //   if (currentRole === adminRole) {
  //     setisAdmin(true);
  //   }

  // console.log('isAdmin ' + isAdmin);

  return <>{isAdmin ? <main>{children}</main> : <p> No way</p>}</>;
}

export default Layout;
