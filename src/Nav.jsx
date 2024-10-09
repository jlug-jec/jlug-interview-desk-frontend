import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import Home from './assets/Home.png'
import HomeB from './assets/HomeB.png'
import Lead from './assets/Lead.png'
import LeadB from './assets/LeadB.png'
import Book from './assets/Book.png'
import BookB from './assets/BookB.png'
import Pen from './assets/Pen.png'
import PenB from './assets/PenB.png'
import Rev from './assets/Rev.png'
import RevB from './assets/RevB.png'
import dp from './assets/21.png'
import log from './assets/Logout.png'
import set from './assets/Settings.png'


import logo from './assets/logo.png'

const Nav = ()=>{
    const [tab, setTab] = useState(0);

    const handleChange = (v)=>{
        setTab(v);
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
                            <div className='text-sm font-bold'>Admin Name</div>
                            <div className='text-xs font-semibold'>Team Name</div>
                        </div>
                        <div className='w-[20%]'>
                        <Link to='/user'>
                            <img src={dp} className='w-11 h-11 rounded-full'/>
                        </Link>
                        </div>                        
                        <div className='h-[80%] w-[3px] rounded-md bg-[#D1CFCF]'></div>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={log} className='w-8 h-8' alt='logout'/>
                            <img src={set} className='w-8 h-8' alt='logout'></img>
                        </div>
                    </div>
                </div>

        </div>
        <div className='w-[70px] bg-[#1F2937] fixed h-screen left-0 p-2'>
            <div className='flex flex-col gap-8 items-center w-full h-full mt-5'>                
                <Link to='/'><div className={`w-12 h-12 ${tab === 0 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(0)}>
                    <img src={tab === 0 ? HomeB : Home} alt='home'></img>
                </div></Link>
                <Link to='/leader' className='w-12 h-12'><div className={`w-12 h-12 ${tab === 1 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(1)}>
                    <img src={tab === 1 ? LeadB : Lead} alt='lead'></img>
                </div></Link>
                <Link to='/review'><div className={`w-12 h-12 ${tab === 2 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(2)}>
                    <img src={tab === 2 ? RevB : Rev} alt='rev'></img>
                </div></Link>
                <Link to='/book'><div className={`w-12 h-12 ${tab === 3 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(3)}>
                    <img src={tab === 3 ? BookB : Book} alt='book'></img>
                </div></Link>
                <Link to='/tasks'><div className={`w-12 h-12 ${tab === 4 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(4)}>
                    <img src={tab === 4 ? PenB : Pen} alt='pen'></img>
                </div></Link>
            </div>
        </div>
        </>
    )
}

export default Nav;