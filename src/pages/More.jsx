import {React, useState} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import Input from '../components/Input'
import Button from '../components/Button'
import SmallInput from '../components/SmallInput';


const More = ({settings, updateSettings, handleCompletion, data})=>{  
    
    const [profile, setProfile] = useState(data)


    const handleNext = (direction)=>{

        if(direction === 1){
            handleCompletion(profile, 1);
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
        <div className='flex flex-col gap-11 w-[70%] h-[80%] m-auto mt-4 bg-white p-6 shadow-xl'>
            <Progress setting={settings} />
            <Heading label={'You are one step away ...'} />
            <div className='flex flex-col gap-8 w-[90%] items-center m-auto'>

                <Input handleChange={handleChange} label={'Github'} type={'text'} value={profile.git} name={'git'} /> 
                <Input handleChange={handleChange} label={'Linkedin'} type={'text'} value={profile.link} name={'link'} /> 

                <div className='flex flex-row w-full justify-center gap-4'>
                    <SmallInput handleChange={handleChange} label={'Portfolio'} type={'text'} value={profile.port} styles={50} name={'port'} />  
                    <SmallInput handleChange={handleChange} label={'Location'} type={'text'} value={profile.loc}  styles={50}   name={'loc'} />   
                </div>

                <Input handleChange={handleChange} label={'Bio'} type={'text'} value={profile.bio} name={'bio'} />  
                <Input handleChange={handleChange} label={'Why do you want to join'} type={'text'} value={profile.why} name={'why'} />  

                <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                    <Button label={'Discard'}  handler={()=>handleNext(0)} variant={0}/>
                    <Button label={'Continue'} handler={()=>handleNext(1)} variant={1}/>    
                </div>
            </div>
        </div>
    )
}

export default More;