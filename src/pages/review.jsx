import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar1 from '../assets/3d_avatar_1.png';

import Ripple from '../components/Ripple';

import { useAdminContext } from '../contexts/Admin';

const Review = () => {
  const {    
    stats,
    leaderboard,
    pendingApplicants,
    load,
    fetchDashboardleaderboard,
    fetchLeaderboardleaderboard,
    fetchPendingApplicants
  } = useAdminContext();


  return (
    <>
      {load && <Ripple />} 
      
      {!load && (
        <div className="flex-1 pt-10 w-full">
          <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
            <header className="w-full h-16">
              <div className="mt-auto max-w-full pl-6">
                <h1 className="text-4xl tracking-tight font-semibold text-left">
                  Review Applications
                </h1>
              </div>
            </header>
            <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-4 rounded-xl drop-shadow-lg">
              <div className="p-3">
                {pendingApplicants.length > 0 ? (
                  pendingApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center gap-4 w-full md:p-4 md:mb-4 p-0 "
                    >
                      <img
                        src={applicant.dp}
                        alt={`Avatar of ${applicant.name}`}
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex flex-row justify-between w-full items-center">
                        <span className="text-lg font-medium ml-4">
                          {applicant.name}
                        </span>

                        <Link to={`/user/${applicant.id}`}>
                          <div className="font-semibold shadow-md border-2 border-primary text-primary md:px-4 py-1 rounded-lg hover:bg-primary hover:text-white px-2 text-sm ">
                            View Profile
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No pending applications to review.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;