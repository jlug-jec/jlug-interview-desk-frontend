import {React, useState} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import Input from '../components/Input'
import Button from '../components/Button'
import SmallInput from '../components/SmallInput';


const Basic = ({handleCompletion, settings, updateSettings, data})=>{      
    const [profile, setProfile] = useState(data)

    const handleNext = ()=>{

        const phoneRegex = /^[0-9]{10}$/;

        if(profile.sem > 8){
            alert('Please recheck your information and continue!')
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
            alert("All fields are required");
            return;
        }
    
        if (!profile.email.includes('@')) {
            alert("Please enter a valid email address");
            return;
        }

        if (!phoneRegex.test(profile.contact)) {
            alert("Please enter a valid 10-digit phone number");
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
        <div className='flex flex-col gap-11 w-[70%] h-[80%] m-auto mt-4 bg-white p-6 shadow-xl'>
            <Progress setting={settings} />
            <Heading label={'Tell us About Yourself'} />
            <div className='flex flex-col gap-8 w-[90%] items-center m-auto'>

                <Input handleChange={handleChange} label={'Full Name'} type={'text'} value={profile.name} name={'name'} /> 

                <div className='flex flex-row w-full justify-between '>                        
                    <label htmlFor='gender' className='w-[15%] font-medium text-lg text-center'>Branch</label>
                        <select onChange={(e) => handleChange(e)} label={'Branch'} value={profile.branch} className='w-[35%] bg-form-input hover:border-[1px] p-1 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ' name={'branch'}>
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
                    <SmallInput handleChange={handleChange} max={8} min={1} label={'Semester'} type={'number'} value={profile.sem}  styles={50}   name={'sem'} />   
                </div>

                <div className='flex flex-row  w-full justify-between '>
                    <SmallInput handleChange={handleChange} label={'Age'} min={14} type={'number'} value={profile.age}   styles={50}  name={'age'} />  
                    
                    <div className={`flex flex-row gap-2 w-[50%] items-center`}>  
                        <label htmlFor='gender' className='w-[30%] font-medium text-lg text-center'>Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} label={'Gender'} value={profile.gender} className='w-[70%] bg-form-input hover:border-[1px] p-1 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ' name={'gender'}>
                            <option disabled unselectable='true' value={''}>Select</option>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                    </div>
                </div>

                <Input handleChange={handleChange} label={'Contact'} type={'tel'} value={profile.contact} name={'contact'} />  
                <Input handleChange={handleChange} label={'Email'} type={'email'} value={profile.email} name={'email'} />  

                <div className='flex flex-row gap-4 w-full items-center justify-center mt-2'>
                    <Button label={'Discard'} handler={handlePrev} variant={0}/>
                    <Button label={'Continue'} handler={handleNext} variant={1}/>    
                </div>
            </div>
        </div>
    )
}

export default Basic;