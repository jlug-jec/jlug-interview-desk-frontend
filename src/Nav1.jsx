import {React, useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Home from './assets/Home.png'
import HomeB from './assets/HomeB.png'
import Chat from './assets/Chat.png'
import ChatB from './assets/ChatB.png'
import Todo from './assets/Todo.png'
import TodoB from './assets/TodoB.png'
import User from './assets/User.png'
import UserB from './assets/UserB.png'
import dp from './assets/21.png'
import log from './assets/Logout.png'
import set from './assets/Settings.png'


import logo from './assets/logo.png'

const Nav = ()=>{
    const initialTab = Number(localStorage.getItem('activeTab')) || 0
    const [tab, setTab] = useState(initialTab);

    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    const navigate = useNavigate()


    const handleChange = (v)=>{
        setTab(v);
        localStorage.setItem('activeTab', v);
    }

    const handleLogOut = ()=>{
        localStorage.clear();
        navigate('/login')
    }


    return (
        <>
        <div className='flex flex-row w-screen shadow-md fixed top-0 left-0'>
                <div className='bg-primary flex items-center justify-center p-1'>
                    <img  src ={logo} alt='lgo' className='w-15 h-14'></img>
                </div>
                <div className='w-full bg-white pl-6 flex flex-row justify-between items-center'>
                    <div className='text-3xl font-normal'><span className='font-semibold'>JLUG </span> Interview Desk</div>
                    <div className='w-[20%] h-[90%] flex flex-row items-center gap-2 '>
                        <div className='w-fit flex flex-col justify-center text-right p-2'>
                            <div className='text-sm font-bold'>{user.name}</div>
                            <div className='text-xs font-semibold'>{user.domain}</div>
                        </div>
                        <div className='w-[20%]'>
                        <Link to='/userd/user'>
                            <img src={user.dp} className='w-11 h-11 rounded-full' onClick={()=>handleChange(3)}/>
                        </Link>
                        </div>                        
                        <div className='h-[80%] w-[3px] rounded-md bg-[#D1CFCF]'></div>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={log} className='w-8 h-8 cursor-pointer' onClick={handleLogOut} alt='logout'/>
                            <Link to='/userd/user' ><img src={set} className=' w-8 h-8 cursor-pointer'  alt='setttings' onClick={()=>handleChange(3)}></img></Link>
                        </div>
                    </div>
                </div>

        </div>
        <div className='w-[70px] bg-[#1F2937] fixed h-screen left-0 p-2'>
            <div className='flex flex-col gap-8 items-center w-full h-full mt-5'>                
                <Link to='/userd'><div className={`w-12 h-12 ${tab === 0 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(0)}>
                    <img src={tab === 0 ? HomeB : Home} alt='home'></img>
                </div></Link>
                <Link to='/userd/tasks' className='w-12 h-12'><div className={`w-12 h-12 ${tab === 1 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(1)}>
                    <img src={tab === 1 ? TodoB : Todo} alt='Todo'></img>
                </div></Link>
                <Link to='/userd/chat'><div className={`w-12 h-12 ${tab === 2 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(2)}>
                    <img src={tab === 2 ? ChatB : Chat} alt='Chat'></img>
                </div></Link>
                <Link to='/userd/user'><div className={`w-12 h-12 ${tab === 3 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(3)}>
                    <img src={tab === 3 ? UserB : User} alt='User'></img>
                </div></Link>
            </div>
        </div>
        </>
    )
}

export default Nav;