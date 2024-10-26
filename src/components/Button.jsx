import {React} from 'react'

const Button = ({variant, label, extraStyles,handler})=>{
    const filled = ` text-center align-middle pt-1 pb-1 pl-6 pr-6 text-lg text-white cursor-pointer bg-primary rounded-lg ${extraStyles}`;
    const outlined = ` text-center align-middle pt-[2.5px] pb-[2.5px] pl-6 pr-6 text-lg text-primary cursor-pointer bg-white rounded-lg border-2 border-primary ${extraStyles}`;
    return (
        <div className={`{${variant === 1 ? filled : outlined}}`} onClick={handler}>{label}</div>
    )
}

export default Button;