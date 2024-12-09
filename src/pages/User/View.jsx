import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import upload from '../../assets/Upload.png';

export default function View() {
  const { id } = useParams(); 
  console.log(id)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [submissionUrl, setSubmissionUrl] = useState(''); 
  const [actionload, setActionLoad] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/tasks/${id}`); 
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleModalSubmit = async () => {
    setActionLoad(true)
    let userId = localStorage.getItem('userid');
    userId = userId.replace(/['"]+/g, '');
    const today = new Date();
    const deadline = new Date(data.tdead); 

    if (!userId || !submissionUrl) {
      alert('Missing user ID or submission URL');
      return;
    }

    if (today > deadline) {
      alert('The task deadline has passed. Submissions are no longer accepted.');
      return;
    }
  
    if (data.tstat === 'suspended') {
      alert('The task is no longer accepting submissions.');
      return;
    }

    console.log(userId, submissionUrl)
  
    try {
      const submitTaskResponse = await fetch(
        'http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/submit-task',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, taskId: id, submissionUrl }),
        }
      );
  
      if (!submitTaskResponse.ok) {
        const errorData = await submitTaskResponse.json();
        throw new Error(errorData.error || 'Task submission failed');
      }
  
      const { submissionId } = await submitTaskResponse.json();
      console.log(submissionId)
  
      const updateUserResponse = await fetch(
        `http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/update/${userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissionId }),
        }
      );

      console.log(updateUserResponse)
  
      if (!updateUserResponse.ok) {
        const errorData = await updateUserResponse.json();
        throw new Error(errorData.error || 'Failed to update user submissions');
      }
  
      alert('Task submitted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error handling submission:', error);
      alert('Submission failed. Please try again.');
    }
    finally{
      setActionLoad(false)
    }
  };
  
  
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center">Task not found.</div>;
  }

  return (
    <div className="flex flex-col m-auto w-100 h-screen">
      <div className="flex flex-row w-[100%] gap-9 pt-1 justify-between">
        <p className="text-left text-3xl font-medium  p-[1%] pl-[3%]">
          Task / {data.tname}
        </p>
        <div className="flex flex-row gap-5 p-3 justify-center pr-9">
          <div
            className="cursor-pointer flex flex-column gap-2 justify-between font-semibold items-center bg-bgprimary text-primary border-[3px]  border-primary py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={upload} className="w-6 h-6" />
            <div>Submit Task</div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-[50%]">
            <h2 className="text-lg font-bold mb-4">Submit Task</h2>
            <p className='font-medium text-wrap text-sm text-amber-500 pb-5'> ! Please make sure that your submission link is valid and accessible. In case
              your submission is inaccessible or the link is invalid your application will be rejected !
            </p>
            <input
              type="text"
              placeholder="Enter submission URL"
              className="w-full border rounded p-2 mb-4"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className={`bg-gray-200 border-2 border-zinc-500 px-4 py-2 rounded cursor-pointer`}
                onClick={!actionload ? () => setIsModalOpen(false) : null}
              >
                Cancel
              </button>
              <button
                className={`${actionload && 'animate-pulse cursor-not-allowed'} bg-blue-500 text-white px-4 py-2 rounded cursor-pointer`}
                onClick={!actionload ? handleModalSubmit : null}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

        <div className="bg-white m-auto w-[95%] h-[85%] flex flex-col p-4 rounded-xl drop-shadow-lg">
          <div className="flex flex-row w-full gap-5 p-5">
            <p className="text-center self-center text-[18px] w-[10%] font-medium">
              Task Name
            </p>
            <div className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[18px]">
              {data.tname}
            </div>
          </div>

          <div className="flex flex-row w-full gap-5 p-5">
            <p className="text-center self-center text-[18px] w-[10%] font-medium">
              Task Description
            </p>
            <div className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[18px]">
              {data.tdesc}
            </div>
          </div>

          <div className="flex flex-row w-[100%] gap-9 p-5">
            <div className="flex flex-row w-[50%] gap-7">
              <p className="text-center self-center text-[18px] w-[25%] font-medium">
                Task Category
              </p>
              <div className="bg-form-input w-full p-4 border-none rounded-xl">
                {data.tcatg}
              </div>
            </div>

            <div className="flex flex-row w-[50%] gap-7">
              <p className="text-center self-center text-[18px] w-[25%] font-medium">
                Task Status
              </p>
              <div className="bg-form-input w-full p-4 border-none rounded-xl">
                {data.tstat}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-7 p-5 w-[50%]">
            <p className="text-center self-center text-[18px] w-[25%] font-medium">
              Submission Category
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl">
              {data.tsub}
            </div>
          </div>

          <div className="flex flex-row gap-8 p-5 w-[50%]">
            <p className="text-center self-center text-[18px] w-[25%] font-medium">
              Deadline
            </p>
            <div className="bg-form-input w-[100%] p-4 border-none rounded-xl">
              {data.tdead}
            </div>
          </div>

          <div className="flex flex-row gap-8 p-5 w-[50%]">
            <p className="text-center self-center text-[18px] w-[20%] font-medium">
              Sample Image
            </p>
            <div className="flex items-center bg-[#f73558] h-10 pl-10 pr-10 font-semibold text-white  text-center border-none rounded-xl">
              {data.tfileUrl ? ( <a href={data.tfileUrl} target='blank'  >View</a>
                ) : (
                  'No file uploaded'
                )}
            </div>
          </div>
      </div>
    </div>
  );
}
