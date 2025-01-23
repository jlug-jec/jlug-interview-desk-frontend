import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Ripple from '../components/Ripple';
import { useAdminContext } from '../contexts/Admin';

function User() {
  let { id } = useParams();
  id = id.replace(/['"]+/g, '');
  console.log(id)
  let adminid = sessionStorage.getItem('userid')
  adminid = adminid.replace(/['"]+/g, '');

  const {    
    load,
    userData,
    fetchUserData,
    handleAction,
    submission,
    fetchDashboardData,
    fetchLeaderboardData,
    fetchPendingApplicants,
    fetchBookmarks,
    
  } = useAdminContext();

  let submissions = [];
  if(submission) submissions = submission

  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(()=>{
    fetchUserData(id)
  }, [])

console.log(id)

  if (!userData) return <Ripple/>;

  return (
    
    <div className="bg-[#ECECEC] min-h-screen w-full p-4 lg:p-10 md:mb-11 mb-20">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-[90%] lg:w-[50%]">
            <h2 className="text-lg font-bold mb-4">Blacklist this Applicant</h2>
            <p className="font-medium text-wrap text-sm text-amber-500 pb-5">
              You are about to blacklist this applicant from the platform. Are you sure you want to continue? This action is irreversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 border-2 border-zinc-500 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleAction('blacklist', id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}



<div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl lg:text-4xl font-semibold text-left self-start">Applicant Profile</h1>
        <div className="flex gap-2 ">
          <button 
            className="font-semibold shadow-md border-2 border-green-500 text-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white" 
            onClick={() => handleAction('upvote', id)}>
            Upvote
          </button>
          <button 
            className="font-semibold shadow-md border-2 border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white" 
            onClick={() => handleAction('downvote', id)}>
            Downvote
          </button>
          <button 
            className="font-semibold shadow-md border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white" 
            onClick={() => handleAction('bookmark', id)}>
            Bookmark
          </button>
          <button 
            className="font-semibold shadow-md border-2 border-black text-black px-3 py-1 rounded-lg hover:bg-black hover:text-white" 
            onClick={() => setIsModalOpen(true)}>
            Blacklist
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="w-full lg:w-1/4 bg-white flex flex-col rounded-md shadow-lg gap-8 items-center p-5">
          <img src={userData.dp} className="w-32 h-32 lg:w-48 lg:h-48 border-8 border-double border-spacing-3 border-zinc-500 mt-7 rounded-full" alt="" />
          <div className="flex gap-4">
            <a href={userData.git || '#'} target="_blank" rel="noopener noreferrer">
              <img className="w-8 lg:w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/github-stroke-rounded.svg?alt=media&token=ad8bc54b-c9c7-46cf-a935-39166bab7b5b" alt="GitHub" />
            </a>
            <a href={userData.link || '#'} target="_blank" rel="noopener noreferrer">
              <img className="w-8 lg:w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/linkedin-02-stroke-rounded.svg?alt=media&token=41c80506-9e59-4212-8f9a-705cfbfd451b" alt="LinkedIn" />
            </a>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h4 className="text-lg lg:text-xl font-semibold">{userData.name} {userData.gender === 'male' ? '(M)' : '(F)'}</h4>
            <h4 className="text-sm lg:text-md font-semibold">{userData.branch}</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex"><img className="mr-2 w-5" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/location-04-stroke-rounded.svg?alt=media&token=0b209a08-ed9f-480a-9a35-2f347f958a34" alt="" />{userData.loc || 'Not specified'}</li>
              <li><a className="flex" href={userData.port || '#'}><img className="mr-2 w-5" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/job-link-stroke-rounded.svg?alt=media&token=540b520a-a97c-440a-b0f2-892b25af241b" alt="" />{userData.port || 'No Portfolio'}</a></li>
              <li className="flex"><img className="mr-2 w-5" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/mail-01-stroke-rounded.svg?alt=media&token=9d3e616a-809e-4365-991f-e46f58509a1a" alt="" />{userData.email}</li>
              <li className="flex"><img className="mr-2 w-5" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/whatsapp-stroke-rounded.svg?alt=media&token=a97f5718-255e-46d0-bdd2-70b22b3b66e9" alt="" />{userData.contact}</li>
            </ul>
          </div>
        </div>

        
        <div className='w-full sm:w-[68vw] bg-white shadow-lg rounded-lg'>
  <h4 className='text-xl font-semibold m-4'>Bio</h4>
  <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userData.bio !== '' ? userData.bio : 'No Data'}</p>

  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 m-4'>
    <ul className='bg-[#ECECEC] py-2 px-4 rounded-lg'>
      <h4 className='text-xl font-semibold mb-4 '>Skills</h4>
      {userData.skills && userData.skills.length > 0 ? (
        userData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))
      ) : (
        <li>No skills available</li>
      )}
    </ul>

    <ul className="bg-[#ECECEC] py-2 px-4 rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Projects</h4>
      {userData.projects && Object.keys(userData.projects).length > 0 ? (
        Object.entries(userData.projects).map(([name, url], index) => (
          <li key={index} className="flex items-center justify-between py-2">
            <span>{name}</span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline flex items-center"
            >                        
              <div className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] px-4 rounded-lg">
                View
              </div>
            </a>
          </li>
        ))
      ) : (
        <li>No projects available</li>
      )}
    </ul>
  </div>

  <h4 className='text-xl font-semibold m-4'>Tasks</h4>
  <ul className='bg-[#ECECEC] py-2 px-4 m-5 rounded-lg'>
    {submissions.length === 0 && (
      <div className="text-orange-400 border-orange-400 w-fit m-auto border-2 rounded-lg px-2">
        No Submission made yet!
      </div>
    )}
    {submissions.map((submission, index) => (
      <li key={index} className='flex flex-row justify-between items-center gap-5 m-2'>
        {submission.taskName} 
        <div className='text-green-400 border-green-400 border-2 rounded-lg p-1 md:h-auto md:flex hidden'>Completed</div>
        <div  className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] px-4 rounded-lg">
              <a href={submission.fileUrl} className='text-[#23B0FF]'>View</a> 
              </div>
      </li>
    ))}
  </ul>

  <h4 className='text-xl font-semibold m-2 ml-5'>Why do you want to join the team?</h4>
  <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userData.why !== '' ? userData.why : 'No Data'}</p>
</div>
</div>
</div>
  );
}

export default User;
