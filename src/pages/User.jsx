import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const user_image = "https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png";
  const { id } = useParams();
  let adminid = localStorage.getItem('userid')
  adminid = adminid.replace(/['"]+/g, '');

  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/get-user/${id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user details.');
        const userData = await userResponse.json();
        setUserDetails(userData);

        const submissionsResponse = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/get-submissions/${id}`);
        if (!submissionsResponse.ok) throw new Error('Failed to fetch submissions.');
        const submissionsData = await submissionsResponse.json();
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAction = async (actionType) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/${actionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id , adminId : adminid}),
      });

      const data = await response.json();
      alert(data.message || `Action ${actionType} completed successfully.`);
      localStorage.setItem('refresh', new Date())
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
      alert(`Error during ${actionType}.`);
    }
  };

  if (!userDetails) return <div>Loading...</div>;

  return (



    
    <div className='bg-[#ECECEC] h-screen w-full p-10 mb-11'>


    
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-[50%]">
            <h2 className="text-lg font-bold mb-4">Blacklist this Applicant</h2>
            <p className='font-medium text-wrap text-sm text-amber-500 pb-5'> 
                You are about to blacklist this applicant from platform. Are you sure you want to continue ? This action is irreversible .
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
                onClick={() => handleAction('blacklist')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}


      <div className='flex flex-row w-full justify-between items-center'>
        <div className='text-4xl font-semibold '>Applicant Profile</div>
        <div className='flex gap-4'>
          <button 
            className='font-semibold shadow-md border-2 border-green-500 text-green-500 px-4 py-1 rounded-lg hover:bg-green-500 hover:text-white' 
            onClick={() => handleAction('upvote')}>
            Upvote
          </button>
          <button 
            className='font-semibold shadow-md border-2 border-red-500 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white' 
            onClick={() => handleAction('downvote')}>
            Downvote
          </button>
          <button 
            className='font-semibold shadow-md border-2 border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white' 
            onClick={() => handleAction('bookmark')}>
            Bookmark
          </button>
          <button 
            className='font-semibold shadow-md border-2 border-black text-black px-4 py-1 rounded-lg hover:bg-black hover:text-white' 
            onClick={() => setIsModalOpen(true)}>
            Blacklist
          </button>
        </div>
      </div>

      <div className='flex flex-row w-full gap-2 mt-10'>
        <div className=' w-[25vw]  bg-white flex flex-col rounded-md shadow-lg  gap-8 items-center p-5'>
            <img src={userDetails.dp} className="w-[12vw] h-[12vw]  border-8 border-double border-spacing-3 border-zinc-500 mt-7  rounded-full" alt="" />

          <div className='flex gap-4'>
            <a href={userDetails?.git || '#'} target="_blank" rel="noopener noreferrer">
              <img className="w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/github-stroke-rounded.svg?alt=media&token=ad8bc54b-c9c7-46cf-a935-39166bab7b5b" alt="GitHub" />
            </a>
            <a href={userDetails?.link || '#'} target="_blank" rel="noopener noreferrer">
              <img className="w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/linkedin-02-stroke-rounded.svg?alt=media&token=41c80506-9e59-4212-8f9a-705cfbfd451b" alt="LinkedIn" />
            </a>
          </div>
          <div className='flex flex-col gap-2'>
            <h4 className='text-xl text-center font-semibold'>{userDetails.name} {userDetails.gender === 'male' ? '(M)' : '(F)'}</h4>
            <h4 className='text-sm text-center font-semibold'>{userDetails.branch}</h4>
            <ul className='flex flex-col gap-5'>
              <li className='flex'><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/location-04-stroke-rounded.svg?alt=media&token=0b209a08-ed9f-480a-9a35-2f347f958a34" alt="" />{userDetails.loc || 'Not specified'}</li>
              <li><a className='flex' href={userDetails.port || '#'}><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/job-link-stroke-rounded.svg?alt=media&token=540b520a-a97c-440a-b0f2-892b25af241b" alt="" />{userDetails.port || 'No Portfolio'}</a></li>
              <li className='flex'><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/mail-01-stroke-rounded.svg?alt=media&token=9d3e616a-809e-4365-991f-e46f58509a1a" alt="" />{userDetails.email}</li>
              <li className='flex'><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/whatsapp-stroke-rounded.svg?alt=media&token=a97f5718-255e-46d0-bdd2-70b22b3b66e9" alt="" />{userDetails.contact}</li>
            </ul>
          </div>
        </div>
        <div className='w-[68vw] bg-white shadow-lg rounded-lg'>
          <h4 className='text-xl font-semibold m-4'>Bio</h4>
          <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userDetails.bio != '' ? userDetails.bio : 'No Data'}</p>

          <div className='grid grid-cols-2 m-4'>
            <ul className='bg-[#ECECEC] py-2 px-4 m-2 rounded-lg'>
              <h4 className='text-xl font-semibold mb-4 '>Skills</h4>
              {userDetails.skills && userDetails.skills.length > 0 ? (
                    userDetails.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))
                  ) : (
                    <li>No skills available</li>
                  )}
            </ul>
            
            <ul className="bg-[#ECECEC] py-2 px-4 m-2 rounded-lg">
            <h4 className="text-xl font-semibold mb-4">Projects</h4>
            {userDetails.projects && Object.keys(userDetails.projects).length > 0 ? (
                    Object.entries(userDetails.projects).map(([name, url], index) => (
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
            {submissions.map((submission, index) => (
              <li key={index} className='flex flex-row justify-between m-2'>
                {submission.taskName} 
                <div className='text-green-400 border-green-400 border-2 rounded-lg px-2 '>Completed</div>
                <div className='text-blue-500'><a href={submission.fileUrl}>View</a></div>
              </li>
            ))}
            {
                submissions.length === 0 && (
                  <div className="text-orange-400 border-orange-400 w-fit m-auto border-2 rounded-lg px-2">
                  No Submissions made yet!
                </div>
                )
              }
          </ul>

          <h4 className='text-xl font-semibold m-2 ml-5'>Why do you want to join the team?</h4>
          <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userDetails.why != '' ? userDetails.why : 'No Data' }</p>
        </div>
      </div>
    </div>
  );
}

export default User;
