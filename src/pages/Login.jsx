import {React, useState, useEffect} from 'react';
import Heading from '../components/Heading';
import logo from '../assets/logoblk.png'
import Nav from '../components/Nav';
import Input from '../components/Input'
import Loading from '../pages/Loading';
import {Link, useNavigate} from 'react-router-dom'
import Button from '../components/Button'


const Login = ()=>{     
    const navigate = useNavigate();
    
    const [profile, setProfile] = useState({
            email:'',
            pass:''
    })

    const [load, setLoad] = useState(1);

    const handleCompletion =()=>{
        //function to initate login
        if(profile.email === 'admin' && profile.pass === '123'){
            navigate('/admin')
        }
        if(profile.email === 'user' && profile.pass === '123'){
            navigate('/userd')
        }
    }

    const handleNext = ()=>{

        if(profile.name !=='' && profile.age !== '' && profile.branch !== '' && profile.sem !== '' && profile.gender !== '' && profile.contact !== '' && profile.email !== ''){
            handleCompletion();
        }

    }

    useEffect(() => {
        const delay = () => {
            setTimeout(() => {
                setLoad(0); 
            }, 3000);
        };
    
        delay(); 
    }, []); 
    


    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value, 
        });
    };


    return (
        <>
        {    
            load === 1 ? <Loading /> :  
           (
            <>
            <Nav />
            <div className='flex flex-col gap-9 w-[40%] h-[80%] m-auto mt-20 bg-white p-6 items-center shadow-xl'>
                <img src={logo} alt='logo' className='w-32 h-32 mt-2 rounded-full drop-shadow-md mb-[-10px]'></img>
                <Heading label={'Login'} />
                <div className='flex flex-col gap-8 w-[90%] items-center m-auto'>

                    <Input handleChange={handleChange} label={'Email'} type={'email'} value={profile.email} name={'email'} /> 
                    <Input handleChange={handleChange} label={'Password'} type={'password'} value={profile.pass} name={'pass'} /> 
                    <div className='text-base  text-center'>Missing Something ?
                        <Link to='/register' className='text-primary'> Register</Link>
                    </div>
                    <div className='text-base mt-[-20px] text-center'>Did your password vanish into the void ?
                        <Link to='/register' className='text-primary'> Reset Password</Link>
                    </div>

                    <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                        <Button extraStyles={'w-[40%]'} label={'Login'} handler={handleCompletion} variant={1}/>    
                    </div>
                </div>
            </div>
            </>
        )}
        </>

    )
}

export default Login;