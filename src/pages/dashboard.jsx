import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import approve from '../assets/Approval.png';
import people from '../assets/People.png';
import book from '../assets/Bookmark.png';
import time from '../assets/Time.png';
import star from '../assets/Star.png';
import { Link } from 'react-router-dom';
import Ripple from '../components/Ripple';
import { useAdminContext } from '../contexts/Admin';

function Dashboard() {
  const id = JSON.parse(sessionStorage.getItem('userid'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const {
    stats,
    leaderboard,
    pendingApplicants,
    load,
    fetchDashboardData,
    fetchLeaderboardData,
    fetchPendingApplicants,
  } = useAdminContext();

  const image = [people, approve, time, book];

  useEffect(() => {
    if(user){
      fetchDashboardData(user)
      fetchLeaderboardData(user)
      fetchPendingApplicants(user)
    }
  }, [id]);

  return (
    <>
      {load || !pendingApplicants || !leaderboard ? (
        <Ripple />
      ) : (
        <div className="bg-zinc-100 pb-10 w-full h-full md:mb-0 mb-10">
          <h1 className="font-semibold md:p-10 p-5 text-3xl md:text-4xl text-left">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-12 mb-14">
            {[
              { count: stats.totalApplicants, text: 'Total Applicants' },
              { count: stats.applicationsReviewed, text: 'Applications Reviewed' },
              { count: stats.pendingApplications, text: 'Pending Applications' },
              { count: stats.applicationsBookmarked, text: 'Applications Bookmarked' },
            ].map((pop, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-full h-32 bg-white shadow-md shadow-zinc-400 rounded-lg"
              >
                <div className='flex flex-row gap-x-12  items-center justify-center w-full'>
                  <img className="w-16 h-16" src={image[i]} alt="" />
                  <h1 className="text-2xl mt-2">{pop.count}</h1>
                </div>
                <h3 className="text-zinc-500 text-sm sm:text-base mt-1 p-2">{pop.text}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-12">
            
            <div className="w-full lg:w-3/5 h-auto p-6 bg-white shadow-md shadow-zinc-400 rounded-lg">
              <h1 className="w-full border-b-2 pb-2 border-black font-semibold text-xl">Leader Board</h1>
              {leaderboard.slice(0, 3).map((student, i) => (
                <div
                  key={i}
                  className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
                >
                  <div className="flex items-center gap-6">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={student.dp}
                      alt=""
                    />
                    <h1 className="text-sm sm:text-base">{student.name}</h1>
                  </div>
                  <div className="flex gap-3 items-center">
                    <img className="w-7 h-7" src={star} alt="" />
                    <h1 className="text-sm sm:text-base">{student.net}</h1>
                  </div>
                </div>
              ))}
              <Link to={`/leader`}>
                <div className="font-semibold border-2 w-full sm:w-[50%] text-center h-[10%] border-[#23B0FF] text-[#23B0FF] px-4 py-2 rounded-lg m-auto mt-3">
                  View Leaderboard
                </div>
              </Link>
            </div>


            <div className="w-full lg:w-2/5 h-auto p-6 bg-white shadow-md shadow-zinc-400 rounded-lg">
              <h1 className="border-b-2 pb-2 border-black font-semibold text-xl">Pending Applicants</h1>
              {pendingApplicants.length === 0 && (
                <div className="text-lg text-center p-3 text-blue-500">
                  No Pending Applicants
                </div>
              )}
              {pendingApplicants.length > 0 &&
                pendingApplicants.slice(0, 3).map((applicant, i) => (
                  <div
                    key={i}
                    className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
                  >
                    <div className="flex items-center gap-6">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={applicant.dp}
                        alt=""
                      />
                      <h1 className="text-sm sm:text-base">{applicant.name}</h1>
                    </div>
                  </div>
                ))}
              {pendingApplicants.length !== 0 && (
                <Link to={`/review`}>
                  <div className="font-semibold border-2 mt-2 text-center w-full md:w-[70%] h-[10%] border-[#23B0FF] text-[#23B0FF] px-4 py-2 rounded-lg m-auto">
                    View Pending Applicants
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
