import React from 'react';
import Page from '../assets/Page.png'; 
import Pencil from '../assets/Pencil.png';
import Application from '../assets/Application.png';
import Nav from '../Nav';

// Sample tasks
const tasks = [
    { name: 'ToDo Application', type: 'App/Web', by: 'Admin2', status: 'Active', icon: Application },
    { name: 'Portfolio Application', type: 'App/Web', by: 'Admin3', status: 'Active', icon: Application },
    { name: 'Biography', type: 'Document', by: 'You' ,  status: 'Active', icon: Page},
];

const TaskList = () => {
    return (
        <div className='m-10'>
            <Nav />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Tasks</h2>
                <button className="add-task-btn">+ Add Task</button>
            </div>

            {/* Task table */}
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
            </table>
        </div>
    );
};

export default TaskList;