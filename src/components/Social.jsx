import Linkedin from '../assets/LinkedIn.png'
import Twitter from '../assets/Twitter.png'
import Instagram from '../assets/Instagram.png'

const Social = ()=>{
    return (
        <div className='flex flex-row w-full justify-center items-center gap-7 mt-10'>
            <img  src ={Linkedin} alt='lgo' className='w-12'></img>
            <img  src ={Instagram} alt='lgo' className='w-12'></img>
            <img  src ={Twitter} alt='lgo' className='w-12'></img>
        </div>
    )
}

export default Social;