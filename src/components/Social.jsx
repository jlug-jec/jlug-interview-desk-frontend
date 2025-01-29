import Linkedin from '../assets/LinkedIn.png'
import Twitter from '../assets/Twitter.png'
import Instagram from '../assets/Instagram.png'

const Social = ()=>{
    return (
        <div className='flex flex-row w-full justify-center items-center gap-7 mt-10'>
            <a href='https://www.linkedin.com/company/jlug-jec/posts/?feedView=all'><img  src ={Linkedin} alt='lgo' className='cursor-pointer w-12'></img></a>
            <a href='https://www.instagram.com/jlug_jec/'><img  src ={Instagram} alt='lgo' className='cursor-pointer w-12'></img></a>
            <a href='https://twitter.com/jlug20'><img  src ={Twitter} alt='lgo' className='cursor-pointer w-12'></img></a>
        </div>
    )
}

export default Social;