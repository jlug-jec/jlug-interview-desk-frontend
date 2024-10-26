import React from 'react';
import Page from '../assets/Page.png'; 
import Pencil from '../assets/Pencil.png';
import Application from '../assets/Application.png';
import {Link} from 'react-router-dom'

// Sample tasks
const tasks = [
    { name: 'ToDo Application', type: 'App/Web', by: 'Admin2', status: 'Active', icon: Application },
    { name: 'Portfolio Application', type: 'App/Web', by: 'Admin3', status: 'Active', icon: Application },
    { name: 'Biography', type: 'Document', by: 'You' ,  status: 'Active', icon: Page},
];

const TaskList = () => {
    return (
        <div className="flex-1 pt-10 w-100">
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
                {tasks.map((task) => (
                    <div key={task.name} className="flex justify-between items-center gap-x-6 py-2 w-full min-h-[10px]">
                        <div className="flex w-full gap-x-4 items-center">
                            <img
                                src={task.icon}
                                alt={`Avatar of ${task.name}`}
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="w-[25%] flex flex-auto items-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.name}</p>
                            </div>
                            <div className="min-w-[15%] flex flex-auto items-center">
                                <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.type}</p>
                            </div>                        
                            <div className="min-w-[15%] flex flex-auto items-center text-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.by}</p>
                            </div>
                            <div className='flex flex-row w-[45%] items-center  text-center justify-end gap-12'>
                                { 
                                task.by === 'You' ?
                                    (<>
                                    <div className='  h-7 w-7 flex justify-center items-center '>
                                        <img src={Pencil} alt="edit" />
                                    </div>                          
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#FF3A3A] text-[#FF3A3A] px-4  rounded-lg '>
                                        Delete
                                    </div> 
                                    </> 
                                    ) 
                                : (<></>)}         
                                <div className='font-semibold border-2 text-center h-[50%] border-[#01ED01] text-[#01ED01] px-4  rounded-lg '>
                                    {task.status}
                                </div>                          
                                <Link to='/add'>
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] px-4  rounded-lg '>
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
                    <p>No bookmarks available</p>
                </div>
            )}
          </div>
        </div>
{/* 
            <table className="min-w-full bg-white rounded-lg shadow">
              
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-4">
                                <img src={task.icon} alt="icon" className="inline-block w-6 h-6 mr-2" />
                                {task.name}
                            </td>
                            <td className="p-4 font-bold">{task.type}</td>
                            <td className="p-4">{task.by}</td>
                            <td className="p-4">
                                <span className="active-status-btn">{task.status}</span>
                            </td>
                            <td className="p-4">
                            {task.by === 'You' && (
                                    <button className="delete-btn">Delete</button> 
                                    )}
                                <button className="view-btn">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default TaskList;