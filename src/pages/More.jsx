import {React, useState, useEffect} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import Input from '../components/Input'
import Button from '../components/Button'
import SmallInput from '../components/SmallInput';


const More = ({settings, updateSettings, handleCompletion, data})=>{  
    
    const [profile, setProfile] = useState(data)
    const [load, setLoad] = useState(false)


    const handleNext = (direction)=>{

        if(direction === 1){
            setLoad(true)
            handleCompletion(profile, 1);
            setTimeout(() => {
                setLoad(false)
            }, 2000);
        }
        else{
            handleCompletion(profile, 0);
            updateSettings({'c3':0, 'h2':0})
        }

    }

    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value, 
        });
    };

    


    return (
        <div className='flex flex-col gap-11 md:w-[70%] md:h-[80%] w-[90%] m-auto md:mt-4 mt-8 bg-white md:p-6 p-5 shadow-xl'>
            <Progress setting={settings} />
            <Heading label={'You are one step away...'} />
            <div className='flex flex-col gap-8 w-[90%] items-center m-auto'>

                <Input handleChange={handleChange} label={'Github'} type={'text'} value={profile.git} name={'git'} /> 
                <Input handleChange={handleChange} label={'Linkedin'} type={'text'} value={profile.link} name={'link'} /> 

                <div className='flex md:flex-row flex-col w-full justify-center md:gap-4 gap-8'>
                    <SmallInput handleChange={handleChange} label={'Portfolio'} type={'text'} value={profile.port} styles={50} name={'port'} />  
                    <SmallInput handleChange={handleChange} label={'Location'} type={'text'} value={profile.loc}  styles={50}   name={'loc'} />   
                </div>

                <Input handleChange={handleChange} label={'Bio'} type={'text'} value={profile.bio} name={'bio'} />  
                <Input handleChange={handleChange} label={'Why do you want to join ?'}  lstyles={'w-[40%] '} type={'text'} value={profile.why} name={'why'} />  

                <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                    <Button isloading={load} label={'Previous'}  handler={()=>handleNext(0)} variant={0}/>
                    <Button isloading={load} label={'Register'} handler={()=>handleNext(1)} variant={1}/>    
                </div>
            </div>
        </div>
    )
}

export default More;