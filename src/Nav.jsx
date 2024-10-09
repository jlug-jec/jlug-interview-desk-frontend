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
            <div className='w-full bg-white pl-6 flex items-center'>
                <div className='text-3xl font-normal'><span className='font-semibold'>JLUG </span> Interview Desk</div>
            </div>
        </div>
        <div className='w-[70px] bg-[#1F2937] fixed h-screen left-0 p-2'>
            <div className='flex flex-col gap-8 items-center w-full h-full mt-9'>                
                <Link to='/'><div className={`w-12 h-12 ${tab === 0 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(0)}>
                    <img src={tab === 0 ? HomeB : Home} alt='home'></img>
                </div></Link>
                <Link to='/review' className='w-12 h-12'><div className={`w-12 h-12 ${tab === 1 ? 'bg-white' : 'bg-[#1F2937]'} p-2 rounded-xl`} onClick={() => handleChange(1)}>
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