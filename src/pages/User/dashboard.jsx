import approve from '../../assets/Approval.png'
import list from '../../assets/List.png'
import book from '../../assets/Bookmark.png'
import time from '../../assets/Time.png'
import {Link} from 'react-router-dom'
import Page from '../../assets/Page.png'; 
import Application from '../../assets/Application.png';
import Eye from '../../assets/Eye.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const navigate = useNavigate();
  const image=[list,approve,time,book]
  const [user, setUser] = useState({});
  console.log(user.name)
  const tasks = [
    { name: 'ToDo Application', type: 'App/Web', by: 'Admin2', status: 'Active', icon: Application },
    { name: 'Portfolio Application', type: 'App/Web', by: 'Admin3', status: 'Active', icon: Application },
    { name: 'Biography', type: 'Document', by: 'You' ,  status: 'Active', icon: Page},
];
  const pop=[{'count':100, 'text':'Total Tasks'},{'count':`${user.submissions}`.length , 'text':'Tasks Submitted'},{'count':100, 'text':'Pending Tasks'},{'count':100, 'text':'ISpe kya likhe ?'}]

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <>
      <div className=' bg-zinc-100 pb-10 w-100 h-full'>
        <h1 className='font-semibold p-10 text-4xl'>Dashboard</h1>
        <div className='flex justify-between ml-14 mb-14 mr-14 pl-8 pr-8'>

         {pop.map((pop,i)=>(<div key={i} className='w-64 h-32 flex justify-center items-center rounded-lg  bg-white shadow-md shadow-zinc-400'>
          <div className='flex items-center'> <img className='w-16 h-16' src={image[i]} alt="" /></div>
          <div className='flex-col w-32 text-center items-center justify-center'>
            <h1 className='text-2xl'>{pop.count}</h1>
            <h3 className='text-zinc-500'>{pop.text}</h3>
          </div></div> ))}
        </div>
        
        <div className='w-full h-full flex gap-3'>
          <div className='w-3/5 h-[65vh] ml-12  p-10 flex flex-col justify-between  bg-white shadow-md shadow-zinc-400  rounded-lg'>
            <div>
            <h1 className='w-full border-b-2 pb-2 border-black font-semibold text-xl'>All Tasks</h1>
            {tasks.map((task) => (
                    <div key={task.name} className="flex justify-between items-center mt-3 gap-x-6 py-2 w-full min-h-[10px]">
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
                            <div className='flex flex-row w-[45%] items-center  text-center justify-end gap-12'>       
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
                <Link to='/userd/tasks'>
                <div className='flex flex-row gap-5 font-semibold border-2 text-center w-fit items-center ml-auto mr-auto  justify-end border-primary text-primary px-4  rounded-lg '>
                    <img src={Eye} className='w-7 h-7' alt='i'></img>
                    <div>View All Tasks</div>
                </div>
                </Link>
          </div>
         
          <div className='w-2/5 h-auto mr-10 p-10  bg-white shadow-md shadow-zinc-400  rounded-lg'>

            <h1 className=' border-b-2 pb-2 border-black font-semibold text-xl'>Application Status</h1>
            
            <div className='flex flex-row gap-5 font-semibold border-2 text-center w-[90%] p-1 mt-4 m-auto items-center justify-center border-[#FF8C23] text-[#FF8C23] rounded-lg '>
                    <div></div>
            </div>
          </div>
              
          
        </div>
        
      </div>
    </>
  )
}

export default Dashboard
