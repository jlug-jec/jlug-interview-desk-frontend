import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../assets/Page.png';
import Pencil from '../../assets/Pencil.png';
import Application from '../../assets/Application.png';
import Ripple from '../../components/Ripple';
import { useUserContext } from '../../contexts/User';

const TaskList = () => {
  const {
    fetchDomainTasks,
    tasks,
    userSubmissions,
    pageload,
    userData,
    fetchUserData
  } = useUserContext();
 
  return (
    <>
      {pageload && <Ripple />}
      {!pageload && (
        <div className="flex-1  w-full">
          <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
            <header className="w-full h-16">
              <div className="mt-auto max-w-full md:pl-6">
                <h1 className="text-4xl tracking-tight font-semibold text-left p-2 sm:p-4 sm:pl-6 mt-4">Tasks</h1>
              </div>
            </header>
            <div className="bg-white m-auto w-[100%] min-h-[70vh] flex flex-col p-4 rounded-xl drop-shadow-lg relative z-[1]  md:mb-0 md-20">
              {pageload ? (
                <Ripple />
              ) : tasks.length > 0 ? (
                <div role="list" className="flex flex-col gap-6  md:px-5">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex flex-col md:flex-row justify-between items-center md:gap-x-10 md:px-6 py-2 w-full min-h-[10px]">
                      <div className="flex w-full gap-x-5 items-center">
                        <img
                          src={task.tcatg === 'Page' ? Page : Application}
                          alt={`Icon of ${task.tname}`}
                          className="h-12 w-12  flex-none rounded-full bg-gray-50"
                        />
                        <div className="w-[80%] md:w-[35%] flex flex-auto items-center">
                          <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.tname}</p>
                        </div>
                        <div className="min-w-[10%] md:min-w-[15%] flex flex-auto items-center">
                          <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.tcatg}</p>
                        </div>
                        <div className="min-w-[20%] md:min-w-[15%] flex-auto items-center text-center md:flex hidden">
                          <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.by}</p>
                        </div>
                        <div className="flex min-w-[15%] flex-col md:flex-row w-full md:w-[20%] items-center text-center justify-around gap-4 md:gap-12 mt-4 md:mt-0">
                          <div
                            className={`font-semibold border-2 text-center h-[50%] md:visible hidden ${
                              task.tsub === 'Submitted'
                                ? 'border-[#01ED01] text-[#01ED01]'
                                : 'border-[#FFA500] text-[#FFA500]'
                            } px-4 rounded-lg`}
                          >
                            {task.tsub}
                          </div>
                          <div
                            className={`font-semibold border-2 text-center h-[50%] md:visible hidden  ${
                              task.tstat === 'Active'
                                ? 'border-[#01ED01] text-[#01ED01]'
                                : 'border-[#FF3A3A] text-[#FF3A3A]'
                            } px-4 rounded-lg`}
                          >
                            {task.tstat}
                          </div>
                          <Link to={`/userd/view/${task.id}`}>
                            <div className="font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF]  hover:bg-[#23B0FF] hover:text-white px-4 rounded-lg">
                              View
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center justify-center font-semibold text-lg text-gray-500">
                  <p>No tasks available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
