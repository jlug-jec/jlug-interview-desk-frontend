import approve from '../assets/Approval.png'
import people from '../assets/People.png'
import book from '../assets/Bookmark.png'
import time from '../assets/Time.png'
import star from '../assets/Star.png'


function Dashboard() {
  
  const image=[people,approve,time,book]
  const applicatio=[{'name':'heloo loolo','image':'link'},{'name':'heloo loolo','image':'link'},{'name':'heloo loolo','image':'link'}]
  const pop=[{'count':100, 'text':'Total Applicants'},{'count':100, 'text':'Applications Reviewed'},{'count':100, 'text':'Pending Applications'},{'count':100, 'text':'Applications Bookmarked'}]

  return (
    <>
      <div className=' bg-zinc-100 pb-10 w-100 h-full '>
        <h1 className='font-semibold p-10 text-4xl'>Dashboard</h1>
        <div className='flex justify-between ml-14 mb-14 mr-14 pl-8 pr-8'>

         {pop.map((pop,i)=>(<div onClick={window.location.href=''} className='w-64 h-32 flex justify-center items-center rounded-lg  bg-white shadow-md shadow-zinc-400'>
          <div className='flex items-center'> <img className='w-16 h-16' src={image[i]} alt="" /></div>
          <div className='flex-col w-32 text-center items-center justify-center'>
            <h1 className='text-2xl'>{pop.count}</h1>
            <h3 className='text-zinc-500'>{pop.text}</h3>
          </div></div> ))}
        </div>
        <div className='w-full h-full flex gap-3'>
          <div className='w-3/5 h-auto ml-12  p-10  bg-white shadow-md shadow-zinc-400  rounded-lg'>
            <h1 className='w-full border-b-2 pb-2 border-black font-semibold text-xl'>Leader Board</h1>
            {applicatio.map((student)=>(
            <div className='mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center '>
                <div className='flex items-center gap-6'>
                  <img className='w-16 h-16 bg-red-400 rounded-full' src={student.image} alt="" />
                  <h1>{student.name}</h1>
                </div>
                <div className='flex gap-3 items-center'>
                  <img className='w-7 h-7' src={star} alt="" />
                  <h1>62</h1>
                </div>
              </div>
            ))}
          </div>
         
          <div className='w-2/5 h-auto mr-10 p-10  bg-white shadow-md shadow-zinc-400  rounded-lg'>
            <h1 className=' border-b-2 pb-2 border-black font-semibold text-xl'>Leader Board</h1>
            {applicatio.map((student)=>(
            <div className='mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center '>
                <div className='flex items-center gap-6'>
                  <img className='w-16 h-16 bg-red-400 rounded-full' src={student.image} alt="" />
                  <h1>{student.name}</h1>
                </div>
                <div className='flex gap-3 items-center'>
                  <img className='w-7 h-7' src={star} alt="" />
                  <h1>62</h1>
                </div>
              </div>
            ))}
          </div>
              
          
        </div>
        
      </div>
    </>
  )
}

export default Dashboard
