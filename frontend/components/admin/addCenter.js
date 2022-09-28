import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const AddCenter = () => {
  const [manager, setManager] = React.useState(null);
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
        usersPermissionsRole(id:5){ data {id, attributes{name,users{ data{id, attributes{username}}}}}}

            }`,
    },
  };

  React.useEffect(() => {
    axios.request(options).then((response) => {
      setManager(response.data.data.usersPermissionsRole);
    });
  }, []);

  if (!manager) return null;

  return (
    // <form className="space-y-8 divide-y divide-gray-00">
    //   <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    //     <div>
    //       <div>
    //         <h3 className="text-lg leading-6 font-medium text-gray-900">
    //           Ajout d'un club
    //         </h3>
    //         <p className="mt-1 max-w-2xl text-sm text-gray-500">
    //           This information will be displayed publicly so be careful what you
    //           share.
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="bg-white px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    //     <div className="-mx-3 md:flex mb-6">
    //       <div className="md:w-1/2 px-3 mb-6 md:mb-0">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-first-name"
    //         >
    //           First Name
    //         </label>
    //         <input
    //           className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
    //           id="grid-first-name"
    //           type="text"
    //           placeholder="Jane"
    //         />
    //         <p className="text-red text-xs italic">
    //           Please fill out this field.
    //         </p>
    //       </div>
    //       <div className="md:w-1/2 px-3">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-last-name"
    //         >
    //           Last Name
    //         </label>
    //         <input
    //           className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    //           id="grid-last-name"
    //           type="text"
    //           placeholder="Doe"
    //         />
    //       </div>
    //     </div>
    //     <div className="-mx-3 md:flex mb-6">
    //       <div className="md:w-full px-3">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-password"
    //         >
    //           Password
    //         </label>
    //         <input
    //           className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
    //           id="grid-password"
    //           type="password"
    //           placeholder="******************"
    //         />
    //         <p className="text-grey-dark text-xs italic">
    //           Make it as long and as crazy as you'd like
    //         </p>
    //       </div>
    //     </div>
    //     <div className="-mx-3 md:flex mb-2">
    //       <div className="md:w-1/2 px-3 mb-6 md:mb-0">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-city"
    //         >
    //           City
    //         </label>
    //         <input
    //           className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    //           id="grid-city"
    //           type="text"
    //           placeholder="Albuquerque"
    //         />
    //       </div>
    //       <div className="md:w-1/2 px-3">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-state"
    //         >
    //           State
    //         </label>
    //         <div className="relative">
    //           <select
    //             className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
    //             id="grid-state"
    //           >
    //             <option>New Mexico</option>
    //             <option>Missouri</option>
    //             <option>Texas</option>
    //           </select>
    //           <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
    //             <svg
    //               className="h-4 w-4"
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 20 20"
    //             >
    //               <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="md:w-1/2 px-3">
    //         <label
    //           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    //           for="grid-zip"
    //         >
    //           Zip
    //         </label>
    //         <input
    //           className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    //           id="grid-zip"
    //           type="text"
    //           placeholder="90210"
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="pt-5">
    //     <div className="flex justify-end">
    //       <button
    //         type="button"
    //         className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         Save
    //       </button>
    //     </div>
    //   </div>
    // </form>

    <div className="group inline-block">
      <div className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
        <select name="cars" id="cars">
          <option
            value="init"
            className="rounded-sm px-3 py-1 hover:bg-gray-100"
          >
            Manager
          </option>

          {manager.data.attributes.users.data.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="rounded-sm px-3 py-1 hover:bg-gray-100"
            >
              {m.attributes.username}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddCenter;
