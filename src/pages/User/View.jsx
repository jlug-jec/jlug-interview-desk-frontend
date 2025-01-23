import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import upload from '../../assets/Upload.png';
import { useUserContext } from '../../contexts/User';
import Ripple from '../../components/Ripple';

export default function View() {
  const {
    fetchDomainTasks,
    tasks,
    userSubmissions,
    pageload,
    usertask,
    fetchUsertask,
    fetchTask,
    task,
    load,
    actionload,
    handleModalSubmit
  } = useUserContext();
 
  let { id } = useParams(); 
  id = id.replace(/['"]+/g, '');

  useEffect(() => {
    fetchTask(id);
  }, [id, fetchTask]);
  
  useEffect(() => {
    if (task) {
      setData(task);
    }
  }, [task]);

  console.log(task)

  const [data, setData] = useState(task);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [submissionUrl, setSubmissionUrl] = useState(''); 
  
  if (load) {
    return <Ripple />;
  }

  if (!data) {
    return <div className="text-center">Task not found.</div>;
  }

  return (
    
    <div className="flex flex-col m-auto w-full p-4 md:mb-0 mb-20">
      <div className="flex flex-row w-full gap-5 pt-2 justify-between">
        <p className="text-left text-2xl sm:text-3xl font-medium p-2 sm:p-4 pl-4 sm:pl-6">
          Task / {task.tname}
        </p>
        <div className="flex flex-row gap-4 sm:gap-5 p-2 justify-center sm:pr-6">
          <div
            className="cursor-pointer flex md:flex-row gap-2 justify-between font-semibold items-center bg-bgprimary text-primary border-[3px] border-primary px-2 py-1 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            
            <img src={upload} className="md:w-6 md:h-6 md:visible w-8 h-8 " />
            <div className='md:text-lg  md:visible'>Submit Task</div>
          </div>
        </div>
      </div>

      <div className="bg-white m-auto w-full sm:w-[95%] h-full flex flex-col md:p-4 mt-2 rounded-xl ">
        <div className="flex flex-col sm:flex-row w-full gap-5 p-5 pb-0">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full md:w-[10%] font-medium">
            Task Name
          </p>
          <div className="bg-form-input w-full md:w-[90%] p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task.tname}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-5 p-5 pb-0 ">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full md:w-[10%] font-medium">
            Task Description
          </p>
          <div className="bg-form-input w-full md:w-[90%] p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task.tdesc}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-9 p-5 pb-0">
          <div className="flex flex-col sm:flex-row w-full sm:w-[50%] gap-7">
            <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
              Task Category
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
              {task.tcatg}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-[50%] gap-7">
            <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
              Task Status
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
              {task.tstat}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Submission Category
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task.tsub}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Deadline
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task.tdead}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Sample Image
          </p>
          <div className="flex items-center bg-[#f73558] h-10 w-16   font-semibold text-white text-center p-3 border-none rounded-xl">
            {task.tfileUrl ? ( 
              <a href={task.tfileUrl} target='blank'>View</a>
            ) : (
              'No file uploaded'
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg sm:w-[50%] w-[80%]">
            <h2 className="text-lg font-bold mb-4">Submit Task</h2>
            <p className='font-medium text-wrap text-sm text-amber-500 pb-5'> 
              ! Please make sure that your submission link is valid and accessible. In case
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
                onClick={!actionload ? () => handleModalSubmit(task, id, submissionUrl) : null}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
