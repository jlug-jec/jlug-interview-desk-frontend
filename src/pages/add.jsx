

import {React, useState} from 'react'
import check from '../assets/check.png'
import cancel from '../assets/Cancel.png'
export default function Add() {
  let adminid = localStorage.getItem('userid')
  adminid = JSON.parse(adminid)
  const [actionload, setActionLoad] = useState(false)

  const [data, setData] = useState({
    tname : '',
    tdesc : '',
    tcatg: '',
    tstat: '',
    tsub:'',
    tdead : new Date().toISOString().split('T')[0],
    tfile : '',
    by: ''
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileName = file.name.toLowerCase(); 
    if (fileName.includes('png') || fileName.includes('jpg') || fileName.includes('jpeg')) {
      console.log('File selected, preparing to upload...');
      
      const alldata = { ...data };
      alldata['tfile'] = file;
      setData(alldata);
    } else {
      console.log('Invalid file type');
    }
  };
  
  

  const handleChange = (e)=>{
      const alldata = {...data};
      console.log(e.target.name)
      alldata[e.target.name] = e.target.value;
      setData(alldata)
  }

  const handleDate = (date) => {

    const newdate = new Date(date).toISOString().split('T')[0];
    const alldata = { ...data };
    alldata['tdead'] = newdate;
    setData(alldata);
  };
  

  const handleSubmit = async ()=>{
    setActionLoad(true)
    const {tname, tdesc, tcatg,tstat, tsub, tdead, tfile}  = data;
    const admin = localStorage.getItem('user');
    const adminObj = JSON.parse(admin)
    if(!admin) {
      alert("Please Login as admin Continue !")
    }

    if(tname !== ''  & tdesc !=='' & tcatg !=='' & tstat !== '' & tsub !== '' & tdead !== '' & tfile !== ''){
      console.log('after checking the data will be sent to api')

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dqcqijw3c/image/upload`;
      const uploadPreset = 'sample-img' 
  
      const imageData = new FormData();
      imageData.append('file', tfile); 
      imageData.append('upload_preset', uploadPreset);
      imageData.append('cloud_name', 'dqcqijw3c');
  
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: imageData,
      });
  
      const uploadResult = await response.json();

      if (!uploadResult.secure_url) {
        throw new Error('Image upload failed');
      }

      else{
        
        const taskData = {
          tname,
          tdesc,
          tcatg,
          tstat,
          tsub,
          tdead,
          tfileUrl: uploadResult.secure_url, 
          by: adminObj.name,
          adminid:adminid,
          domain: adminObj.domain
        };

        console.log(taskData)
        const apiResponse = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/add-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
      
        const apiResult = await apiResponse.json();
        console.log(apiResult);
      
        
        if (apiResult.message === 'Task successfully added!') {
          console.log('Task added successfully to Firebase');
          alert('Task was added Successfully!')
          setActionLoad(false)
        } else {
          console.error('Failed to add task to Firebase');
          alert('Oops! Something went wrong')
          setActionLoad(false)
        }
      }
  
    }
  }

  const handleDiscard = ()=>{
    setData({
      tname : '',
      tdesc : '',
      tcatg: '',
      tstat: '',
      tsub:'',
      tdead :  new Date().toISOString().split('T')[0],
      tfile : ''
    });

    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  console.log(data)

  return (
    <div className='flex flex-col m-auto w-100 h-screen'>
      <div className='flex flex-row w-[100%] gap-9 pt-1 justify-between'>
        <p className='text-left text-4xl font-medium  p-[1%] pl-[3%]'>
            Add Task
        </p>
        <div className='flex flex-row gap-5 p-3 justify-center pr-9'>

          <div className={`${actionload && 'animate-pulse cursor-not-allowed '} cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 px-4 rounded`} onClick={!actionload ? handleSubmit : null}> 
            <img src={check} className=' w-6 h-6'></img>
            <div>Confirm</div>
          </div> 

          <div className={`${actionload && 'cursor-not-allowed  opacity-50'} cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-discard border-2 hover:bg-discard-hv border-discard py-2 px-4 rounded`} onClick={!actionload ? handleDiscard : null}> 
            <img src={cancel} className=' w-6 h-6'></img>
            <div>Cancel</div>
          </div> 

        </div>
      </div>

        <div className=' bg-white m-auto w-[95%] h-[85%] flex flex-col p-4 rounded-xl drop-shadow-lg'>
          
          <div className='flex flex-row w-full gap-5 p-5'>
            <p className='text-center self-center text-[20px] w-[10%] font-medium '>Task Name</p>
            <input className='bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]' name='tname' value={data.tname} onChange={handleChange} type='text'></input>
          </div>

          <div className='flex flex-row w-full gap-5 p-5'>
            <p className='text-center self-center text-[20px] w-[10%] font-medium '>Task Description</p>
            <input className='bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]' value={data.tdesc} name='tdesc' onChange={handleChange} type='text'></input>
          </div>

          <div className='flex flex-row w-[100%] gap-9 p-5'>

            <div className='flex flex-row w-[50%] gap-7'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Task Category</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tcatg' value={data.tcatg} onChange={handleChange}>
                <option value=''>Select Category</option>
                <option value='Web'>Web</option>
                <option value='App'>App</option>
                <option value='Docx'>Document / Text</option>
              </select>
            </div>

            <div className='flex flex-row w-[50%] gap-7'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Task Status</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tstat' value={data.tstat} onChange={handleChange}>
                <option value=''>Select Status</option>
                <option value='Active'>Active</option>
                <option value='Suspended'>Suspended</option>
              </select>
            </div>

          </div>

          <div className='flex flex-row gap-7 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Submission Type</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tsub' value={data.tsub} onChange={handleChange}>
                <option value=''>Select Submission Type</option>
                <option value='DRV'>Google Drive</option>
                <option value='GIT'>Github Repositry</option>
              </select>
          </div>


          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Add a deadline</p> 
              <input type="date" className='bg-form-input w-[100%] p-4 border-none rounded-xl text-[16px]' value={data.tdead} onChange={(e) => handleDate(e.target.value)} />
          </div>

          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[20%] font-medium '>Add an Example</p>            
              <input  accept=' image/png, image/jpeg, image/jpg' id='file' type='file' className='self-center' name='tfile' onChange={handleFile} />
          </div>

        </div>
    </div>
  )
}
