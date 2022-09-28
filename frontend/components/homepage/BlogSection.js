import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import fake from '../../public/img/fakepeople.jpeg';
import logo from '../../public/img/logo.png';

const BlogSection = () => {
  const [posts, setPosts] = React.useState(null);
  const [tag, setTags] = React.useState(null);
  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',

    data: {
      query: `{
        posts{
          
            data{
              id
              attributes{
                
                title, 
                slug, 
                publishedAt, 
                timeToRead, 
                summary, 
              
                editor{
                  data{
                    attributes{
                      username,
                      MainPhoto{data{attributes{url}}}}
                  }
                }
                tag{
                  data{
                    attributes{
                      name, 
                      slug}}}
              
                cover{
                  data{
                    attributes{
                      url}
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
      setPosts(response.data.data.posts);
    });
  }, []);

  if (!posts) return null;

  console.log(posts);
  return (
    <div>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.data.map((post) => (
              <div
                key={post.attributes.slug}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    //src="https://images.unsplash.com/photo-1611625711125-c0cfc024854f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    src={`http://localhost:1337${post.attributes.cover.data[0].attributes.url}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        {post.attributes.tag.data.attributes.name}
                      </a>
                    </p>
                    <a
                      href={`blog/${post.attributes.slug}`}
                      className="block mt-2"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        {post.attributes.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.attributes.summary}
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">
                          {post.attributes.editor.data.attributes.username}
                        </span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`http://localhost:1337${post.attributes.editor.data.attributes.MainPhoto.data.attributes.url}`}
                          //  src={`http://localhost:1337${post.attributes.editor.data.attributes.mainPhoto.data[0].attributes.url}`}
                          alt="my profil"
                        />
                      </a>

                      {console.log(
                        post.attributes.editor.data.attributes.MainPhoto.data
                          .attributes.url,
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          {post.attributes.editor.data.attributes.username}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        {/* <time dateTime={post.datetime}>{post.date}</time> */}
                        <span aria-hidden="true">📚</span>
                        <span>{post.attributes.timeToRead} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection; /* This example requires Tailwind CSS v2.0+ */
