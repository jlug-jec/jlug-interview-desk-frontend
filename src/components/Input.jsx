import {React, useState} from 'react'
import Show from '../assets/close.png'
import Hide from '../assets/open.png'


const Input = ({label, type, styles, value, handleChange, name, lstyles, istyles, support = 0, show})=>{
    if(styles === undefined) styles = 'w-full';
    if(lstyles === undefined) lstyles = ''
    if(istyles === undefined) istyles = ''
    const [sho, setShow] = useState(show);

    const handleShow = ()=>{
        if(sho === 1){ 
            setShow(0);
        }
        else {
            setShow(1);
        }
    }

    return (
        <div className={`flex flex-row gap-2 ${styles} items-center justify-center`}>
            <div className={`font-medium md:w-[20%] w-[20%]  md:text-lg text-sm text-center ${lstyles}`}>
                {label}
            </div>
            {
                support === 1 ?  (
                    <div className='flex flex-row relative w-full'>
                        <input name={name} onChange={handleChange} type={sho === 1 ?  'text' : 'password'} className={`w-full  bg-form-input hover:border-[1px] p-3 font-normal text-base hover:border-zinc-400 rounded-lg h-8 pr-6 ${istyles} `} value={value}></input>
                        { support === 1 && <span><img className={`w-6 h-6 absolute top-[10%] left-[85%] md:left-[90%]`} src={`${sho === 1 ? Show : Hide}`} onClick={handleShow}></img></span> }
                    </div>
                ) : (
                    <input name={name} onChange={handleChange} type={type} className={`w-[80%]  bg-form-input hover:border-[1px] p-3 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ${istyles} `} value={value}></input>
                )

            }
            
        </div>
    )
}

export default Input;