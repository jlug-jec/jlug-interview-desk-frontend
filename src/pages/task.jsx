import React from 'react';
import { useState, useEffect } from 'react';
import Page from '../assets/Page.png'; 
import Pencil from '../assets/Pencil.png';
import Application from '../assets/Application.png';
import {Link} from 'react-router-dom'
import Ripple from '../components/Ripple';
import remove from '../assets/Remove.png';
import View from '../assets/Eye.png'
import { Toaster, toast } from 'react-hot-toast';


const TaskList = () => {
  const [pageload, setPageLoad] = useState(true);

    useEffect(() => {
        setPageLoad(true)
        const fetchTasks = async () => {
          setPageLoad(true)
          let user = sessionStorage.getItem('user')
          user = JSON.parse(user);
    
          try {
    
            let response= await fetch('https://firebase-api-hrly.onrender.com/get-tasks-by-domain', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({domain : user.domain}),
            });
    
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
            setPageLoad(false)
          }
        };
    
        fetchTasks();
      }, []);
    
      const handleDelete = async (id) => {
        try {
          const response = await fetch(`https://firebase-api-hrly.onrender.com/delete-task/${id}`, {
            method: 'GET',
          });
      
          if (!response.ok) {
            toast.error('Failed to delete task')
            throw new Error('Failed to delete task');
          }
      
          const result = await response.json();
          if(response.ok){
            toast.success(result.message)
          }

          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
      
    
        
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    let userid = sessionStorage.getItem('userid')
    userid =  userid.replace(/['"]+/g, '');

    return (
      <>
      <Toaster />
      {pageload && <Ripple />}
      { !pageload &&  ( <div className="flex-1  w-100">
        <div className= " w-full  md:px-6  px-5 md:pb-10 sm:p-4 p-4 sm:pl-6">
          <header className="w-full h-16">
            <div className="flex flex-row justify-between mt-auto max-w-full md:pl-6 pl-4 items-center">
              <h1 className="md:text-4xl text-3xl tracking-tight font-semibold text-left mt-4">Tasks</h1>                    
                <Link to='/add'><div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF]  hover:bg-[#23B0FF] hover:text-white p-2 mr-4 cursor-pointer rounded-lg'>
                    Create a Task
                </div></Link> 
            </div>
          </header>
          <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col md:p-10 p-2 rounded-xl drop-shadow-lg relative md:mb-0 mb-20 z-[1] ">
          {tasks.length > 0 ? (
            <div role="list" className="flex flex-col gap-8">
                {tasks.map((task, index) => (
                    <div key={task.id} className="flex justify-between items-center gap-x-3 md:gap-x-6 py-2 w-full min-h-[10px]">
                        <div className="flex w-full gap-x-2 items-center">
                            <img
                                src={task.icon}
                                alt='task-snap'
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="w-[30%] text-sm md:text-lg md:w-[25%] flex flex-auto items-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.tname}</p>
                            </div>
                            <div className="w-[10%] text-sm md:text-lg  md:min-w-[15%] flex flex-auto items-center">
                                <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.tcatg}</p>
                            </div>                        
                            <div className="w-[10%] md:min-w-[15%] flex flex-auto items-center text-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">by {task.adminid === userid ? 'You' : task.by}</p>
                            </div>
                            <div className='w-[20%] flex flex-row md:w-[45%] items-center  text-center gap-4 md:gap-12'>
                                { 
                                task.adminid === userid ?
                                    (<>
                                    <div className='  h-7 w-7 md:flex justify-center items-center hidden'>
                                        <img src={Pencil} alt="edit" />
                                    </div>                          
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#FF3A3A] text-[#FF3A3A] hover:bg-[#FF3A3A] hover:text-[white] px-4  rounded-lg cursor-pointer md:flex hidden' onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </div> 
                                    <img src={remove} className='w-7 h-7 md:hidden visible flex bg-[#FF3A3A] rounded-lg p-1'></img>
                                    </> 
                                    ) 
                                : (<></>)}         
                                <div className='font-semibold border-2 text-center h-[50%] border-[#01ED01] text-[#01ED01] px-4  rounded-lg hidden md:flex'>
                                    {task.tstat}
                                </div>                          
                                <Link to={`/edittask/${task.id}`}>
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] hover:bg-[#23B0FF] hover:text-[white] px-4  rounded-lg hidden md:block'>
                                        View
                                    </div>                                    
                                    <img src={View} className='w-16 h-8 md:hidden visible flex  border-2 border-primary rounded-md '></img>
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