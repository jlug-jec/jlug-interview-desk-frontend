import {React} from 'react'

const Input = ({label, type, styles, value, handleChange, name})=>{
    return (
        <div className={`flex flex-row gap-2 ${styles ? `w-[${styles}%]` : 'w-full'} items-center justify-center`}>
            <div className={`font-medium w-[15%] text-lg text-center`}>
                {label}
            </div>
            <input name={name} onChange={handleChange} type={type} className={`w-[85%] bg-form-input hover:border-[1px] p-3 font-normal text-base hover:border-zinc-400 rounded-lg h-8 `} value={value}></input>
        </div>
    )
}

export default Input;