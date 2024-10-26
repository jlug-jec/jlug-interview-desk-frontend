import React from 'react'

export default function Progess({setting}) {

  const {c1, c2, c3, h1, h2} = setting;
  return (
    <div className='w-full flex items-center justify-center mt-3'>
      <div className='h-full flex flex-row items-center gap-4'>
        <div className={`w-14 h-14 border-[5px]  flex items-center justify-center rounded-full bg-white ${c1 === 0 ? 'border-bg-primary' : 'border-primary'}`}>
          <div className='font-semibold text-lg'>1</div>
        </div>
        <div className='w-10 outline-2 h-14 flex items-center justify-center'>
          <div className={`w-full h-1 ${h1 === 0 ? 'bg-bg-primary' : 'bg-primary'}`}></div>
        </div>        
        <div className={`w-14 h-14 border-[5px]  flex items-center justify-center rounded-full bg-white ${c2 === 0 ? 'border-bg-primary' : 'border-primary'}`}>
          <div className='font-semibold text-lg'>2</div>
        </div>        
        <div className='w-10 h-14 flex items-center justify-center'>
          <div className={`w-full h-1 ${h2 === 0 ? 'bg-bg-primary' : 'bg-primary'}`}></div>
        </div>        
        <div className={`w-14 h-14 border-[5px]  flex items-center justify-center rounded-full bg-white ${c3 === 0 ? 'border-bg-primary' : 'border-primary'}`}>
          <div className='font-semibold text-lg'>3</div>
        </div>   
      </div>
    </div>
  )
}
