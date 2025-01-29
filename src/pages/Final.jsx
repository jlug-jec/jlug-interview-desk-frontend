import {React, useState} from 'react';
import { Link } from 'react-router-dom'
import Heading from '../components/Heading';
import Button from '../components/Button'

export default function Final({data}) {
    const [profile, setProfile] = useState(data)

  return (        
    <div className='flex flex-col gap-14 md:w-[70%] md:h-[80%] w-[90%] m-auto md:mt-8 bg-white md:p-10 md:py-10 md:px-10 py-10 px-5 shadow-xl mt-8'>
        <Heading label={'🎉 Congratulations! 🎉'} />
        <div className='w-full font-medium text-3xl text-center mt-[-2rem]'>You are successfully registered !</div>
        <div className='text-black text-lg  text-center p-4 font-medium'>
            Your unique password has been mailed to your registerd email id <span className='text-primary'>{profile.email}</span>.<br/> Do check your spam folder too . You can change your password in account settings.
        </div>

        <div className='flex flex-row gap-4 w-full items-center justify-center'>
            <Link to='/login' ><Button label={'Login'} variant={1}/></Link>    
        </div>
    </div>
  )
}
