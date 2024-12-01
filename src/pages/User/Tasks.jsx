import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../assets/Page.png';
import Pencil from '../../assets/Pencil.png';
import Application from '../../assets/Application.png';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/get-tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log(data)
        setTasks(
          data.map((task) => ({
            ...task,
            icon: task.tcatg === 'App/Web' ? Application : Page, 
          }))
        );
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex-1 pt-10 w-100">
      <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
        <header className="w-full h-16">
          <div className="mt-auto max-w-full pl-6 ">
            <h1 className="text-4xl tracking-tight font-semibold text-left">Tasks</h1>
          </div>
        </header>
        <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-10 rounded-xl drop-shadow-lg">
          {loading ? (
            <div className="text-center justify-center font-semibold text-lg text-gray-500">
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length > 0 ? (
            <div role="list" className="flex flex-col gap-6 pl-4 pr-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center gap-x-6 py-2 w-full min-h-[10px]">
                  <div className="flex w-full gap-x-4 items-center">
                    <img
                      src={task.icon}
                      alt={`Icon of ${task.tname}`}
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="w-[25%] flex flex-auto items-center">
                      <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.tname}</p>
                    </div>
                    <div className="min-w-[15%] flex flex-auto items-center">
                      <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.tcatg}</p>
                    </div>
                    <div className="min-w-[15%] flex flex-auto items-center text-center">
                      <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.by}</p>
                    </div>
                    <div className="flex flex-row w-[45%] items-center text-center justify-around gap-12">
                      <div
                        className={`font-semibold border-2 text-center h-[50%] ${
                          task.tsub === 'Submitted'
                            ? 'border-[#01ED01] text-[#01ED01]'
                            : 'border-[#FFA500] text-[#FFA500]'
                        } px-4 rounded-lg`}
                      >
                        {task.tsub}
                      </div>
                      <div
                        className={`font-semibold border-2 text-center h-[50%] ${
                          task.tstat === 'Active'
                            ? 'border-[#01ED01] text-[#01ED01]'
                            : 'border-[#FF3A3A] text-[#FF3A3A]'
                        } px-4 rounded-lg`}
                      >
                        {task.tstat}
                      </div>
                      <Link to={`/userd/view/${task.id}`}>
                        <div className="font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] px-4 rounded-lg">
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
  );
};

export default TaskList;
