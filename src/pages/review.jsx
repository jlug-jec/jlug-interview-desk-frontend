import React, { useState } from 'react';

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
    // Add more avatars as needed
  };

  const getAvatarUrl = (id) => avatars[id]

  return (
    <div className="flex-1 pt-10 w-100">
    <div className= " w-full px-6 md:px-6 lg:px-10  pb-10 lg:pb-20 xl:pb-20">
      <header className="w-full h-14">
        <div className="mt-auto max-w-full pl-3 ">
          <h1 className="text-4xl tracking-tight font-semibold text-left">Review Applications</h1>
        </div>
      </header>
      <div className="px-4 py-6 sm:px-10 lg:px-10 w-full mt-6 sm:m-2 bg-white min-h-screen pb-10 lg:pb-[15vh] xl:pb-[20vh]">

      {/* Your content */}
      
      <div className="p-6">
      {Object.entries(applicants).map(([key, applicant]) => (
        <div
          key={key}
          className="flex items-center justify-start bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
        >
          {/* Avatar on the left */}
          <img
            src={getAvatarUrl(applicant.profileId)}
            alt={`Avatar of ${applicant.name}`}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />

          {/* Applicant's name next to the avatar */}
          <span className="text-lg font-medium ml-4">{applicant.name}</span>

          {/* Button linking to the profile (moved to the far right) */}
          <a
            href={`/profile/${applicant.profileId}`}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Profile
          </a>
        </div>
      ))}
    </div>
    </div>
  </div>
  </div>
    
  );
};


export default Review;