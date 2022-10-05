import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import react from 'react';
import axios from 'axios';
import React from 'react';
import Header_Dashboard from '../../../components/admin/Header_Dashboard';
import BadgeError from '../../../components/ui/BadgeError';
import BadgeGood from '../../../components/ui/BadgeGood';

const ClubsDetails = () => {
  const [club, setClub] = useState(null);
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query;
      const queryb = `{
        diveCenters(filters: {slug:  { eq: "${slug}" }}){
          data{
            attributes{
              name
              summary
              adresse
              City
              mail
              manager{data{attributes{username, email}}}
            }
          }
        }    
              }`;
      const options = {
        method: 'POST',
        url: 'http://localhost:1337/graphql',

        data: {
          query: queryb,
        },
      };
      axios.request(options).then((response) => {
        setClub(response.data.data.diveCenters.data[0].attributes);
      });
    }
  }, [router.isReady]);

  if (!club) return null;
  return (
    <>
      <Header_Dashboard>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="uppercase text-lg leading-6 font-medium text-gray-900">
              {club.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {club.CurrentlyOpen == true ? (
                <BadgeGood label="Open" />
              ) : (
                <BadgeError label="Close" />
              )}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Manager</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {club.manager.data.attributes.username}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Application for
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {club.adresse} - {club.City}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {club.manager.data.attributes.email} -{club.mail}
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Short Présentation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {club.summary}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Activities
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          resume_back_end_developer.pdf
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          coverletter_back_end_developer.pdf
                        </span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Header_Dashboard>
    </>
  );
};

export default ClubsDetails;
