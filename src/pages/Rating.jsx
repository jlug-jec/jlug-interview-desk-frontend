import {React, useState} from 'react';
import Heading from '../components/Heading';
import Rating from '../components/Rating'
import Button from '../components/Button'

export default function Ratingg({data, handleCompletion}) {
    const [profile, setProfile] = useState(data)
    const [rating, setRating] = useState(-1);

    const handleRating = (stars)=>{
        setRating(stars);
        profile.rat = stars;
    }

    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value, 
        });
    };

    const handleSubmission = ()=>{
        handleCompletion(profile, 1);
    }

    console.log(rating);

  return (        
    <div className='flex flex-col gap-14 w-[70%] h-[80%] m-auto mt-4 bg-white p-6 shadow-xl'>
        <Heading label={'How will you rate your experience'} />
        <Rating  handleRating={handleRating}/>
        <div className='flex flex-col gap-3 w-full'>
            <textarea rows={6}  onChange={handleChange} id='feed' className='w-[85%] text-wrap  bg-form-input hover:border-[1px] p-3 font-normal text-left  hover:border-zinc-400 rounded-lg h-[140px] m-auto ' placeholder='What fascinated you...' style={{resize:'none'}} type='text' value={profile.feed} name='feed' />          
        </div>

        <div className='flex flex-row gap-4 w-full items-center justify-center'>
            <Button label={'Submit'} handler={handleSubmission} variant={1}/>    
        </div>
    </div>
  )
}
