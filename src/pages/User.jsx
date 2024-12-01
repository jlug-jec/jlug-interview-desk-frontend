import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User() {
    const user_image="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png"
    const { id } = useParams(); 

    const [userDetails, setUserDetails] = useState(null);
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

    console.log(submissions)
    console.log(userDetails)

  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className='bg-[#ECECEC] h-screen w-full p-10 mb-11'>

      <div className='flex flex-row w-full justify-between items-center'>
        <div className='text-4xl font-semibold '>Applicant Profile</div>
        <div className='flex gap-4 '>
          <div><button className='font-semibold shadow-md border-2 border-green-500 text-green-500 px-4 py-1 rounded-lg hover:bg-green-500  hover:text-white' href="">Upvote</button></div>
          <div><button className='font-semibold shadow-md border-2 border-red-500 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500  hover:text-white' href="">Downvote</button></div>
          <div><button className='font-semibold shadow-md border-2 border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500  hover:text-white' href="">Bookmark</button></div>
          <div><button className='font-semibold shadow-md border-2 border-black text-black px-4 py-1 rounded-lg hover:bg-black  hover:text-white' href="">Blacklist</button></div>
        </div>
      </div>


      <div className='flex flex-row w-full gap-2 mt-10'>
          <div className=' w-[25vw] p-7 bg-white flex flex-col rounded-md shadow-lg  gap-8 items-center '>
            <img src={user_image} className="w-[12vw] mt-7 shadow-lg rounded-full" alt="" />
             <div className='flex  gap-4 '>
             <a href={userDetails?.git ? userDetails.git : '#'} target="_blank" rel="noopener noreferrer">
                  <img className="w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/github-stroke-rounded.svg?alt=media&token=ad8bc54b-c9c7-46cf-a935-39166bab7b5b" alt="GitHub" />
                </a>
                <a href={userDetails?.link ? userDetails.link : '#'} target="_blank" rel="noopener noreferrer">
                  <img className="w-10" src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/linkedin-02-stroke-rounded.svg?alt=media&token=41c80506-9e59-4212-8f9a-705cfbfd451b" alt="LinkedIn" />
                </a>
                </div>
                <div className='flex flex-col gap-2'>
                <h4 className=' text-xl text-center font-semibold'>{userDetails.name} {userDetails.gender === 'male' ? '(M)' : '(F)'}</h4>
                <h4 className=' text-sm text-center font-semibold'>{userDetails.branch}</h4>
                <ul className=' flex flex-col gap-5'>
                    <li className='flex'><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/location-04-stroke-rounded.svg?alt=media&token=0b209a08-ed9f-480a-9a35-2f347f958a34" alt="" />{userDetails.loc ? userDetails.loc : 'Not specified'}</li>
                    <li><a className='flex' href={userDetails.port}><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/job-link-stroke-rounded.svg?alt=media&token=540b520a-a97c-440a-b0f2-892b25af241b" alt="" />{userDetails.port ? userDetails.port : 'No Portfolio'}</a></li>
                    <li className='flex'><img className='mr-2 flex' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/mail-01-stroke-rounded.svg?alt=media&token=9d3e616a-809e-4365-991f-e46f58509a1a" alt="" />{userDetails.email}</li>
                    <li className='flex'><img className='mr-2 flex' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/whatsapp-stroke-rounded.svg?alt=media&token=a97f5718-255e-46d0-bdd2-70b22b3b66e9" alt="" />{userDetails.contact}</li>
                </ul>
            </div> 
            
            
          </div>
          <div className=' w-[68vw] bg-white shadow-lg rounded-lg'>
            <h4 className='text-xl font-semibold m-4'>Bio</h4>
            <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userDetails.bio}</p>
            {/* code for the fetching of data and mapping the values of skills in the li's
            data = await response.json()
            const skills = data.skills
                <ul>
                    {skills.map((skill,index)=>(
                    <li key={index}>{skill}</li>
                    )}
                </ul>
            const projects = data.projects
                <ul>
                    {projects.map(project,index)=>(
                    <li key={index}>{project}</li>
                    )}
                </ul> */}
            <div className='grid grid-cols-2 m-4 '>
            <ul className='bg-[#ECECEC] py-2 px-4 m-2 rounded-lg'>
                <h4 className='text-xl font-semibold mb-4 '>Skills</h4>
                <li>Python</li>
                <li>Javascript</li>
                <li>C++</li>
                <li>C</li>
            </ul>
            <ul className='bg-[#ECECEC] py-2 px-4 m-2 rounded-lg'>
                <h4 className='text-xl font-semibold mb-4'>Projects</h4>
                <li>School Admission System</li>
                <li>Todo List</li>
            </ul>
            </div>
            <h4 className='text-xl font-semibold m-4'>Tasks</h4>
            <ul className='bg-[#ECECEC] py-2 px-4 m-5 rounded-lg'>
              {submissions.map((submission, index) => (
                <li key={index} className='flex flex-row justify-between m-2'>
                  {submission.taskName} 
                  <div className='text-green-400 border-green-400 border-2 rounded-lg px-2 '>Completed</div>
                  <div className='text-blue-500'><a  href={submission.fileUrl}>View</a></div>
                </li>
              ))}
            </ul>
            <h4 className='text-xl font-semibold m-2 ml-5'>Why do you want to join the  team</h4>
            <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{userDetails.why}</p>
          </div>
      </div>

      
    
    </div>
  )
}

export default User
