import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import react from 'react';
import axios from 'axios';
import React from 'react';

const Post = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query;
      const queryb = `{
            posts(filters: {slug:  { eq: "${slug}" }}){data{attributes{title, slug}}}
    
              }`;
      const options = {
        method: 'POST',
        url: 'http://localhost:1337/graphql',

        data: {
          query: queryb,
        },
      };
      axios.request(options).then((response) => {
        setPost(response.data.data.posts.data[0].attributes);
      });
    }
  }, [router.isReady]);

  if (!post) return null;
  return (
    <>
      <h1>Hello</h1>
      <h1>{post.title}</h1>
      <h6> {post.slug}</h6>
    </>
  );
};

export default Post;
