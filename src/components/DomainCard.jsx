import {React} from 'react'

const DomainCard = ({label, status, id, handleCheck})=>{
    const domains = {'Technical Team': 'a', 'Graphics Team':'b', 'Video Editing Team':'c', 'Content Team':'d', 'Management Team':'e'}
    return (
        <div id={id} onClick={() => handleCheck(id)} className='grid grid-flow-col grid-cols-card w-64 h-28 items-center justify-items-center p-4 rounded-xl shadow-lg cursor-pointer'>
            <div  className={`w-5 h-5 rounded-full ${domains[status.domain] === id ? 'bg-primary' : 'bg-gray'} border-2 border-zinc-500`}></div>
            <div  className='font-semibold text-center align-middle text-xl'>{label} <br/> Team</div>
        </div>
    )
}

export default DomainCard;