import React from 'react'
import PencilB from '../../assets/PencilB.png'

function User() {
    const user_image="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png"
    const name = "Batman"
    const city = "Gotham"
    const info = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quidem quam velit, quasi at vitae earum laboriosam ipsa adipisci delectus unde eaque temporibus ab totam nostrum facilis animi fuga magni odit natus alias doloribus. Non excepturi quos nam praesentium fuga."
    const task1 = "Build Doraemon using python"
    const task2 = "Beat the hell out of superman"
    const domain = "tech"

    const handleEdit = ()=>{
      //ye bna lena, bs div ki agah inputs le lena, aur ek state me values rakh lena
    }
  return (
    <div className='bg-[#ECECEC] h-screen w-full p-10 mb-11'>
      <div className='flex flex-row w-full justify-between items-center'>
        <div className='text-4xl font-semibold '>Profile</div>
        <div className='flex gap-3 p-2 items-center border-2 border-primary text-primary px-4 py-1 rounded-lg cursor-pointer' onClick={handleEdit} >
            <img src={PencilB} className='w-7 h-7' alt='pencil'></img>
            <button className='font-semibold' >Edit Profile</button>
        </div>
      </div>


      <div className='flex flex-row w-full gap-2 mt-10'>
          <div className=' w-[25vw]  bg-white flex flex-col rounded-md shadow-lg  gap-8 items-center '>
            <img src={user_image} className="w-[12vw] mt-7 shadow-lg rounded-full" alt="" />
            <div className='flex  gap-4 '>
                <a href=""><img className="w-10 " src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/github-stroke-rounded.svg?alt=media&token=ad8bc54b-c9c7-46cf-a935-39166bab7b5b" alt="" /></a>
                <a href=""><img className="w-10 " src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/linkedin-02-stroke-rounded.svg?alt=media&token=41c80506-9e59-4212-8f9a-705cfbfd451b" alt="" /></a>
                <a href=""><img className="w-10 " src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/new-twitter-stroke-rounded.svg?alt=media&token=9ecd522d-7557-42e6-b838-7eb1e5db6780" alt="" /></a>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className=' text-xl text-center font-semibold'>{name}</h4>
                <ul className=' flex flex-col gap-5'>
                    <li className='flex'><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/location-04-stroke-rounded.svg?alt=media&token=0b209a08-ed9f-480a-9a35-2f347f958a34" alt="" />{city}</li>
                    <li><a className='flex' href=""><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/job-link-stroke-rounded.svg?alt=media&token=540b520a-a97c-440a-b0f2-892b25af241b" alt="" />Portfolio</a></li>
                    <li><a className='flex' href=""><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/mail-01-stroke-rounded.svg?alt=media&token=9d3e616a-809e-4365-991f-e46f58509a1a" alt="" />Mail</a></li>
                    <li><a className='flex' href=""><img className='mr-2' src="https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/whatsapp-stroke-rounded.svg?alt=media&token=a97f5718-255e-46d0-bdd2-70b22b3b66e9" alt="" />Whatsapp</a></li>
                </ul>
            </div>
            
            
          </div>
          <div className=' w-[68vw] bg-white shadow-lg rounded-lg'>
            <h4 className='text-xl font-semibold m-4'>Bio</h4>
            <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>{info}</p>
            
            {/* code for the fetching of data and mapping the values of skills in the li's
            data = await response.json()
            const skills = data.skills
                <ul>
                    {skills.map((skill,index)=>(
                    <li key={index}>{skill}</li>
                    )}
                </ul>
            const projects = data.projects
                <ul>
                    {projects.map(project,index)=>(
                    <li key={index}>{project}</li>
                    )}
                </ul> */}
            <div className='grid grid-cols-2 m-4 '>
            <ul className='bg-[#ECECEC] py-2 px-4 m-2 rounded-lg'>
                <h4 className='text-xl font-semibold mb-4 '>Skills</h4>
                <li>Python</li>
                <li>Javascript</li>
                <li>C++</li>
                <li>C</li>
            </ul>
            <ul className='bg-[#ECECEC] py-2 px-4 m-2 rounded-lg'>
                <h4 className='text-xl font-semibold mb-4'>Projects</h4>
                <li>School Admission System</li>
                <li>Todo List</li>
            </ul>
            </div>
            <h4 className='text-xl font-semibold m-4'>Tasks</h4>
            <ul className='bg-[#ECECEC] py-2 px-4 m-5 rounded-lg'>
                <li className='m-2'>{task1} <span className='text-green-400 border-green-400 border-2 rounded-lg px-2 absolute right-[10vw]'>Completed</span></li>
                <li className='m-2'>{task2}<span className='text-green-400 border-green-400 border-2 rounded-lg px-2 absolute right-[10vw] '>Completed</span></li>
            </ul>
            <h4 className='text-xl font-semibold m-2 ml-5'>Why do you want to join the {domain} team</h4>
            <p className='text-md font-normal m-4 py-2 px-2 rounded-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur hic praesentium delectus maiores! Numquam corporis sunt animi tenetur quaerat quidem eaque vitae est vel? Assumenda cumque reiciendis excepturi illo?</p>
          </div>
      </div>

      
    
    </div>
  )
}

export default User
