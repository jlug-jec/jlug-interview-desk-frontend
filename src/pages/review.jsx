import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import avatar1 from '../assets/3d_avatar_1.png';
import avatar2 from '../assets/3d_avatar_13.png';
import avatar3 from '../assets/3d_avatar_21.png';
import Nav from '../Nav';



const Review = () => {
  const applicants = {
    applicant1: {
      name: "Halwa",
      profileId: 1
    },
    applicant2: {
      name: "Poori",
      profileId: 2
    },
    applicant3: {
      name: "Chhole",
      profileId: 3
    }
  };

  const avatars = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
  };

  const getAvatarUrl = (id) => avatars[id]

  return (
    <div className="flex-1 pt-10 w-100">
    <div className= " w-full px-6 md:px-6 lg:px-10  pb-10 lg:pb-20 xl:pb-20">
      <header className="w-full h-16">
        <div className="mt-auto max-w-full pl-6 ">
          <h1 className="text-4xl tracking-tight font-semibold text-left">Review Applications</h1>
        </div>
      </header>
      <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-4 rounded-xl drop-shadow-lg">

      
      <div className="p-3">
      {Object.entries(applicants).map(([key, applicant]) => (
        <div
          key={key}
          className="flex items-center gap-4 w-full p-4 mb-4 "
        >
          <img
            src={getAvatarUrl(applicant.profileId)}
            alt={`Avatar of ${applicant.name}`}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
          <div className='flex flex-row justify-between w-full items-center'>
              <span className="text-lg font-medium ml-4">{applicant.name}</span>

              <Link to='/user'>
                <div className='font-semibold shadow-md border-2 border-primary text-primary px-4 py-1 rounded-lg hover:bg-primary  hover:text-white' href="">
                  View Profile
                </div>
              </Link>
          </div>

          </div>
      ))}
    </div>
    </div>
  </div>
  </div>
    
  );
};


export default Review;