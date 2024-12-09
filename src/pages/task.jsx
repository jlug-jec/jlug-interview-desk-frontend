import React from 'react';
import { useState, useEffect } from 'react';
import Page from '../assets/Page.png'; 
import Pencil from '../assets/Pencil.png';
import Application from '../assets/Application.png';
import {Link} from 'react-router-dom'
import Ripple from '../components/Ripple';



const TaskList = () => {
  const [pageload, setPageLoad] = useState(true);

    useEffect(() => {
        setPageLoad(true)
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
                icon: task.tcatg === 'Docx' ?  Page : Application , 
              }))
            );
          } catch (error) {
            console.error('Error fetching tasks:', error);
          } finally {
            setLoading(false);
            setPageLoad(false)
          }
        };
    
        fetchTasks();
      }, []);

      const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/delete-task/${id}`, {
            method: 'GET',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete task');
          }
      
          const result = await response.json();
          console.log(result.message); 

          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskid));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
      
    
        
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    let userid = localStorage.getItem('userid')
    userid =  userid.replace(/['"]+/g, '');
    console.log(tasks.adminid, userid)

    console.log(tasks)

    return (
      <>
      {pageload && <Ripple />}
      { !pageload &&  ( <div className="flex-1 pt-10 w-100">
        <div className= " w-full px-6 md:px-6 lg:px-10  pb-10 lg:pb-20 xl:pb-20">
          <header className="w-full h-16">
            <div className="flex flex-row justify-between mt-auto max-w-full pl-6 items-center">
              <h1 className="text-4xl tracking-tight font-semibold text-left">Tasks</h1>                    
                <Link to='/add'><div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] p-2 mr-4 cursor-pointer rounded-lg'>
                    Create a Task
                </div></Link> 
            </div>
          </header>
          <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-10 rounded-xl drop-shadow-lg">
          {tasks.length > 0 ? (
            <div role="list" className="flex flex-col gap-8">
                {tasks.map((task, index) => (
                    <div key={task.id} className="flex justify-between items-center gap-x-6 py-2 w-full min-h-[10px]">
                        <div className="flex w-full gap-x-4 items-center">
                            <img
                                src={task.icon}
                                alt='task-snap'
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="w-[25%] flex flex-auto items-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.tname}</p>
                            </div>
                            <div className="min-w-[15%] flex flex-auto items-center">
                                <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.tcatg}</p>
                            </div>                        
                            <div className="min-w-[15%] flex flex-auto items-center text-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">by {task.adminid === userid ? 'You' : task.by}</p>
                            </div>
                            <div className='flex flex-row w-[45%] items-center  text-center justify-end gap-12'>
                                { 
                                task.adminid === userid ?
                                    (<>
                                    <div className='  h-7 w-7 flex justify-center items-center '>
                                        <img src={Pencil} alt="edit" />
                                    </div>                          
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#FF3A3A] text-[#FF3A3A] px-4  rounded-lg cursor-pointer' onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </div> 
                                    </> 
                                    ) 
                                : (<></>)}         
                                <div className='font-semibold border-2 text-center h-[50%] border-[#01ED01] text-[#01ED01] px-4  rounded-lg '>
                                    {task.tstat}
                                </div>                          
                                <Link to={`/edittask/${task.id}`}>
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] px-4  rounded-lg '>
                                        View here
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            ) : (
                <div className="text-center justify-center font-semibold text-lg text-gray-500">
                    <p>No Tasks available</p>
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