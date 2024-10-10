import {React, useState} from 'react'
import out from '../assets/Star.png';
import fill from '../assets/filled.png'

const Rating = ({handleRating})=>{
    const [rating, setRating] = useState(-1);
    const [hover, setHover] = useState(-1);

    const handleClick = (id)=>{
        setRating(id);
        handleRating(id + 1);
    };

    return (
        <div className=' m-auto flex flex-row gap-2'>
            {
                Array(5).fill().map((_, index)=>{
                    return (
                        <img id={index} src={hover !== -1 ? index <= hover ? fill : out : index <= rating ? fill : out} onMouseEnter={()=> setHover(index)} onClick={()=> handleClick(index)} onMouseLeave={()=>setHover(-1)} className='w-14 h-14' alt='star'></img>    
                    )
                })
            }
        </div>
    )
}

export default Rating;