import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DivingCenterList = () => {
  const [clubs, setClubs] = React.useState(null);
  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',

    data: {
      query: `{
        diveCenters{
          data{
            id,
            attributes{
              name, 
              CurrentlyOpen, 
              City, 
              manager{
                data{
                  attributes{
                    username,
                    email
                  }
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
      setClubs(response.data.data.diveCenters);
    });
  }, []);

  if (!clubs) return null;

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name of the dive center
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Manager
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email of the manager
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      StATUS
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clubs.data.map((p, personIdx) => (
                    <tr
                      key={p.id}
                      className={
                        personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.attributes.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.attributes.City}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.attributes.manager.data.attributes.username}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.attributes.manager.data.attributes.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.attributes.CurrentlyOpen}

                        {p.attributes.CurrentlyOpen == true ? (
                          <p> Open </p>
                        ) : (
                          <p> Close </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivingCenterList;
