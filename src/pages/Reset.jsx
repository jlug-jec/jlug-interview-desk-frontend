import {React, useState, useEffect} from 'react';
import Heading from '../components/Heading';
import logo from '../assets/logoblk.png'
import Nav from '../components/Nav';
import Input from '../components/Input'
import Loading from '../pages/Loading';
import {Link, useNavigate} from 'react-router-dom'
import Button from '../components/Button'


const Reset = ()=>{     
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
            email:'',
            old:'',
            newp:''
    })

    const [load, setLoad] = useState(1);
    const [pageload, setPageLoad] = useState(0);

    const handleCompletion = async ()=>{
        if(profile.newp.length < 8){
            alert('Password must be 8 characters long!')
            return;
        }
        setPageLoad(1);
        try {
            let res = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
            res = await res.json();
            console.log(res)

            if (res.ok) {
                alert(res.message);
                navigate('/login')
            } else {
                alert(' Failed!');
            }
        } catch (error) {
            console.log('Operation failed', error);
        }finally{
        setPageLoad(0)
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
                <Heading label={'Reset Password'} />
                <div className='flex flex-col gap-8 w-[90%] items-center m-auto'>

                    <Input handleChange={handleChange} label={'Email'} type={'email'} value={profile.email} name={'email'} /> 
                    <Input handleChange={handleChange} label={'Password'} type={'password'} value={profile.old} name={'old'} /> 
                    <Input handleChange={handleChange} label={'New Password'} type={'password'} value={profile.newp} name={'newp'} /> 

                    <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                        <Button  label={'Reset Password'} handler={handleCompletion} variant={1} isloading = {pageload}/>    
                    </div>
                </div>
            </div>
            </>
        )}
        </>

    )
}

export default Reset;