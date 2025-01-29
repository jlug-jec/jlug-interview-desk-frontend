import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/User';
import Ripple from '../components/Ripple';
import { Toaster, toast } from 'react-hot-toast';

export default function ViewOnly() {
  const {
    fetchTask,
    task,
    load
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

  //console.log(task)

  const [data, setData] = useState(task);
  
  if (load) {
    return <Ripple />;
  }

  if (!data) {
    return <div className="text-center">Task not found.</div>;
  }

  return (
    <div className="flex flex-col m-auto w-full p-4 z-[1] md:mb-0 mb-20">
      <Toaster />
      <div className="flex flex-row w-full gap-5 pt-2 justify-between">
        <p className="text-left text-2xl sm:text-3xl font-medium p-2 sm:p-4 pl-4 sm:pl-6">
          Task / {task?.tname}
        </p>
      </div>

      <div className="bg-white m-auto w-full sm:w-[95%] h-full flex flex-col md:p-4 mt-2 rounded-xl ">
        <div className="flex flex-col sm:flex-row w-full gap-5 p-5 pb-0">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full md:w-[10%] font-medium">
            Task Name
          </p>
          <div className="bg-form-input w-full md:w-[90%] p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task?.tname}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-5 p-5 pb-0 ">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full md:w-[10%] font-medium">
            Task Description
          </p>
          <div className="bg-form-input w-full md:w-[90%] p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task?.tdesc}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-9 p-5 pb-0">
          <div className="flex flex-col sm:flex-row w-full sm:w-[50%] gap-7">
            <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
              Task Category
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
              {task?.tcatg}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-[50%] gap-7">
            <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
              Task Status
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
              {task?.tstat}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Submission Category
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task?.tsub === 'GIT' ? 'Github Repositry link' : 'Google Drive link'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Deadline
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl text-sm sm:text-[18px]">
            {task?.tdead}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 p-5 w-full sm:w-[50%]">
          <p className="text-left sm:text-left self-center text-sm sm:text-[18px] w-full sm:w-[30%] font-medium">
            Sample Image
          </p>
          <div className="flex items-center bg-[#f73558] h-10 w-16   font-semibold text-white text-center p-3 border-none rounded-xl">
            {task?.tfileUrl ? ( 
              <a href={task.tfileUrl} target='_blank'>View</a>
            ) : (
              'No file uploaded'
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
