import {React} from 'react'

const Input = ({label, type, styles, value, handleChange, name, lstyles, istyles})=>{
    if(styles === undefined) styles = 'w-full';
    if(lstyles === undefined) lstyles = ''
    if(istyles === undefined) istyles = ''
    return (
        <div className={`flex flex-row gap-2 ${styles} items-center justify-center`}>
            <div className={`font-medium md:w-[20%] w-[20%]  md:text-lg text-sm text-center ${lstyles}`}>
                {label}
            </div>
            <input name={name} onChange={handleChange} type={type} className={`w-[80%]  bg-form-input hover:border-[1px] p-3 font-normal text-base hover:border-zinc-400 rounded-lg h-8 ${istyles}`} value={value}></input>
        </div>
    )
}

export default Input;