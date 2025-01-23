import {React, useState} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import Input from '../components/Input'
import Button from '../components/Button'
import SmallInput from '../components/SmallInput';
import { Toaster, toast } from 'react-hot-toast';


const Basic = ({handleCompletion, settings, updateSettings, data})=>{      
    const [profile, setProfile] = useState(data)

    const handleNext = ()=>{

        const phoneRegex = /^[0-9]{10}$/;

        if(profile.sem > 8){
            toast.error('Please recheck your information and continue!')
            //alert('Please recheck your information and continue!')
            return;
        }
        
        if (
            profile.name === '' || 
            profile.age === '' || 
            profile.branch === '' || 
            profile.sem === '' || 
            profile.gender === '' || 
            profile.contact === '' || 
            profile.email === ''
        ) 
        {
            toast.error('All fields are required')
            return;
        }
    
        if (!profile.email.includes('@')) {
            toast.error('Please enter a valid email')
            return;
        }

        if (!phoneRegex.test(profile.contact)) {
            toast.error('Please enter a valid contact number')
            return;
        }
        handleCompletion(profile, 1);
        updateSettings({'c2':1, 'h1':1 })

    }


    const handlePrev = (e)=>{
        setProfile({
            name: '',
            age: '',
            branch: '',
            sem: '',
            gender:'',
            contact:'',
            email:''
        })
    }

console.log(profile)

    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value, 
        });
    };

    const setGender = (v)=>{
        setProfile({
            ...profile,
            gender:v
        })
    }

    return (
        <div className='flex flex-col gap-11 md:w-[70%] w-[90%] h-[80%] m-auto md:mt-4 mt-8 bg-white md:p-6 p-3 pb-5 shadow-xl'>
            <Toaster />
            <Progress setting={settings} />
            <Heading label={'Tell us About Yourself'} />
            <div className='flex flex-col md:gap-8 gap-5 md:w-[90%] w-[95%] p-0 items-center m-auto'>

                <Input handleChange={handleChange} label={'Full Name'} type={'text'} value={profile.name} name={'name'} lstyles={'w-[20%]'} istyles={'w-[80%]'} /> 

                <div className='flex md:flex-row flex-col gap-5 flex-nowrap w-full md:justify-between '>     
                    
                <div className={`flex flex-row md:w-[50%] gap-3 w-full items-center`}>                     
                    <label htmlFor='gender' className='md:w-[30%] w-[20%] font-medium md:text-lg text-center text-sm'>Branch</label>
                        <select onChange={(e) => handleChange(e)} label={'Branch'} value={profile.branch} className='md:w-[70%] w-[80%] bg-form-input hover:border-[1px] p-1 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ' name={'branch'}>
                            <option disabled unselectable='true' value={''}>Select</option>
                            <option value={'CSE'}>CSE</option>
                            <option value={'IT'}>IT</option>
                            <option value={'ECE'}>ECE</option>
                            <option value={'EE'}>EE</option>
                            <option value={'AI'}>AI</option>
                            <option value={'MT'}>MT</option>
                            <option value={'CIVIL'}>CIVIL</option>
                            <option value={'MECH'}>MECH</option>
                            <option value={'IP'}>IP</option>
                        </select>  
                        </div>
                    <SmallInput handleChange={handleChange} max={8} min={1} label={'Semester'} type={'number'} value={profile.sem}  styles={50}   name={'sem'} />   
                </div>

                <div className='flex md:flex-row flex-col gap-5 flex-nowrap w-full md:justify-between '>
                    <SmallInput handleChange={handleChange} label={'Age'} min={14} type={'number'} value={profile.age}   styles={50}  name={'age'} />  
                    
                    <div className={`flex flex-row gap-3 md:w-[50%] w-full items-center`}>  
                        <label htmlFor='gender' className='md:w-[30%]  w-[20%] font-medium md:text-lg text-center text-sm'>Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} label={'Gender'} value={profile.gender} className='md:w-[70%] w-[80%] bg-form-input hover:border-[1px] p-1 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ' name={'gender'}>
                            <option disabled unselectable='true' value={''}>Select</option>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                    </div>
                </div>

                <Input handleChange={handleChange} label={'Contact'} type={'tel'} value={profile.contact} name={'contact'}   />  
                <Input handleChange={handleChange} label={'Email'} type={'email'} value={profile.email} name={'email'}   />  

                <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                    <Button label={'Discard'} handler={handlePrev} variant={0}/>
                    <Button label={'Continue'} handler={handleNext} variant={1}/>    
                </div>
            </div>
        </div>
    )
}

export default Basic;