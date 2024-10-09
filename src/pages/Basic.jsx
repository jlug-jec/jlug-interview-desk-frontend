import {React, useState} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import Input from '../components/Input'
import Button from '../components/Button'
import SmallInput from '../components/SmallInput';


const Basic = ({handleCompletion, settings, updateSettings, data})=>{      
    const [profile, setProfile] = useState(data)

    const handleNext = ()=>{

        if(profile.name !=='' && profile.age !== '' && profile.branch !== '' && profile.sem !== '' && profile.gender !== '' && profile.contact !== '' && profile.email !== ''){
            handleCompletion(profile, 1);
            updateSettings({'c2':1, 'h1':1 })
        }

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
                    <SmallInput handleChange={handleChange} label={'Branch'} type={'text'} value={profile.branch} styles={50} name={'branch'} />  
                    <SmallInput handleChange={handleChange} label={'Semester'} type={'number'} value={profile.sem}  styles={50}   name={'sem'} />   
                </div>

                <div className='flex flex-row  w-full justify-between '>
                    <SmallInput handleChange={handleChange} label={'Age'} type={'number'} value={profile.age}   styles={50}  name={'age'} />  
                    
                    <div className={`flex flex-row gap-2 w-[50%] items-center`}>  
                        <label htmlFor='gender' className='w-[30%] font-medium text-lg text-center'>Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} label={'Gender'} value={profile.gender} className='w-[70%] bg-form-input hover:border-[1px] p-1 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ' name={'gender'}>
                            <option disabled unselectable='true' value={''}>Select</option>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                    </div>
                </div>

                <Input handleChange={handleChange} label={'Contact'} type={'number'} value={profile.contact} name={'contact'} />  
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