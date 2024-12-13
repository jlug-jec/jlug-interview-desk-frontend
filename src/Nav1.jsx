import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Home from './assets/Home.png';
import HomeB from './assets/HomeB.png';
import Chat from './assets/Chat.png';
import ChatB from './assets/ChatB.png';
import Todo from './assets/Todo.png';
import TodoB from './assets/TodoB.png';
import User from './assets/User.png';
import UserB from './assets/UserB.png';
import dp from './assets/21.png';
import log from './assets/Logout.png';
import set from './assets/Settings.png';
import logo from './assets/logo.png';

const Nav = () => {
    const initialTab = Number(localStorage.getItem('activeTab')) || 0;
    const [tab, setTab] = useState(initialTab);

    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    const navigate = useNavigate();

    const handleChange = (v) => {
        setTab(v);
        localStorage.setItem('activeTab', v);
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
        
            <div className="flex flex-row w-full shadow-md fixed top-0 left-0 bg-white">
                <div className="bg-primary flex items-center justify-center p-2 w-16 md:w-20">
                    <img src={logo} alt="logo" className="w-10 h-10 md:w-14 md:h-14" />
                </div>
                <div className="flex-1 flex flex-row justify-between items-center px-4 md:px-8">
                    <div className="text-lg md:text-2xl font-semibold">JLUG <span className="font-normal">Interview Desk</span></div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col text-right">
                            <div className="text-sm font-bold">{user.name}</div>
                            <div className="text-xs font-semibold">{user.domain}</div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12">
                            <Link to="/userd/user">
                                <img src={user.dp} alt="User" className="w-full h-full rounded-full cursor-pointer" onClick={() => handleChange(3)} />
                            </Link>
                        </div>
                        <div className="hidden md:block h-10 w-[1px] bg-gray-300">
                            <div className='h-[100%] w-[3px] rounded-md bg-[#D1CFCF]'></div>
                        </div>
         
                    <div className="flex items-center gap-2">
                            <img src={log} alt="Logout" className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={handleLogOut} />
                            <Link to="/userd/user">
                                <img src={set} alt="Settings" className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={() => handleChange(3)} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1F2937] bottom-0 fixed left-0 pt-5  md:top-[70px] md:h-screen w-full md:w-20  flex md:flex-col gap-8  py-4  justify-between md:justify-normal items-center p-4 h-16">
                <Link to="/userd">
                    <div className={`w-12 h-12 ${tab === 0 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl flex items-center justify-center`} onClick={() => handleChange(0)}>
                        <img src={tab === 0 ? HomeB : Home} alt="Home" className="w-8 h-8" />
                    </div>
                </Link>
                <Link to="/userd/tasks">
                    <div className={`w-12 h-12 ${tab === 1 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl flex items-center justify-center`} onClick={() => handleChange(1)}>
                        <img src={tab === 1 ? TodoB : Todo} alt="Todo" className="w-8 h-8" />
                    </div>
                </Link>
                <Link to="/userd/chat">
                    <div className={`w-12 h-12 ${tab === 2 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl flex items-center justify-center`} onClick={() => handleChange(2)}>
                        <img src={tab === 2 ? ChatB : Chat} alt="Chat" className="w-8 h-8" />
                    </div>
                </Link>
                <Link to="/userd/user">
                    <div className={`w-12 h-12 ${tab === 3 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl flex items-center justify-center`} onClick={() => handleChange(3)}>
                        <img src={tab === 3 ? UserB : User} alt="User" className="w-8 h-8" />
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Nav;
