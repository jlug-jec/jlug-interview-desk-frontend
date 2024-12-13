import {React} from 'react'

const SmallInput = ({label, type, styles, value, handleChange, name, max, min, })=>{
    return (
        <div className={`flex flex-row gap-2 md:w-[50%] w-full items-center`}>
            <div className={`font-medium md:w-[30%] w-[20%] md:text-lg text-sm text-center`}>
                {label}
            </div>
            <input name={name} onChange={handleChange} max={max} min={min} type={type} className={`md:w-[70%] w-[80%] bg-form-input hover:border-[1px] p-3 font-normal text-base hover:border-zinc-400 rounded-lg h-8 `} value={value}></input>
        </div>
    )
}

export default SmallInput;