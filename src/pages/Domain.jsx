import {React, useState} from 'react';
import Heading from '../components/Heading';
import Progress from '../components/Progess';
import DomainCard from '../components/DomainCard';
import Button from '../components/Button'


const Domain = ({settings, updateSettings, handleCompletion, data})=>{

    const [checked, setChecked] = useState(data)

    const handleCheck = (id)=>{
        let domain;

        if(id === 'a') domain = {domain: 'Technical Team'}
        else if(id === 'b') domain = {domain: 'Graphics Team'}
        else if(id === 'c') domain = {domain: 'Video Editing Team'}
        else if(id === 'd') domain = {domain : 'Content Team'}
        else if(id === 'e') domain = {domain : 'Management Team'}
        setChecked({...checked, ...domain});
        
    }

    const handleNext = (direction)=>{

        if(direction === 1){
            handleCompletion(checked, 1);
            updateSettings({'c3':1, 'h2':1})
        }
        else{
            handleCompletion(checked, 0);
            updateSettings({'c2':0, 'h2':0, 'c3':0, 'h1':0})
        }

    }


    return (
        <div className='flex flex-col gap-11 w-[70%] h-[80%] m-auto mt-4 bg-white p-6 shadow-xl'>
            <Progress setting={settings} />
            <Heading label={'Select a Domain you wanna join'} />
            <div className='flex flex-row gap-8 w-[90%] items-center m-auto'>
                <DomainCard label={'Technical'} id='a' status={checked} handleCheck={handleCheck} />
                <DomainCard label={'Graphics'} id='b' status={checked} handleCheck={handleCheck} />
                <DomainCard label={'Video Editing'} id='c' status={checked} handleCheck={handleCheck} />
            </div>    
            <div className='flex flex-row gap-8 w-[90%] items-center m-auto justify-center'>
                <DomainCard label={'Content'} id='d' status={checked} handleCheck={handleCheck} />
                <DomainCard label={'Management'} id='e' status={checked} handleCheck={handleCheck} />
            </div>                
            <div className='flex flex-row gap-4 mt-4 w-full items-center justify-center'>
                <Button label={'Discard'} handler={()=>handleNext(0)}  variant={0}/>
                <Button label={'Continue'} handler={()=>handleNext(1)} variant={1}/>    
            </div>
        </div>
    )
}

export default Domain;