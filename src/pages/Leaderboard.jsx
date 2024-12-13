import React, { useState, useEffect } from 'react';
import avatar1 from '../assets/3d_avatar_1.png';
import { Link } from 'react-router-dom';
import avatar2 from '../assets/3d_avatar_13.png';
import star from '../assets/Star.png';
import Ripple from '../components/Ripple';
import { useAdminContext } from '../contexts/Admin';
  


const Leader = () => {
  const {    
    stats,
    leaderboard,
    pendingApplicants,
    load,
    fetchDashboardleaderboard,
    fetchLeaderboardleaderboard,
    fetchPendingApplicants
  } = useAdminContext();

  
console.log(leaderboard)

  return (
<>
    {load && <Ripple />} 
      {!load && (
        <div className="flex-1  w-100">
          <div className="w-full px-6 md:px-6  sm:p-4 p-4 sm:pl-6">
            <header className="w-full h-16">
              <div className="mt-auto max-w-full md:pl-6 pl-0">
                <h1 className="md:text-4xl text-3xl tracking-tight font-semibold text-left">Leaderboard</h1>
              </div>
            </header>
            <div className="bg-white m-auto md:w-[95%] min-h-[70vh] flex flex-col md:p-10 p-5 rounded-xl drop-shadow-lg w-[100%] relative z-[-1] md:mb-0 mb-20">
              {leaderboard.length > 0 ? (
                <div role="list" className="flex flex-col gap-4">
                  {leaderboard.map((bookmark) => (
  
                    <div
                      key={bookmark.name}
                      className="flex justify-between items-center gap-x-4 md:gap-x-6 py-4 w-full min-h-[10px]"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          src={bookmark.dp}
                          alt={`Avatar of ${bookmark.name}`}
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex flex-auto items-center">
                          <p className="text-4 font-semibold leading-6 text-center text-gray-900">
                            {bookmark.name} {bookmark.id}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-between ${
                          bookmark.net < 10 ? 'gap-5' : 'gap-3'
                        }`}
                      >
                        <div className="text-yellow-500 h-7 w-7 flex justify-center items-center">
                          <img src={star} alt="star" />
                        </div>
                        <div>{bookmark.net < 0 ? '0' : bookmark.net}</div>

                        <Link to={`https://jlug-interview-desk-frontend.vercel.app/leader/user/${bookmark.id}`}>
                          <div className="font-semibold shadow-md border-2 border-primary text-primary md:px-4 md:py-1 p-1 h-auto rounded-lg hover:bg-primary hover:text-white md:w-auto w-[60px] text-sm ">
                            View Profile
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center justify-center font-semibold text-lg text-gray-500">
                  <p>Leaderboard not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leader;
