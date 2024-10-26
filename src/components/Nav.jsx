import {React} from 'react'
import logo from '../assets/logo.png'

const Nav = ()=>{
    return (
        <div className='flex flex-row w-full shadow-md'>
            <div className='bg-primary flex items-center justify-center p-1'>
                <img  src ={logo} alt='lgo' className='w-15 h-14'></img>
            </div>
            <div className='w-full bg-white pl-6 flex items-center'>
                <div className='text-3xl font-normal'><span className='font-semibold'>JLUG </span> Interview Desk</div>
            </div>
        </div>
    )
}

export default Nav;