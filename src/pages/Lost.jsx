import {React} from 'react';
import { Link } from 'react-router-dom'
import Heading from '../components/Heading';
import Button from '../components/Button'
import Dog from '../assets/dog.png'

export default function Lost({data}) {

  return (        
    <div className='flex flex-col gap-14 md:w-[70%] md:h-[80%] w-[90%] m-auto md:mt-8  md:p-10 md:py-10 md:px-10 py-10 px-5 mt-8'>

        <img src={Dog} className='md:w-[30%] m-auto w-[70%]' alt='doggy'></img>        
        <Heading label={'Oops! You seems Lost! 🥲'} />
        <div className='flex flex-row gap-4 w-full items-center justify-center'>
            <Link to='/login' ><Button label={'Login'} variant={1}/></Link>    
        </div>
    </div>
  )
}
